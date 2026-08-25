<?php
/**
 * Public widget: visitors always. Logged-in administrators may take the
 * gérant stub (cookie). No login in the bubble. No WP-Admin questionnaire.
 * The n8n webhook URL is never exposed to the browser.
 *
 * @package TalkerNow
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Talker_Now_Widget {

	public static function init() {
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue' ) );
	}

	public static function enqueue() {
		if ( is_admin() ) {
			return;
		}

		$settings = talker_now_get_settings();
		$plan     = ( 'paid' === $settings['plan'] ) ? 'paid' : 'free';
		$manager  = talker_now_is_manager();

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
				'surface'   => 'public',
				'manager'   => $manager,
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
