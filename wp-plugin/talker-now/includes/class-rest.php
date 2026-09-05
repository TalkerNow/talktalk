<?php
/**
 * POST talker/v1/message — visitor stub or signed webhook; gérant QCM unchanged.
 *
 * Controls (see includes/class-security.php and SECURITY.md):
 *   TALKER_NOW_RATE_WINDOW / _SOFT / _HARD / _SITE_SOFT / _SITE_HARD / _SOFT_SLEEP
 *   Auth: X-WP-Nonce (wp_rest) | application password | X-Talker-Signature v1=
 *   Webhook: HTTPS + no private IPs + HMAC with talker_site_key
 *
 * @package TalkerNow
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Talker_Now_REST {
	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'routes' ) );
	}

	public static function routes() {
		register_rest_route(
			'talker/v1',
			'/message',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'message' ),
				'permission_callback' => array( 'Talker_Now_Security', 'can_message' ),
			)
		);
	}

	/**
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public static function message( $request ) {
		$body = $request->get_json_params();
		if ( ! is_array( $body ) ) {
			$body = $request->get_params();
		}
		if ( ! is_array( $body ) ) {
			$body = array();
		}
		$message = isset( $body['message'] ) ? sanitize_text_field( (string) $body['message'] ) : '';
		$intent  = isset( $body['intent'] ) ? sanitize_key( (string) $body['intent'] ) : '';
		$session = isset( $body['session'] ) ? sanitize_text_field( (string) $body['session'] ) : '';
		$contact = isset( $body['contact'] ) && is_array( $body['contact'] ) ? $body['contact'] : array();

		$contact_clean = array(
			'name'  => isset( $contact['name'] ) ? sanitize_text_field( (string) $contact['name'] ) : '',
			'email' => isset( $contact['email'] ) ? sanitize_email( (string) $contact['email'] ) : '',
			'phone' => isset( $contact['phone'] ) ? sanitize_text_field( (string) $contact['phone'] ) : '',
		);

		$claimed = isset( $body['actor'] ) ? sanitize_key( (string) $body['actor'] ) : 'visitor';
		$surface = isset( $body['surface'] ) ? sanitize_key( (string) $body['surface'] ) : 'public';
		$actor   = ( 'manager' === $claimed && 'admin' === $surface && talker_now_is_manager() ) ? 'manager' : 'visitor';

		if ( 'manager' === $actor ) {
			return self::manager_message( $intent, $message, $session );
		}

		$settings = talker_now_get_settings();
		$site     = talker_now_home_url();
		$payload  = array(
			'site'        => $site,
			'site_id'     => wp_hash( $site ),
			'admin_email' => talker_now_admin_email(),
			'session'     => $session,
			'message'     => $message,
			'intent'      => $intent,
			'actor'       => 'visitor',
			'contact'     => $contact_clean,
			'sent_at'     => gmdate( 'c' ),
		);

		$webhook = isset( $settings['webhook_url'] ) ? trim( (string) $settings['webhook_url'] ) : '';
		if ( '' === $webhook ) {
			return new WP_REST_Response(
				array(
					'reply' => self::stub_reply( $contact_clean, $message ),
				),
				200
			);
		}

		if ( ! Talker_Now_Security::webhook_url_is_allowed( $webhook ) ) {
			return new WP_REST_Response(
				array(
					'reply' => self::stub_reply( $contact_clean, $message ),
				),
				200
			);
		}

		$json = wp_json_encode( $payload );
		if ( ! is_string( $json ) || '' === $json ) {
			return new WP_REST_Response(
				array(
					'reply' => self::stub_reply( $contact_clean, $message ),
				),
				200
			);
		}

		$response = wp_safe_remote_post(
			$webhook,
			array(
				'timeout'     => 12,
				'redirection' => 3,
				'headers'     => Talker_Now_Security::webhook_headers( $json, $webhook ),
				'body'        => $json,
			)
		);

		if ( is_wp_error( $response ) ) {
			return new WP_REST_Response(
				array(
					'reply' => self::stub_reply( $contact_clean, $message ),
				),
				200
			);
		}

		$code  = (int) wp_remote_retrieve_response_code( $response );
		$raw   = wp_remote_retrieve_body( $response );
		$data  = json_decode( $raw, true );
		$reply = '';
		if ( is_array( $data ) ) {
			if ( isset( $data['reply'] ) ) {
				$reply = (string) $data['reply'];
			} elseif ( isset( $data['message'] ) ) {
				$reply = (string) $data['message'];
			} elseif ( isset( $data['text'] ) ) {
				$reply = (string) $data['text'];
			}
		}

		if ( $code < 200 || $code >= 300 || '' === trim( $reply ) ) {
			return new WP_REST_Response(
				array(
					'reply' => self::stub_reply( $contact_clean, $message ),
				),
				200
			);
		}

		return new WP_REST_Response(
			array(
				'reply' => wp_strip_all_tags( $reply ),
			),
			200
		);
	}

	/**
	 * Gérant path: scan visual while crawling, then a fact-based QCM.
	 * Never the visitor contact stub.
	 *
	 * @param string $intent
	 * @param string $message
	 * @param string $session
	 * @return WP_REST_Response
	 */
	private static function manager_message( $intent, $message, $session ) {
		unset( $session );

		if ( 'site_read' === $intent ) {
			$crawl = Talker_Now_Crawl::get();
			if ( ! in_array( $crawl['status'], array( 'done', 'failed' ), true ) ) {
				Talker_Now_Crawl::run();
			}
			$crawl = Talker_Now_Crawl::get();
			$done  = in_array( $crawl['status'], array( 'done', 'failed' ), true );
			return new WP_REST_Response(
				array(
					'reply'  => '',
					'visual' => $done ? 'ready' : 'scan',
					'crawl'  => $crawl['status'] ? $crawl['status'] : 'running',
					'qcm'    => 'idle',
				),
				200
			);
		}

		if ( '' !== trim( $message ) && 'hello' !== $intent ) {
			return new WP_REST_Response( Talker_Now_Crawl::answer( $message ), 200 );
		}

		return new WP_REST_Response( Talker_Now_Crawl::hello(), 200 );
	}

	/**
	 * Visitor-facing copy: vouvoiement, no product name, no quota, no backstage.
	 *
	 * @param array<string, string> $contact
	 */
	private static function stub_reply( $contact, $message ) {
		$has_contact = '' !== $contact['email'] || '' !== $contact['phone'] || '' !== $contact['name'];
		if ( $has_contact ) {
			return 'Merci. Nous vous recontacterons.';
		}
		if ( '' !== trim( (string) $message ) ) {
			return 'Bien reçu. Laissez votre nom et un e-mail ou un téléphone, nous vous recontacterons.';
		}
		return 'Laissez votre nom et un moyen de vous joindre, nous vous recontacterons.';
	}
}
