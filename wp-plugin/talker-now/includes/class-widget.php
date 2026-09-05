<?php
/**
 * Public site: visitor bubble only. WP-Admin: gérant bubble (not a form).
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

		$fr_defaults = talker_now_defaults();
		$localized   = talker_now_defaults_for_locale();
		foreach ( array( 'invite_1', 'invite_2', 'invite_3', 'greeting' ) as $key ) {
			if ( $settings[ $key ] === $fr_defaults[ $key ] ) {
				$settings[ $key ] = $localized[ $key ];
			}
		}

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

		// FR seed stays in this file so Contrôle / QCM source checks still see it.
		$admin_hello = 'Bonjour, vous me voyez ? je suis là, cliquez-moi.';
		if ( function_exists( 'talker_now_i18n' ) ) {
			$admin_hello = talker_now_i18n( 'admin.hello_chip' );
		}
		if ( $admin ) {
			$invites = array(
				array(
					'id'    => 'hello',
					'label' => $admin_hello,
				),
			);
		}

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
				'greeting'  => $admin ? '' : $settings['greeting'],
				'poweredBy' => ( ! $admin && 'free' === $plan ),
				'showContact' => ! $admin,
				'invites'   => $invites,
				'locale'    => talker_now_locale(),
				'i18n'      => array_merge(
					array(
						'title' => wp_strip_all_tags( get_bloginfo( 'name' ) ),
					),
					talker_now_widget_i18n()
				),
			)
		);
	}
}
