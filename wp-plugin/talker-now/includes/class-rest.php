<?php

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
				'permission_callback' => '__return_true',
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

		$webhook = $settings['webhook_url'];
		if ( '' === $webhook ) {
			return new WP_REST_Response(
				array(
					'reply' => self::stub_reply( $contact_clean, $message ),
				),
				200
			);
		}

		$response = wp_remote_post(
			$webhook,
			array(
				'timeout' => 12,
				'headers' => array(
					'Content-Type' => 'application/json; charset=utf-8',
				),
				'body'    => wp_json_encode( $payload ),
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
	 * Gérant path: crawl hello then métier QCM. Never the visitor contact stub.
	 *
	 * @param string $intent
	 * @param string $message
	 * @param string $session
	 * @return WP_REST_Response
	 */
	private static function manager_message( $intent, $message, $session ) {
		unset( $session );
		$crawl = Talker_Now_Crawl::get();

		if ( 'site_read' === $intent ) {
			if ( 'done' !== $crawl['status'] ) {
				Talker_Now_Crawl::run();
			}
			$crawl = Talker_Now_Crawl::get();
			return new WP_REST_Response(
				array(
					'reply' => '',
					'crawl' => $crawl['status'],
				),
				200
			);
		}

		if ( 'asked' === $crawl['qcm_step'] && '' !== trim( $message ) && 'hello' !== $intent ) {
			$crawl['qcm_answer'] = $message;
			$crawl['qcm_step']   = 'answered';
			Talker_Now_Crawl::save( $crawl );
			return new WP_REST_Response(
				array(
					'reply' => 'C’est noté. Je m’en servirai pour parler comme vous sur le site.',
					'crawl' => 'done',
					'qcm'   => 'answered',
				),
				200
			);
		}

		return new WP_REST_Response( self::hello_payload( Talker_Now_Crawl::get() ), 200 );
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @return array<string, string>
	 */
	private static function hello_payload( $crawl ) {
		if ( 'done' !== $crawl['status'] ) {
			Talker_Now_Crawl::run();
			$crawl = Talker_Now_Crawl::get();
			if ( 'done' !== $crawl['status'] ) {
				return array(
					'reply' => 'Je parcours votre site maintenant : je défile et je lis l’accueil. Un instant, je reviens avec des questions sur votre métier.',
					'crawl' => $crawl['status'] ? $crawl['status'] : 'running',
					'qcm'   => 'idle',
				);
			}
		}

		$question = Talker_Now_Crawl::first_question( $crawl );
		$crawl['qcm_question'] = $question;
		if ( 'answered' !== $crawl['qcm_step'] ) {
			$crawl['qcm_step'] = 'asked';
		}
		Talker_Now_Crawl::save( $crawl );

		if ( 'answered' === $crawl['qcm_step'] ) {
			return array(
				'reply' => 'J’ai déjà parcouru votre site. Nous pouvons continuer : qu’est-ce que vos visiteurs demandent le plus ?',
				'crawl' => 'done',
				'qcm'   => 'answered',
			);
		}

		return array(
			'reply' => 'J’ai parcouru votre site. ' . $question,
			'crawl' => 'done',
			'qcm'   => 'asked',
		);
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
