<?php
/**
 * CLI checks for zip security: nonce/HMAC, rate limit, SSRF, site key, no vendor secrets.
 * No WordPress bootstrap.
 */

define( 'ABSPATH', sys_get_temp_dir() . '/' );
define( 'TALKER_NOW_RATE_WINDOW', 60 );
define( 'TALKER_NOW_RATE_SOFT', 3 );
define( 'TALKER_NOW_RATE_HARD', 5 );
define( 'TALKER_NOW_RATE_SITE_SOFT', 80 );
define( 'TALKER_NOW_RATE_SITE_HARD', 100 );
define( 'TALKER_NOW_RATE_SOFT_SLEEP', 0 );
define( 'TALKER_NOW_SIGN_SKEW', 300 );

$GLOBALS['tn_options']    = array();
$GLOBALS['tn_transients'] = array();
$GLOBALS['tn_logged_in']  = false;
$GLOBALS['tn_nonce_ok']   = '';
$GLOBALS['tn_manager']    = false;

function get_option( $key, $default = false ) {
	return array_key_exists( $key, $GLOBALS['tn_options'] ) ? $GLOBALS['tn_options'][ $key ] : $default;
}
function update_option( $key, $value, $autoload = true ) {
	unset( $autoload );
	$GLOBALS['tn_options'][ $key ] = $value;
	return true;
}
function get_transient( $key ) {
	return array_key_exists( $key, $GLOBALS['tn_transients'] ) ? $GLOBALS['tn_transients'][ $key ] : false;
}
function set_transient( $key, $value, $ttl = 0 ) {
	unset( $ttl );
	$GLOBALS['tn_transients'][ $key ] = $value;
	return true;
}
function wp_generate_password( $len = 12, $special = true, $extra = false ) {
	unset( $special, $extra );
	return substr( str_repeat( 'k7mQ2pL9x', 8 ), 0, max( 32, (int) $len ) );
}
function wp_http_validate_url( $url ) {
	return ( 0 === stripos( (string) $url, 'https://' ) ) ? $url : false;
}
function wp_parse_url( $url, $component = -1 ) {
	return parse_url( $url, $component );
}
function apply_filters( $tag, $value ) {
	unset( $tag );
	return $value;
}
function is_user_logged_in() {
	return (bool) $GLOBALS['tn_logged_in'];
}
function wp_verify_nonce( $nonce, $action ) {
	return ( 'wp_rest' === $action && '' !== $nonce && $nonce === $GLOBALS['tn_nonce_ok'] ) ? 1 : false;
}
function talker_now_is_manager() {
	return (bool) $GLOBALS['tn_manager'];
}
function talker_now_home_url() {
	return 'https://site.example/';
}
function is_wp_error( $thing ) {
	return $thing instanceof WP_Error;
}

class WP_Error {
	public $code;
	public $message;
	public $data;
	public function __construct( $code, $message = '', $data = array() ) {
		$this->code    = $code;
		$this->message = $message;
		$this->data    = $data;
	}
	public function get_error_code() {
		return $this->code;
	}
	public function get_error_data() {
		return $this->data;
	}
}

class TN_Request_Stub {
	public $headers = array();
	public $body    = '';
	public $route   = '/talker/v1/message';
	public function get_header( $name ) {
		$key = strtolower( (string) $name );
		return isset( $this->headers[ $key ] ) ? $this->headers[ $key ] : '';
	}
	public function get_body() {
		return $this->body;
	}
	public function get_route() {
		return $this->route;
	}
}

function rest_get_url_prefix() {
	return 'wp-json';
}

require dirname( __DIR__ ) . '/wp-plugin/talker-now/includes/class-security.php';

$failed = 0;
function tn_assert( $ok, $label ) {
	global $failed;
	if ( $ok ) {
		echo "ok  $label\n";
		return;
	}
	$failed++;
	echo "FAIL  $label\n";
}

