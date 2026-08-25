<?php
/**
 * Plugin Name: Talker
 * Plugin URI: https://talker.now
 * Description: L’agent qui répond sur votre site WordPress. Zip, sans carte, sans WordPress.org.
 * Version: 0.1.0
 * Author: Talker
 * Author URI: https://talker.now
 * Text Domain: talker-now
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TALKER_NOW_VERSION', '0.1.0' );
define( 'TALKER_NOW_FILE', __FILE__ );
define( 'TALKER_NOW_DIR', plugin_dir_path( __FILE__ ) );
define( 'TALKER_NOW_URL', plugin_dir_url( __FILE__ ) );
define( 'TALKER_NOW_OPTION', 'talker_now_settings' );

require_once TALKER_NOW_DIR . 'includes/class-settings.php';
require_once TALKER_NOW_DIR . 'includes/class-rest.php';
require_once TALKER_NOW_DIR . 'includes/class-widget.php';

/**
 * Default settings. 100 conversations is the product line; this pass does not enforce quota.
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
	return array_merge( talker_now_defaults(), $stored );
}

function talker_now_boot() {
	Talker_Now_Settings::init();
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
