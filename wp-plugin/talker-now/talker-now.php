<?php
/**
 * Plugin Name: Talker
 * Plugin URI: https://talker.now
 * Update URI: https://talker.now/plugin/talker-now/
 * Description: L’agent qui répond sur votre site WordPress. Zip, sans carte.
 * Version: 0.1.13
 * Author: Talker
 * Author URI: https://talker.now
 * Text Domain: talker-now
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TALKER_NOW_VERSION', '0.1.13' );
define( 'TALKER_NOW_FILE', __FILE__ );
define( 'TALKER_NOW_DIR', plugin_dir_path( __FILE__ ) );
define( 'TALKER_NOW_URL', plugin_dir_url( __FILE__ ) );
define( 'TALKER_NOW_OPTION', 'talker_now_settings' );

require_once TALKER_NOW_DIR . 'includes/class-crawl.php';
require_once TALKER_NOW_DIR . 'includes/class-rest.php';
require_once TALKER_NOW_DIR . 'includes/class-widget.php';

/**
 * @return array<string, string>
 */
function talker_now_defaults() {
	return array(
		'webhook_url' => '',
		'plan'        => 'free',
		'hide_badge'  => '0',
		'privacy_url' => '',
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
	$settings['hide_badge']  = talker_now_flag_on( $settings['hide_badge'] ) ? '1' : '0';
	$settings['privacy_url'] = esc_url_raw( (string) $settings['privacy_url'] );
	return $settings;
}

/**
 * @param mixed $value
 * @return bool
 */
function talker_now_flag_on( $value ) {
	return in_array( strtolower( trim( (string) $value ) ), array( '1', 'true', 'yes', 'on' ), true );
}

/**
 * @param array<string, string>|null $settings
 * @return string
 */
function talker_now_privacy_policy_url( $settings = null ) {
	if ( ! is_array( $settings ) ) {
		$settings = talker_now_get_settings();
	}
	$custom = isset( $settings['privacy_url'] ) ? (string) $settings['privacy_url'] : '';
	if ( '' !== $custom ) {
		return $custom;
	}
	$wp = function_exists( 'get_privacy_policy_url' ) ? (string) get_privacy_policy_url() : '';
	$wp = esc_url_raw( $wp );
	if ( '' !== $wp ) {
		return $wp;
	}
	return 'https://talker.now/confidentialite';
}

function talker_now_home_url() {
	return home_url( '/' );
}

function talker_now_admin_email() {
	return sanitize_email( (string) get_option( 'admin_email', '' ) );
}

function talker_now_can_manage_options() {
	return is_user_logged_in() && current_user_can( 'manage_options' );
}

/**
 * @return array<string, string>
 */
function talker_now_site_read() {
	$data = array(
		'url'         => talker_now_home_url(),
		'name'        => wp_strip_all_tags( (string) get_bloginfo( 'name' ) ),
		'description' => wp_strip_all_tags( (string) get_bloginfo( 'description' ) ),
		'instruction' => 'Auto-scroll and read this site only (WordPress home_url, same origin). Condition later gérant questions on that crawl. Not a generic questionnaire. Visitors never take this path.',
	);
	return apply_filters( 'talker_now_site_read', $data );
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