tn_assert( TALKER_NOW_RATE_SOFT >= 3 && TALKER_NOW_RATE_HARD > TALKER_NOW_RATE_SOFT, "rate constants: soft then hard" );
tn_assert( TALKER_NOW_RATE_WINDOW >= 10, "rate window is at least 10s" );

$key = Talker_Now_Security::ensure_site_key();
tn_assert( is_string( $key ) && strlen( $key ) >= 32, "activation site key is generated" );
tn_assert( $key === Talker_Now_Security::ensure_site_key(), "site key is stable" );
tn_assert( $key === get_option( 'talker_site_key' ), "site key stored as talker_site_key" );

$blocked = array(
	'http://example.com/hook',
	'https://127.0.0.1/hook',
	'https://localhost/hook',
	'https://10.0.0.8/hook',
	'https://192.168.1.20/hook',
	'https://172.16.0.2/hook',
	'https://169.254.169.254/latest/meta-data/',
	'https://100.64.0.1/hook',
	'https://[::1]/hook',
	'https://intranet.local/hook',
	'https://user:pass@example.com/hook',
	'ftp://example.com/hook',
	'',
);
foreach ( $blocked as $url ) {
	tn_assert( ! Talker_Now_Security::webhook_url_is_allowed( $url ), "webhook blocked: " . ( $url ? $url : '(empty)' ) );
}

tn_assert( Talker_Now_Security::webhook_url_is_allowed( 'https://hooks.example.com/talker' ), "https public host is allowed" );
tn_assert( Talker_Now_Security::ip_is_blocked( '8.8.8.8' ) === false, "public IPv4 is not blocked" );
tn_assert( Talker_Now_Security::ip_is_blocked( '127.0.0.1' ), "loopback IPv4 is blocked" );
tn_assert( Talker_Now_Security::host_is_blocked( 'localhost' ), "localhost hostname is blocked" );

$body = '{"message":"ping","actor":"visitor"}';
$hook = 'https://hooks.example.com/talker';
tn_assert( '/talker' === Talker_Now_Security::signing_path( $hook ), "signing path is webhook pathname" );
tn_assert( '/' === Talker_Now_Security::signing_path( 'https://hooks.example.com' ), "empty pathname signs as /" );

$signed = Talker_Now_Security::sign_webhook( $body, $hook, '1700000000', 'n1' );
$canon  = Talker_Now_Security::canon_string( '1700000000', 'n1', 'POST', '/talker', $body );
$expect = 'v1=' . hash_hmac( 'sha256', $canon, $key );
tn_assert( $signed['canon'] === $canon, "canon is timestamp\\nnonce\\nPOST\\npath\\nsha256(body)" );
tn_assert( $signed['signature'] === $expect && 0 === strpos( $signed['signature'], 'v1=' ), "signature uses v1= prefix" );
$again = Talker_Now_Security::sign_webhook( $body, $hook, '1700000000', 'n1' );
tn_assert( $signed['signature'] === $again['signature'], "HMAC is deterministic for same nonce" );
$headers = Talker_Now_Security::webhook_headers( $body, $hook, '1700000000', 'n1' );
tn_assert(
	$headers['X-Talker-Timestamp'] === '1700000000'
	&& $headers['X-Talker-Nonce'] === 'n1'
	&& $headers['X-Talker-Signature'] === $signed['signature']
	&& false !== strpos( $headers['X-Talker-Site'], 'site.example' ),
	"outbound webhook headers: Site, Timestamp, Nonce, Signature v1="
);

$in_path = '/wp-json/talker/v1/message';
$in_ts   = (string) time();
$in_n    = 'in-nonce-1';
$in_sig  = Talker_Now_Security::sign_webhook( $body, 'https://site.example' . $in_path, $in_ts, $in_n );
$req     = new TN_Request_Stub();
$req->body    = $body;
$req->headers = array(
	'x-talker-timestamp' => $in_ts,
	'x-talker-nonce'     => $in_n,
	'x-talker-signature' => $in_sig['signature'],
	'x-talker-site'      => 'https://site.example/',
);
tn_assert( Talker_Now_Security::verify_incoming_signature( $req ), "valid HMAC is accepted" );

