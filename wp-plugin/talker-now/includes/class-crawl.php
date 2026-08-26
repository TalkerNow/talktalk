<?php
/**
 * Cheap same-site read of home_url. Conditions later gérant questions.
 * Not a generic QCM. Visitors never use this.
 *
 * @package TalkerNow
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Talker_Now_Crawl {
	const OPTION = 'talker_now_crawl';

	/**
	 * @return array<string, mixed>
	 */
	public static function get() {
		$stored = get_option( self::OPTION, array() );
		if ( ! is_array( $stored ) ) {
			$stored = array();
		}
		$defaults = array(
			'status'        => 'idle',
			'url'           => '',
			'title'         => '',
			'description'   => '',
			'excerpt'       => '',
			'signal'        => '',
			'qcm_step'      => 'idle',
			'qcm_question'  => '',
			'qcm_answer'    => '',
			'updated_at'    => '',
		);
		return array_merge( $defaults, $stored );
	}

	/**
	 * @param array<string, mixed> $data
	 */
	public static function save( $data ) {
		$data['updated_at'] = gmdate( 'c' );
		update_option( self::OPTION, $data, false );
	}

	/**
	 * @return bool
	 */
	public static function is_done() {
		$crawl = self::get();
		return 'done' === $crawl['status'];
	}

	/**
	 * Fetch this WordPress home_url only. Safe to call twice (no-op if running/done).
	 *
	 * @return array<string, mixed>
	 */
	public static function run() {
		$crawl = self::get();
		if ( 'done' === $crawl['status'] ) {
			return $crawl;
		}
		if ( 'running' === $crawl['status'] ) {
			$updated = strtotime( (string) $crawl['updated_at'] );
			if ( $updated && ( time() - $updated ) < 30 ) {
				return $crawl;
			}
		}

		$crawl['status'] = 'running';
		$crawl['url']    = talker_now_home_url();
		self::save( $crawl );

		$response = wp_remote_get(
			$crawl['url'],
			array(
				'timeout'     => 8,
				'redirection' => 2,
				'headers'     => array(
					'Accept' => 'text/html',
				),
				'user-agent'  => 'TalkerSiteRead/0.1.7; ' . $crawl['url'],
			)
		);

		if ( is_wp_error( $response ) ) {
			$crawl['status'] = 'failed';
			self::save( $crawl );
			return $crawl;
		}

		$code = (int) wp_remote_retrieve_response_code( $response );
		$html = (string) wp_remote_retrieve_body( $response );
		if ( $code < 200 || $code >= 400 || '' === trim( $html ) ) {
			$crawl['status'] = 'failed';
			self::save( $crawl );
			return $crawl;
		}

		$parsed           = self::parse( $html );
		$crawl['title']   = $parsed['title'];
		$crawl['description'] = $parsed['description'];
		$crawl['excerpt'] = $parsed['excerpt'];
		$crawl['signal']  = self::signal( $parsed['haystack'] );
		$crawl['status']  = 'done';
		self::save( $crawl );
		return $crawl;
	}

	/**
	 * First métier question, from what the crawl actually found.
	 *
	 * @param array<string, mixed> $crawl
	 * @return string
	 */
	public static function first_question( $crawl ) {
		$title = trim( (string) $crawl['title'] );
		$desc  = trim( (string) $crawl['description'] );
		$label = $title;
		if ( '' === $label ) {
			$label = $desc;
		}
		if ( '' === $label ) {
			$label = (string) get_bloginfo( 'name' );
		}

		switch ( (string) $crawl['signal'] ) {
			case 'restaurant':
				return 'J’ai parcouru l’accueil : on y parle de restaurant, de carte ou de table. Vous tenez bien un restaurant — et de quel type ?';
			case 'sante':
				return 'J’ai lu l’accueil : cela ressemble à un cabinet de santé. Quel est votre métier, précisément ?';
			case 'droit':
				return 'Votre accueil évoque un cabinet juridique. Quelle est votre activité exacte ?';
			case 'beaute':
				return 'J’ai vu des mentions de salon ou de soins. C’est bien votre métier — lequel, concrètement ?';
			case 'auto':
				return 'L’accueil parle d’auto ou d’atelier. Quel est votre métier, pour que je réponde comme vous ?';
			case 'immo':
				return 'J’ai parcouru l’accueil : on dirait de l’immobilier. C’est bien ça, et pour quel type de biens ?';
			case 'hebergement':
				return 'Votre page d’accueil évoque de l’hébergement. Hôtel, chambres, autre — vous faites quoi, exactement ?';
			default:
				if ( '' !== $label ) {
					return 'J’ai parcouru votre accueil (« ' . $label . ' »). Quel est votre métier, pour que je parle comme vous ?';
				}
				return 'J’ai parcouru votre site. Quel est votre métier, concrètement, pour que je réponde comme vous ?';
		}
	}

	/**
	 * @param string $html
	 * @return array<string, string>
	 */
	private static function parse( $html ) {
		$title = '';
		if ( preg_match( '/<title[^>]*>(.*?)<\/title>/is', $html, $match ) ) {
			$title = self::plain( $match[1] );
		}

		$description = '';
		if ( preg_match( '/<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\']/i', $html, $match ) ) {
			$description = self::plain( $match[1] );
		} elseif ( preg_match( '/<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description["\']/i', $html, $match ) ) {
			$description = self::plain( $match[1] );
		}

		$h1 = '';
		if ( preg_match( '/<h1[^>]*>(.*?)<\/h1>/is', $html, $match ) ) {
			$h1 = self::plain( $match[1] );
		}

		$excerpt = self::plain( $html );
		if ( strlen( $excerpt ) > 1800 ) {
			$excerpt = substr( $excerpt, 0, 1800 );
		}

		$haystack = strtolower( $title . ' ' . $description . ' ' . $h1 . ' ' . $excerpt );

		return array(
			'title'       => $title,
			'description' => $description,
			'excerpt'     => $excerpt,
			'haystack'    => $haystack,
		);
	}

	/**
	 * @param string $haystack lowercase
	 * @return string
	 */
	private static function signal( $haystack ) {
		$map = array(
			'restaurant'  => array( 'restaurant', 'brasserie', 'bistrot', 'menu', 'carte', 'chef', 'gastronom' ),
			'sante'       => array( 'cabinet', 'medecin', 'médecin', 'dentiste', 'osteo', 'ostéo', 'kine', 'kiné', 'clinique', 'docteur' ),
			'droit'       => array( 'avocat', 'notaire', 'juridique', 'barreau' ),
			'beaute'      => array( 'coiffure', 'coiffeur', 'salon', 'esthetique', 'esthétique', 'spa' ),
			'auto'        => array( 'garage', 'carrosserie', 'automobile', 'vehicule', 'véhicule' ),
			'immo'        => array( 'immobilier', 'agence immobiliere', 'agence immobilière', 'location saisonniere' ),
			'hebergement' => array( 'hotel', 'hôtel', 'chambres d', 'gite', 'gîte', 'chambre d’hote', "chambre d'hote" ),
		);
		foreach ( $map as $signal => $needles ) {
			foreach ( $needles as $needle ) {
				if ( false !== strpos( $haystack, $needle ) ) {
					return $signal;
				}
			}
		}
		return '';
	}

	/**
	 * @param string $value
	 * @return string
	 */
	private static function plain( $value ) {
		$value = wp_strip_all_tags( (string) $value );
		$value = html_entity_decode( $value, ENT_QUOTES, 'UTF-8' );
		$value = preg_replace( '/\s+/u', ' ', $value );
		return trim( (string) $value );
	}
}
