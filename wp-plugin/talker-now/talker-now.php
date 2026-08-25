<?php
/**
 * Plugin Name: Talker
 * Plugin URI: https://talker.now
 * Description: L’agent qui répond sur votre site WordPress. Zip, sans carte, sans WordPress.org.
 * Version: 0.1.3
 * Author: Talker
 * Author URI: https://talker.now
 * Text Domain: talker-now
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TALKER_NOW_VERSION', '0.1.3' );
define( 'TALKER_NOW_FILE', __FILE__ );
define( 'TALKER_NOW_DIR', plugin_dir_path( __FILE__ ) );
define( 'TALKER_NOW_URL', plugin_dir_url( __FILE__ ) );
define( 'TALKER_NOW_OPTION', 'talker_now_settings' );

require_once TALKER_NOW_DIR . 'includes/class-rest.php';
require_once TALKER_NOW_DIR . 'includes/class-widget.php';

/**
 * Defaults. Widget is on at activate. No admin form.
 * Plan stays free until a licence writes otherwise. Webhook is Talker-side later.
 *
 * @return array<string, string>
 */
function talker_now_defaults() {
	return array(
		'webhook_url' => '',
		'plan'        => 'free',
		'invite_1'    => 'Talker Now',
		'invite_2'    => 'Poser une question',
		'invite_3'    => 'Prendre rendez-vous',
		'greeting'    => 'Bonjour. Comment puis-je vous aider ?',
	);
}

/**
 * @return array<string, string>
 */
function talker_now_get_settings() {
	$stored = get_option( TALKER_NOW_OPTION, array() );
	if ( ! is_array( $stored ) ) {
		$stored = array();
	}
	$settings = array_merge( talker_now_defaults(), $stored );
	if ( 'paid' !== $settings['plan'] ) {
		$settings['plan'] = 'free';
	}
	return $settings;
}

/**
 * Site URL = this WordPress. Never asked in a form.
 *
 * @return string
 */
function talker_now_home_url() {
	return home_url( '/' );
}

/**
 * Contact email = WordPress admin_email. Never asked in a form.
 *
 * @return string
 */
function talker_now_admin_email() {
	return sanitize_email( (string) get_option( 'admin_email', '' ) );
}

/**
 * WP-Admin bubble is the gérant surface. Public site is visitor-only.
 *
 * @return bool
 */
function talker_now_is_manager() {
	return is_user_logged_in() && current_user_can( 'manage_options' );
}

/**
 * Site-read stub for later crawl-conditioned manager questions in WP-Admin.
 * This WordPress only. Not a settings form. Visitors on the public site never receive this path.
 *
 * @return array<string, string>
 */
function talker_now_site_read() {
	return array(
		'url'         => talker_now_home_url(),
		'name'        => wp_strip_all_tags( (string) get_bloginfo( 'name' ) ),
		'description' => wp_strip_all_tags( (string) get_bloginfo( 'description' ) ),
		'instruction' => 'Read this site only (home_url, same WordPress). Condition later manager questions on that crawl. Not a generic questionnaire. Visitors never take this path.',
	);
}

function talker_now_boot() {
	Talker_Now_REST::init();
	Talker_Now_Widget::init();
}
add_action( 'plugins_loaded', 'talker_now_boot' );

register_activation_hook(
	__FILE__,
	static function () {
		if ( false === get_option( TALKER_NOW_OPTION, false ) ) {
			add_option( TALKER_NOW_OPTION, talker_now_defaults() );
		}
	}
);
