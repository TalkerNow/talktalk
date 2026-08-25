<?php
/**
 * Front: visitor bubble only. WP-Admin: manager bubble (not a settings form).
 * The n8n webhook URL is never exposed to the browser.
 *
 * @package TalkerNow
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Talker_Now_Widget {

	public static function init() {
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_public' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_admin' ) );
	}

	public static function enqueue_public() {
		self::enqueue( 'public' );
	}

	public static function enqueue_admin() {
		if ( ! talker_now_is_manager() ) {
			return;
		}
		self::enqueue( 'admin' );
	}

	/**
	 * @param string $surface public|admin
	 */
	private static function enqueue( $surface ) {
		$settings = talker_now_get_settings();
		$plan     = ( 'paid' === $settings['plan'] ) ? 'paid' : 'free';
		$admin    = ( 'admin' === $surface );

		wp_enqueue_style(
			'talker-now-widget',
			TALKER_NOW_URL . 'assets/widget.css',
			array(),
			TALKER_NOW_VERSION
		);

		wp_enqueue_script(
			'talker-now-widget',
			TALKER_NOW_URL . 'assets/widget.js',
			array(),
			TALKER_NOW_VERSION,
			true
		);

		$invites = array(
			array(
				'id'    => ( 'free' === $plan ) ? 'talker' : 'one',
				'label' => $settings['invite_1'],
			),
			array(
				'id'    => 'question',
				'label' => $settings['invite_2'],
			),
			array(
				'id'    => 'rdv',
				'label' => $settings['invite_3'],
			),
		);

		wp_localize_script(
			'talker-now-widget',
			'talkerNow',
			array(
				'restUrl'   => esc_url_raw( rest_url( 'talker/v1/message' ) ),
				'nonce'     => wp_create_nonce( 'wp_rest' ),
				'plan'      => $plan,
				'surface'   => $admin ? 'admin' : 'public',
				'manager'   => $admin,
				'siteName'  => wp_strip_all_tags( get_bloginfo( 'name' ) ),
				'greeting'  => $settings['greeting'],
				'poweredBy' => ( 'free' === $plan ),
				'invites'   => $invites,
				'i18n'      => array(
					'title'         => wp_strip_all_tags( get_bloginfo( 'name' ) ),
					'placeholder'   => __( 'Écrivez votre message…', 'talker-now' ),
					'send'          => __( 'Envoyer', 'talker-now' ),
					'close'         => __( 'Fermer', 'talker-now' ),
					'open'          => __( 'Ouvrir la discussion', 'talker-now' ),
					'contactHint'   => __( 'Vous pouvez laisser un nom, un e-mail ou un téléphone.', 'talker-now' ),
					'contactToggle' => __( 'Laisser un contact', 'talker-now' ),
					'name'          => __( 'Nom', 'talker-now' ),
					'email'         => __( 'E-mail', 'talker-now' ),
					'phone'         => __( 'Téléphone', 'talker-now' ),
					'offline'       => __( 'Merci. Nous vous recontacterons.', 'talker-now' ),
					'poweredBy'     => __( 'Propulsé par talker.now', 'talker-now' ),
				),
			)
		);
	}
}
