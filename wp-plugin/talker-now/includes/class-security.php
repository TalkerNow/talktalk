<?php
/**
 * Abuse controls for POST talker/v1/message (thin client, no vendor secrets).
 *
 * Override any constant in wp-config.php before this plugin loads.
 *
 * TALKER_NOW_RATE_WINDOW      Seconds per bucket. Default 60.
 * TALKER_NOW_RATE_SOFT        Per-IP hits/window before a short sleep. Default 40.
 * TALKER_NOW_RATE_HARD        Per-IP hits/window before HTTP 429. Default 90.
 * TALKER_NOW_RATE_SITE_SOFT   Site-wide hits/window before sleep. Default 80.
 * TALKER_NOW_RATE_SITE_HARD   Site-wide hits/window before HTTP 429. Default 240.
 * TALKER_NOW_RATE_SOFT_SLEEP  Seconds to sleep after a soft trip. Default 1. Set 0 in tests.
 * TALKER_NOW_SIGN_SKEW        Max age (seconds) of an inbound HMAC timestamp. Default 300.
 *
 * Inbound auth (any one is enough):
 *   - X-WP-Nonce for action wp_rest (visitor widget + admin cookie)
 *   - logged-in REST auth (application password / cookie already accepted by WP)
 *   - Talker HMAC: X-Talker-Site + Timestamp (±300s) + Nonce + Signature v1=<hex>
 *     canon = timestamp\nnonce\nPOST\npath\nsha256_hex(rawBody)  (HMAC-SHA256 with talker_site_key)
 *
 * Outbound webhook: HTTPS only, private/link-local hosts blocked, HMAC signed. No Gemini/n8n secrets.
 *
 * @package TalkerNow
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'TALKER_NOW_RATE_WINDOW' ) ) {
	define( 'TALKER_NOW_RATE_WINDOW', 60 );
}
if ( ! defined( 'TALKER_NOW_RATE_SOFT' ) ) {
	define( 'TALKER_NOW_RATE_SOFT', 40 );
}
if ( ! defined( 'TALKER_NOW_RATE_HARD' ) ) {
	define( 'TALKER_NOW_RATE_HARD', 90 );
}
if ( ! defined( 'TALKER_NOW_RATE_SITE_SOFT' ) ) {
	define( 'TALKER_NOW_RATE_SITE_SOFT', 80 );
}
if ( ! defined( 'TALKER_NOW_RATE_SITE_HARD' ) ) {
	define( 'TALKER_NOW_RATE_SITE_HARD', 240 );
}
if ( ! defined( 'TALKER_NOW_RATE_SOFT_SLEEP' ) ) {
	define( 'TALKER_NOW_RATE_SOFT_SLEEP', 1 );
}
if ( ! defined( 'TALKER_NOW_SIGN_SKEW' ) ) {
	define( 'TALKER_NOW_SIGN_SKEW', 300 );
}

class Talker_Now_Security {
	const SITE_KEY_OPTION = 'talker_site_key';
	const TRANSIENT_SITE  = 'tn_rl_site';

	/**
	 * Guard: WP may invoke permission_callback more than once per request.
	 *
	 * @var bool
	 */
	private static $rate_consumed = false;

	/**
	 * @var true|WP_Error
	 */
	private static $rate_result = true;

	/**
	 * @return string
	 */
	public static function ensure_site_key() {
		$key = get_option( self::SITE_KEY_OPTION, '' );
		if ( is_string( $key ) && strlen( $key ) >= 32 ) {
			return $key;
		}
		if ( function_exists( 'wp_generate_password' ) ) {
			$key = wp_generate_password( 48, false, false );
		} else {
			$key = bin2hex( random_bytes( 24 ) );
		}
		update_option( self::SITE_KEY_OPTION, $key, true );
		return $key;
	}

	/**
	 * @return string
	 */
	public static function get_site_key() {
		return self::ensure_site_key();
	}

	/**
	 * REST permission_callback: rate-limit every POST, then require nonce / app password / HMAC.
	 *
	 * @param WP_REST_Request $request
	 * @return true|WP_Error
	 */
	public static function can_message( $request ) {
		$limited = self::consume_rate_limit( function_exists( 'talker_now_is_manager' ) && talker_now_is_manager() );
		if ( is_wp_error( $limited ) ) {
			return $limited;
		}
		return self::authorize_message( $request );
	}

	/**
	 * @param WP_REST_Request $request
	 * @return true|WP_Error
	 */
	public static function authorize_message( $request ) {
		$nonce = '';
		if ( is_object( $request ) && method_exists( $request, 'get_header' ) ) {
			$nonce = (string) $request->get_header( 'X-WP-Nonce' );
		}
		if ( '' !== $nonce && function_exists( 'wp_verify_nonce' ) && wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return true;
		}

		// Application password / cookie auth already accepted by WordPress.
		if ( function_exists( 'is_user_logged_in' ) && is_user_logged_in() ) {
			return true;
		}

		if ( self::verify_incoming_signature( $request ) ) {
			return true;
		}

		return new WP_Error(
			'talker_rest_forbidden',
			'Missing or invalid nonce, application password, or Talker signature.',
			array( 'status' => 401 )
		);
	}

	/**
	 * Per-IP and per-site transients. Soft = sleep then continue. Hard = 429.
	 * Gérant QCM (logged-in manage_options) skips sleep and the normal hard cap
	 * so site_read polling keeps working. Extreme manager abuse still 429s.
	 *
	 * @param bool $is_manager
	 * @return true|WP_Error
	 */
	public static function consume_rate_limit( $is_manager = false ) {
		if ( self::$rate_consumed ) {
			return self::$rate_result;
		}
		self::$rate_consumed = true;

		$window = max( 10, (int) TALKER_NOW_RATE_WINDOW );
		$ip_n   = self::bump_transient( self::ip_transient_key(), $window );
		$site_n = self::bump_transient( self::TRANSIENT_SITE, $window );

		$hard_ip   = max( 2, (int) TALKER_NOW_RATE_HARD );
		$hard_site = max( 2, (int) TALKER_NOW_RATE_SITE_HARD );

		if ( $is_manager ) {
			if ( $ip_n >= ( $hard_ip * 3 ) || $site_n >= ( $hard_site * 2 ) ) {
				self::$rate_result = self::rate_error();
				return self::$rate_result;
			}
			self::$rate_result = true;
			return true;
		}

		if ( $ip_n >= $hard_ip || $site_n >= $hard_site ) {
			self::$rate_result = self::rate_error();
			return self::$rate_result;
		}

		$soft_ip   = max( 1, (int) TALKER_NOW_RATE_SOFT );
		$soft_site = max( 1, (int) TALKER_NOW_RATE_SITE_SOFT );
		if ( $ip_n >= $soft_ip || $site_n >= $soft_site ) {
			self::maybe_sleep( (int) TALKER_NOW_RATE_SOFT_SLEEP );
		}

		self::$rate_result = true;
		return true;
	}

	/**
	 * Reset the once-per-request guard (tests only).
	 */
	public static function reset_rate_guard() {
		self::$rate_consumed = false;
		self::$rate_result   = true;
	}

	/**
	 * HTTPS only. Block private / link-local / reserved hosts. Allowlist via filter later.
	 *
	 * @param string $url
	 * @return bool
	 */
	public static function webhook_url_is_allowed( $url ) {
		$url = trim( (string) $url );
		if ( '' === $url ) {
			return false;
		}
		if ( 0 !== stripos( $url, 'https://' ) ) {
			return self::filter_webhook_allowed( false, $url );
		}
		if ( function_exists( 'wp_http_validate_url' ) && ! wp_http_validate_url( $url ) ) {
			return self::filter_webhook_allowed( false, $url );
		}

		$parts = function_exists( 'wp_parse_url' ) ? wp_parse_url( $url ) : parse_url( $url );
		if ( ! is_array( $parts ) || empty( $parts['host'] ) ) {
			return self::filter_webhook_allowed( false, $url );
		}
		if ( ! empty( $parts['user'] ) || ! empty( $parts['pass'] ) ) {
			return self::filter_webhook_allowed( false, $url );
		}

		$host = strtolower( (string) $parts['host'] );
		$ok   = ! self::host_is_blocked( $host );
		return self::filter_webhook_allowed( $ok, $url );
	}

	/**
	 * @param string $host
	 * @return bool
	 */
	public static function host_is_blocked( $host ) {
		$host = strtolower( trim( (string) $host, "[] \t\n\r" ) );
		if ( '' === $host ) {
			return true;
		}
		if ( in_array( $host, array( 'localhost', 'localhost.localdomain', 'ip6-localhost', 'ip6-loopback' ), true ) ) {
			return true;
		}
		if ( preg_match( '/\.(localhost|local|internal|lan|home|corp)$/', $host ) ) {
			return true;
		}
		if ( self::ip_is_blocked( $host ) ) {
			return true;
		}
		foreach ( self::resolve_host_ips( $host ) as $ip ) {
			if ( self::ip_is_blocked( $ip ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * @param string $ip
	 * @return bool
	 */
	public static function ip_is_blocked( $ip ) {
		$ip = trim( (string) $ip, "[] \t\n\r" );
		if ( '' === $ip || false === filter_var( $ip, FILTER_VALIDATE_IP ) ) {
			return false;
		}
		$flags = FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE;
		if ( false === filter_var( $ip, FILTER_VALIDATE_IP, $flags ) ) {
			return true;
		}
		if ( filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) ) {
			$long = ip2long( $ip );
			if ( false !== $long && $long >= ip2long( '100.64.0.0' ) && $long <= ip2long( '100.127.255.255' ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * URL path used in the HMAC canon (pathname only, no scheme/host/query).
	 *
	 * @param string $url
	 * @return string
	 */
	public static function signing_path( $url ) {
		$parts = function_exists( 'wp_parse_url' ) ? wp_parse_url( $url ) : parse_url( $url );
		$path  = ( is_array( $parts ) && isset( $parts['path'] ) ) ? (string) $parts['path'] : '';
		return ( '' === $path ) ? '/' : $path;
	}

	/**
	 * Ops canon: timestamp\nnonce\nPOST\npath\nsha256_hex(rawBody)
	 *
	 * @param string $timestamp
	 * @param string $nonce
	 * @param string $method
	 * @param string $path
	 * @param string $raw_body
	 * @return string
	 */
	public static function canon_string( $timestamp, $nonce, $method, $path, $raw_body ) {
		return (string) $timestamp . "\n" . (string) $nonce . "\n" . (string) $method . "\n" . (string) $path . "\n" . hash( 'sha256', (string) $raw_body );
	}

	/**
	 * @return string
	 */
	public static function fresh_nonce() {
		if ( function_exists( 'random_bytes' ) ) {
			return bin2hex( random_bytes( 16 ) );
		}
		if ( function_exists( 'wp_generate_password' ) ) {
			return wp_generate_password( 32, false, false );
		}
		return md5( uniqid( (string) mt_rand(), true ) );
	}

	/**
	 * HMAC headers for wp_remote_post. Site key stays in WP options (never in widget JS).
	 *
	 * @param string          $body        Exact JSON body that will be posted.
	 * @param string          $webhook_url Destination URL (path is signed).
	 * @param string|int|null $timestamp   Unix seconds; default now.
	 * @param string|null     $nonce       Opaque nonce; default random.
	 * @return array<string, string>
	 */
	public static function webhook_headers( $body, $webhook_url, $timestamp = null, $nonce = null ) {
		$signed = self::sign_webhook( (string) $body, (string) $webhook_url, $timestamp, $nonce );
		return array(
			'Content-Type'       => 'application/json; charset=utf-8',
			'X-Talker-Site'      => function_exists( 'talker_now_home_url' ) ? talker_now_home_url() : '',
			'X-Talker-Timestamp' => $signed['timestamp'],
			'X-Talker-Nonce'     => $signed['nonce'],
			'X-Talker-Signature' => $signed['signature'],
		);
	}

	/**
	 * @param string          $body
	 * @param string          $webhook_url
	 * @param string|int|null $timestamp
	 * @param string|null     $nonce
	 * @return array{timestamp: string, nonce: string, path: string, canon: string, signature: string}
	 */
	public static function sign_webhook( $body, $webhook_url, $timestamp = null, $nonce = null ) {
		$ts    = null === $timestamp ? (string) time() : (string) $timestamp;
		$nonce = null === $nonce || '' === $nonce ? self::fresh_nonce() : (string) $nonce;
		$path  = self::signing_path( $webhook_url );
		$canon = self::canon_string( $ts, $nonce, 'POST', $path, (string) $body );
		$sig   = hash_hmac( 'sha256', $canon, self::get_site_key() );
		return array(
			'timestamp' => $ts,
			'nonce'     => $nonce,
			'path'      => $path,
			'canon'     => $canon,
			'signature' => 'v1=' . $sig,
		);
	}

	/**
	 * @param WP_REST_Request|object $request
	 * @return bool
	 */
	public static function verify_incoming_signature( $request ) {
		if ( ! is_object( $request ) || ! method_exists( $request, 'get_header' ) ) {
			return false;
		}
		$sig   = (string) $request->get_header( 'X-Talker-Signature' );
		$ts    = (string) $request->get_header( 'X-Talker-Timestamp' );
		$nonce = (string) $request->get_header( 'X-Talker-Nonce' );
		if ( '' === $sig || '' === $ts || '' === $nonce || ! ctype_digit( $ts ) ) {
			return false;
		}
		$skew = max( 30, (int) TALKER_NOW_SIGN_SKEW );
		if ( abs( time() - (int) $ts ) > $skew ) {
			return false;
		}
		$body = method_exists( $request, 'get_body' ) ? (string) $request->get_body() : '';
		$key  = (string) get_option( self::SITE_KEY_OPTION, '' );
		if ( strlen( $key ) < 32 ) {
			return false;
		}
		$path     = self::incoming_request_path( $request );
		$canon    = self::canon_string( $ts, $nonce, 'POST', $path, $body );
		$expected = 'v1=' . hash_hmac( 'sha256', $canon, $key );
		$provided = $sig;
		if ( 0 !== stripos( $provided, 'v1=' ) ) {
			$provided = 'v1=' . $provided;
		}
		return hash_equals( $expected, $provided );
	}

	/**
	 * Path the inbound client signed: /wp-json + REST route, or REQUEST_URI pathname.
	 *
	 * @param WP_REST_Request|object $request
	 * @return string
	 */
	public static function incoming_request_path( $request ) {
		if ( is_object( $request ) && method_exists( $request, 'get_route' ) ) {
			$route  = (string) $request->get_route();
			$prefix = function_exists( 'rest_get_url_prefix' ) ? (string) rest_get_url_prefix() : 'wp-json';
			$prefix = '/' . trim( $prefix, '/' );
			if ( '' !== $route && '/' !== substr( $route, 0, 1 ) ) {
				$route = '/' . $route;
			}
			return $prefix . $route;
		}
		if ( ! empty( $_SERVER['REQUEST_URI'] ) ) {
			return self::signing_path( 'https://local.example' . (string) $_SERVER['REQUEST_URI'] );
		}
		return '/';
	}

	/**
	 * @return string
	 */
	public static function client_ip() {
		if ( ! empty( $_SERVER['REMOTE_ADDR'] ) ) {
			$ip = (string) $_SERVER['REMOTE_ADDR'];
			if ( function_exists( 'wp_unslash' ) ) {
				$ip = wp_unslash( $ip );
			}
			if ( function_exists( 'sanitize_text_field' ) ) {
				$ip = sanitize_text_field( $ip );
			}
			$ip = trim( (string) $ip );
			if ( '' !== $ip ) {
				return $ip;
			}
		}
		return '0.0.0.0';
	}

	/**
	 * @return string
	 */
	private static function ip_transient_key() {
		return 'tn_rl_ip_' . md5( self::client_ip() );
	}

	/**
	 * @param string $key
	 * @param int    $ttl
	 * @return int
	 */
	private static function bump_transient( $key, $ttl ) {
		$n = (int) get_transient( $key );
		$n++;
		set_transient( $key, $n, $ttl );
		return $n;
	}

	/**
	 * @return WP_Error
	 */
	private static function rate_error() {
		return new WP_Error(
			'talker_rate_limited',
			'Too many requests.',
			array(
				'status'      => 429,
				'retry_after' => (int) TALKER_NOW_RATE_WINDOW,
			)
		);
	}

	/**
	 * @param int $seconds
	 */
	public static function maybe_sleep( $seconds ) {
		$seconds = (int) $seconds;
		if ( $seconds > 0 ) {
			sleep( $seconds );
		}
	}

	/**
	 * @param string $host
	 * @return string[]
	 */
	private static function resolve_host_ips( $host ) {
		if ( false !== filter_var( $host, FILTER_VALIDATE_IP ) ) {
			return array();
		}
		$ips = array();
		if ( function_exists( 'dns_get_record' ) ) {
			foreach ( array( DNS_A, DNS_AAAA ) as $type ) {
				$records = @dns_get_record( $host, $type );
				if ( ! is_array( $records ) ) {
					continue;
				}
				foreach ( $records as $row ) {
					if ( ! empty( $row['ip'] ) ) {
						$ips[] = (string) $row['ip'];
					}
					if ( ! empty( $row['ipv6'] ) ) {
						$ips[] = (string) $row['ipv6'];
					}
				}
			}
		}
		if ( ! $ips ) {
			$fallback = gethostbyname( $host );
			if ( is_string( $fallback ) && $fallback !== $host && false !== filter_var( $fallback, FILTER_VALIDATE_IP ) ) {
				$ips[] = $fallback;
			}
		}
		return array_values( array_unique( $ips ) );
	}

	/**
	 * @param bool   $allowed
	 * @param string $url
	 * @return bool
	 */
	private static function filter_webhook_allowed( $allowed, $url ) {
		if ( function_exists( 'apply_filters' ) ) {
			return (bool) apply_filters( 'talker_now_webhook_url_is_allowed', $allowed, $url );
		}
		return (bool) $allowed;
	}
}
