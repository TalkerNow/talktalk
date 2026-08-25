<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Talker_Now_Settings {
	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
		add_action( 'admin_init', array( __CLASS__, 'register' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( TALKER_NOW_FILE ), array( __CLASS__, 'links' ) );
	}

	/**
	 * @param array<string, string> $links
	 * @return array<string, string>
	 */
	public static function links( $links ) {
		$url = admin_url( 'options-general.php?page=talker-now' );
		$links = array_merge(
			array( 'settings' => '<a href="' . esc_url( $url ) . '">Réglages</a>' ),
			$links
		);
		return $links;
	}

	public static function menu() {
		add_options_page(
			'Talker',
			'Talker',
			'manage_options',
			'talker-now',
			array( __CLASS__, 'render' )
		);
	}

	public static function register() {
		register_setting(
			'talker_now',
			TALKER_NOW_OPTION,
			array(
				'type'              => 'array',
				'sanitize_callback' => array( __CLASS__, 'sanitize' ),
				'default'           => talker_now_defaults(),
			)
		);
	}

	/**
	 * @param mixed $input
	 * @return array<string, string>
	 */
	public static function sanitize( $input ) {
		$defaults = talker_now_defaults();
		if ( ! is_array( $input ) ) {
			return $defaults;
		}

		$plan = isset( $input['plan'] ) && 'paid' === $input['plan'] ? 'paid' : 'free';

		return array(
			'webhook_url' => isset( $input['webhook_url'] ) ? esc_url_raw( trim( (string) $input['webhook_url'] ), array( 'http', 'https' ) ) : '',
			'plan'        => $plan,
			'invite_1'    => self::text( $input, 'invite_1', $defaults['invite_1'] ),
			'invite_2'    => self::text( $input, 'invite_2', $defaults['invite_2'] ),
			'invite_3'    => self::text( $input, 'invite_3', $defaults['invite_3'] ),
			'greeting'    => self::text( $input, 'greeting', $defaults['greeting'] ),
		);
	}

	/**
	 * @param array<string, mixed> $input
	 */
	private static function text( $input, $key, $fallback ) {
		if ( ! isset( $input[ $key ] ) ) {
			return $fallback;
		}
		$value = sanitize_text_field( (string) $input[ $key ] );
		return '' === $value ? $fallback : $value;
	}

	public static function render() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$s = talker_now_get_settings();
		?>
		<div class="wrap">
			<h1>Talker</h1>
			<p>Le widget s’affiche sur votre site. Collez l’URL n8n quand le serveur sera prêt. Tant qu’elle est vide, le visiteur voit toujours la bulle.</p>
			<form action="options.php" method="post">
				<?php settings_fields( 'talker_now' ); ?>
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row"><label for="talker_now_webhook">URL du webhook n8n</label></th>
						<td>
							<input name="<?php echo esc_attr( TALKER_NOW_OPTION ); ?>[webhook_url]" type="url" id="talker_now_webhook" class="regular-text code" value="<?php echo esc_attr( $s['webhook_url'] ); ?>" placeholder="https://…" />
							<p class="description">Laisser vide pour l’instant. Les messages iront ici plus tard. En cas d’échec, le widget reste.</p>
						</td>
					</tr>
					<tr>
						<th scope="row">Formule</th>
						<td>
							<fieldset>
								<label>
									<input type="radio" name="<?php echo esc_attr( TALKER_NOW_OPTION ); ?>[plan]" value="free" <?php checked( $s['plan'], 'free' ); ?> />
									Gratuit — pastille « Talker Now », mention en bas de la fenêtre
								</label>
								<br />
								<label>
									<input type="radio" name="<?php echo esc_attr( TALKER_NOW_OPTION ); ?>[plan]" value="paid" <?php checked( $s['plan'], 'paid' ); ?> />
									Payant — trois pastilles métier, sans mention
								</label>
							</fieldset>
						</td>
					</tr>
				</table>

				<details>
					<summary><strong>Avancé</strong> — pastilles d’invitation</summary>
					<p class="description">Les invitations sont allumées par défaut. Modifiez le libellé si besoin. Pas de questionnaire à l’installation.</p>
					<table class="form-table" role="presentation">
						<tr>
							<th scope="row"><label for="talker_now_invite_1">Pastille 1</label></th>
							<td><input name="<?php echo esc_attr( TALKER_NOW_OPTION ); ?>[invite_1]" type="text" id="talker_now_invite_1" class="regular-text" value="<?php echo esc_attr( $s['invite_1'] ); ?>" /></td>
						</tr>
						<tr>
							<th scope="row"><label for="talker_now_invite_2">Pastille 2</label></th>
							<td><input name="<?php echo esc_attr( TALKER_NOW_OPTION ); ?>[invite_2]" type="text" id="talker_now_invite_2" class="regular-text" value="<?php echo esc_attr( $s['invite_2'] ); ?>" /></td>
						</tr>
						<tr>
							<th scope="row"><label for="talker_now_invite_3">Pastille 3</label></th>
							<td><input name="<?php echo esc_attr( TALKER_NOW_OPTION ); ?>[invite_3]" type="text" id="talker_now_invite_3" class="regular-text" value="<?php echo esc_attr( $s['invite_3'] ); ?>" /></td>
						</tr>
						<tr>
							<th scope="row"><label for="talker_now_greeting">Accueil (vouvoiement)</label></th>
							<td>
								<textarea name="<?php echo esc_attr( TALKER_NOW_OPTION ); ?>[greeting]" id="talker_now_greeting" class="large-text" rows="2"><?php echo esc_textarea( $s['greeting'] ); ?></textarea>
								<p class="description">Ce texte s’affiche au visiteur. Ne pas citer Talker, un quota, ni le backstage.</p>
							</td>
						</tr>
					</table>
				</details>

				<?php submit_button( 'Enregistrer' ); ?>
			</form>
		</div>
		<?php
	}
}
