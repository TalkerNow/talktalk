<?php
/**
 * Uninstall: remove stored settings. Conversations are not stored locally.
 *
 * @package TalkerNow
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_option( 'talker_now_settings' );
delete_option( 'talker_now_crawl' );