$stale_ts  = (string) ( time() - 800 );
$stale_sig = Talker_Now_Security::sign_webhook( $body, 'https://site.example' . $in_path, $stale_ts, $in_n );
$stale     = new TN_Request_Stub();
$stale->body    = $body;
$stale->headers = array(
	'x-talker-timestamp' => $stale_ts,
	'x-talker-nonce'     => $in_n,
	'x-talker-signature' => $stale_sig['signature'],
);
tn_assert( ! Talker_Now_Security::verify_incoming_signature( $stale ), "stale HMAC timestamp is rejected" );

$bad = new TN_Request_Stub();
$bad->body    = $body;
$bad->headers = array(
	'x-talker-timestamp' => $in_ts,
	'x-talker-nonce'     => $in_n,
	'x-talker-signature' => 'v1=deadbeef',
);
tn_assert( ! Talker_Now_Security::verify_incoming_signature( $bad ), "wrong HMAC is rejected" );
tn_assert( ! Talker_Now_Security::verify_incoming_signature( new TN_Request_Stub() ), "missing signature is rejected" );

$none = Talker_Now_Security::authorize_message( new TN_Request_Stub() );
tn_assert( is_wp_error( $none ) && 'talker_rest_forbidden' === $none->get_error_code() && 401 === (int) $none->get_error_data()['status'], "no nonce/signature → 401" );

$with_nonce = new TN_Request_Stub();
$GLOBALS['tn_nonce_ok'] = 'good-nonce';
$with_nonce->headers['x-wp-nonce'] = 'good-nonce';
tn_assert( true === Talker_Now_Security::authorize_message( $with_nonce ), "valid wp_rest nonce is accepted" );

$GLOBALS['tn_nonce_ok'] = '';
$GLOBALS['tn_logged_in'] = true;
tn_assert( true === Talker_Now_Security::authorize_message( new TN_Request_Stub() ), "application password / logged-in REST auth is accepted" );
$GLOBALS['tn_logged_in'] = false;

$_SERVER['REMOTE_ADDR'] = '203.0.113.9';
$GLOBALS['tn_transients'] = array();
Talker_Now_Security::reset_rate_guard();
$last = null;
for ( $i = 1; $i <= 4; $i++ ) {
	Talker_Now_Security::reset_rate_guard();
	$last = Talker_Now_Security::consume_rate_limit( false );
	tn_assert( true === $last, "visitor hit $i under hard cap is allowed" );
}
Talker_Now_Security::reset_rate_guard();
$blocked_rl = Talker_Now_Security::consume_rate_limit( false );
tn_assert( is_wp_error( $blocked_rl ) && 'talker_rate_limited' === $blocked_rl->get_error_code(), "visitor hard cap → 429" );
tn_assert( 429 === (int) $blocked_rl->get_error_data()['status'], "rate error status is 429" );

$again_same_request = Talker_Now_Security::consume_rate_limit( false );
tn_assert( is_wp_error( $again_same_request ) && 'talker_rate_limited' === $again_same_request->get_error_code(), "permission_callback double-call repeats 429" );
tn_assert( 5 === (int) get_transient( 'tn_rl_ip_' . md5( '203.0.113.9' ) ), "double-call does not increment a second time" );

$GLOBALS['tn_transients'] = array();
$GLOBALS['tn_manager']    = true;
$manager_ok = true;
for ( $i = 1; $i <= 5; $i++ ) {
	Talker_Now_Security::reset_rate_guard();
	$r = Talker_Now_Security::consume_rate_limit( true );
	if ( true !== $r ) {
		$manager_ok = false;
	}
}
tn_assert( $manager_ok, "gérant QCM volume under 3× hard does not 429" );

$plugin_root = dirname( __DIR__ ) . '/wp-plugin/talker-now';
$rest_src    = file_get_contents( $plugin_root . '/includes/class-rest.php' );
$boot_src    = file_get_contents( $plugin_root . '/talker-now.php' );
$widget_js   = file_get_contents( $plugin_root . '/assets/widget.js' );
$widget_php  = file_get_contents( $plugin_root . '/includes/class-widget.php' );
$uninstall   = file_get_contents( $plugin_root . '/uninstall.php' );

tn_assert( false === strpos( $rest_src, '__return_true' ), "REST no longer uses __return_true" );
tn_assert( false !== strpos( $rest_src, 'Talker_Now_Security' ) && false !== strpos( $rest_src, 'can_message' ), "REST permission_callback is can_message" );
tn_assert( false !== strpos( $rest_src, 'wp_safe_remote_post' ), "webhook uses wp_safe_remote_post" );
tn_assert( false !== strpos( $rest_src, 'webhook_url_is_allowed' ), "webhook URL is validated before POST" );
tn_assert( false !== strpos( $rest_src, 'Laissez votre nom' ) && false !== strpos( $rest_src, 'Merci. Nous vous recontacterons.' ), "French stub still used when webhook empty/unsafe" );
tn_assert( false !== strpos( $rest_src, 'manager_message' ) && false !== strpos( $rest_src, 'site_read' ), "gérant QCM path still in REST" );
tn_assert( false !== strpos( $boot_src, 'class-security.php' ) && false !== strpos( $boot_src, '0.1.14' ), "boot loads security class and bumps version" );
tn_assert( false !== strpos( $boot_src, 'ensure_site_key' ), "activation/boot ensures site key" );
tn_assert( false !== strpos( $uninstall, 'talker_site_key' ), "uninstall deletes talker_site_key" );
tn_assert( false !== strpos( $widget_php, "wp_create_nonce( 'wp_rest' )" ) && false === strpos( $widget_php, 'talker_site_key' ) && false === strpos( $widget_js, 'talker_site_key' ), "widget still localizes wp_rest nonce; site key stays server-side" );
tn_assert( false !== strpos( $rest_src, 'webhook_headers( $json, $webhook )' ), "REST signs outbound with webhook URL path" );
tn_assert( false !== strpos( $widget_js, 'X-WP-Nonce' ) && false !== strpos( $widget_js, 'function parseRest' ), "widget still sends nonce and handles 429" );
tn_assert( false !== strpos( $widget_js, 'intent: "site_read"' ) && false !== strpos( $widget_js, 'intent: "hello"' ), "gérant site_read + hello fetches unchanged" );

$secret_needles = array( 'AIza', 'GEMINI_API', 'GOOGLE_API_KEY', 'sk-ant-', 'xoxb-', 'n8n_api_key' );
$scan_files     = array(
	$plugin_root . '/talker-now.php',
	$plugin_root . '/includes/class-rest.php',
	$plugin_root . '/includes/class-security.php',
	$plugin_root . '/includes/class-widget.php',
	$plugin_root . '/includes/class-crawl.php',
	$plugin_root . '/assets/widget.js',
	$plugin_root . '/SECURITY.md',
);
$found_secret = false;
foreach ( $scan_files as $path ) {
	$src = file_get_contents( $path );
	foreach ( $secret_needles as $needle ) {
		if ( false !== strpos( $src, $needle ) ) {
			$found_secret = true;
			echo "secret needle $needle in $path\n";
		}
	}
}
tn_assert( ! $found_secret, "zip sources have no Gemini/n8n vendor secrets" );
tn_assert( false !== strpos( $boot_src, "'webhook_url' => ''" ), "default webhook_url stays empty" );

echo $failed ? "\n$failed failed\n" : "\nall passed\n";
exit( $failed ? 1 : 0 );
