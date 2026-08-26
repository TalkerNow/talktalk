<?php
/**
 * Same-origin read of this WordPress. Extracts facts, classifies one of five
 * intensity families, then the gérant QCM is generated from those facts.
 * Visitors never use this. Not a generic questionnaire. Not an EOR prompt.
 *
 * @package TalkerNow
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Talker_Now_Crawl {
	const OPTION = 'talker_now_crawl';

	const FAMILIES = array( 'hours', 'trade', 'realtor', 'medical', 'spin' );

	/**
	 * @return array<string, mixed>
	 */
	public static function get() {
		$stored = get_option( self::OPTION, array() );
		if ( ! is_array( $stored ) ) {
			$stored = array();
		}
		$defaults = array(
			'status'            => 'idle',
			'url'               => '',
			'title'             => '',
			'description'       => '',
			'excerpt'           => '',
			'signal'            => '',
			'family'            => '',
			'facts'             => array(),
			'thin'              => false,
			'phase'             => 'idle',
			'q_index'           => 0,
			'questions'         => array(),
			'answers'           => array(),
			'family_confirmed'  => false,
			'qcm_step'          => 'idle',
			'qcm_question'      => '',
			'qcm_answer'        => '',
			'updated_at'        => '',
		);
		$crawl = array_merge( $defaults, $stored );
		if ( ! is_array( $crawl['facts'] ) ) {
			$crawl['facts'] = array();
		}
		$crawl['facts'] = array_merge( self::empty_facts(), $crawl['facts'] );
		if ( ! is_array( $crawl['questions'] ) ) {
			$crawl['questions'] = array();
		}
		if ( ! is_array( $crawl['answers'] ) ) {
			$crawl['answers'] = array();
		}
		return $crawl;
	}

	/**
	 * @param array<string, mixed> $data
	 */
	public static function save( $data ) {
		$data['updated_at'] = gmdate( 'c' );
		if ( isset( $data['phase'] ) ) {
			if ( in_array( $data['phase'], array( 'confirm', 'reclass', 'frame', 'questions' ), true ) ) {
				$data['qcm_step'] = 'asked';
			} elseif ( 'done' === $data['phase'] ) {
				$data['qcm_step'] = 'answered';
			}
		}
		update_option( self::OPTION, $data, false );
	}

	/**
	 * @return bool
	 */
	public static function is_done() {
		$crawl = self::get();
		return in_array( $crawl['status'], array( 'done', 'failed' ), true );
	}

	/**
	 * Fetch this WordPress home_url, then a few same-origin pages named like
	 * services / horaires / contact. Safe to call twice.
	 *
	 * @return array<string, mixed>
	 */
	public static function run() {
		$crawl = self::get();
		if ( in_array( $crawl['status'], array( 'done', 'failed' ), true ) ) {
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

		$home = self::fetch_html( $crawl['url'] );
		if ( false === $home ) {
			$crawl['status'] = 'failed';
			$crawl['thin']   = true;
			self::save( $crawl );
			return $crawl;
		}

		$blobs   = array( $home );
		$extras  = self::extra_urls( $home, $crawl['url'] );
		foreach ( $extras as $extra ) {
			$page = self::fetch_html( $extra );
			if ( false !== $page ) {
				$blobs[] = $page;
			}
		}

		$merged = self::merge_pages( $blobs );
		$facts  = self::extract_facts( $merged );
		$family = self::classify_family( $facts['haystack'] );
		$thin   = self::is_thin( $facts, $family );

		$crawl['title']       = $merged['title'];
		$crawl['description'] = $merged['description'];
		$crawl['excerpt']     = $merged['excerpt'];
		$crawl['facts']       = $facts;
		$crawl['family']      = $thin ? '' : $family;
		$crawl['thin']        = $thin;
		$crawl['signal']      = $crawl['family'];
		$crawl['status']      = 'done';
		self::save( $crawl );
		return $crawl;
	}

	/**
	 * Open-panel payload: scan wheel while running, otherwise scanned + first QCM.
	 *
	 * @return array<string, mixed>
	 */
	public static function hello() {
		$crawl = self::get();
		if ( ! in_array( $crawl['status'], array( 'done', 'failed' ), true ) ) {
			self::run();
			$crawl = self::get();
		}

		if ( ! in_array( $crawl['status'], array( 'done', 'failed' ), true ) ) {
			return array(
				'visual'   => 'scan',
				'crawl'    => $crawl['status'] ? $crawl['status'] : 'running',
				'qcm'      => 'idle',
				'reply'    => '',
				'intro'    => '',
				'question' => '',
			);
		}

		if ( 'failed' === $crawl['status'] ) {
			$crawl['thin']   = true;
			$crawl['family'] = '';
			$crawl['status'] = 'done';
			self::save( $crawl );
		}

		if ( in_array( $crawl['phase'], array( 'idle', '' ), true ) ) {
			$crawl = self::begin_qcm( $crawl );
		}

		return self::present( $crawl, true );
	}

	/**
	 * One gérant answer. Confirm, reclass, frame, or fact questions.
	 *
	 * @param string $message
	 * @return array<string, mixed>
	 */
	public static function answer( $message ) {
		$crawl   = self::get();
		$message = trim( $message );
		if ( '' === $message ) {
			return self::hello();
		}

		if ( in_array( $crawl['phase'], array( 'idle', '' ), true ) ) {
			$crawl = self::begin_qcm( $crawl );
			self::save( $crawl );
		}

		switch ( (string) $crawl['phase'] ) {
			case 'confirm':
				$crawl = self::on_confirm( $crawl, $message );
				break;
			case 'reclass':
				$crawl = self::on_reclass( $crawl, $message );
				break;
			case 'frame':
				$crawl = self::on_frame( $crawl, $message );
				break;
			case 'questions':
				$crawl = self::on_question( $crawl, $message );
				break;
			case 'done':
				$crawl['answers'][] = array(
					'phase' => 'done',
					'text'  => $message,
				);
				self::save( $crawl );
				return array(
					'visual'   => 'talk',
					'crawl'    => 'done',
					'qcm'      => 'done',
					'reply'    => 'C’est noté. Dites-moi si quelque chose a changé sur le site.',
					'intro'    => '',
					'question' => '',
				);
			default:
				$crawl = self::begin_qcm( $crawl );
				break;
		}

		self::save( $crawl );
		return self::present( $crawl, false );
	}

	/**
	 * @deprecated Use confirm_question(). Kept as a named entry for older calls.
	 *
	 * @param array<string, mixed> $crawl
	 * @return string
	 */
	public static function first_question( $crawl ) {
		if ( ! empty( $crawl['thin'] ) || '' === (string) $crawl['family'] ) {
			$framing = self::framing_questions();
			return $framing[0];
		}
		$facts = isset( $crawl['facts'] ) && is_array( $crawl['facts'] ) ? $crawl['facts'] : self::empty_facts();
		return self::confirm_question( (string) $crawl['family'], $facts );
	}

	/**
	 * @param string $family
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	public static function confirm_question( $family, $facts ) {
		$city     = trim( (string) $facts['city'] );
		$where    = '' !== $city ? ' à ' . $city : '';
		$activity = self::activity_label( $facts );
		$services = self::service_list( $facts );

		switch ( $family ) {
			case 'medical':
				$label = self::medical_label( $facts );
				return 'Vous êtes bien ' . $label . $where . ' ?';
			case 'trade':
				$label = self::trade_label( $facts );
				return 'Vous êtes bien ' . $label . $where . ' ?';
			case 'realtor':
				$extra = '' !== $services ? ' — ' . $services : '';
				return 'Vous tenez bien une agence immobilière' . $where . $extra . ' ?';
			case 'hours':
				$place = '' !== $activity ? $activity : 'un lieu ouvert au public';
				$hours = trim( (string) $facts['hours'] );
				$tail  = '' !== $hours ? ' J’ai lu : ' . $hours . '.' : '';
				return 'Vous accueillez bien le public — ' . $place . $where . ' ?' . $tail;
			case 'spin':
				$what = '' !== $activity ? $activity : 'du conseil ou de l’accompagnement';
				return 'Vous faites bien ' . $what . $where . ' — un accompagnement plutôt qu’un commerce de passage ?';
			default:
				if ( '' !== $activity ) {
					return 'Vous êtes bien « ' . $activity . ' »' . $where . ' ?';
				}
				return 'Vous êtes bien installé' . $where . ' ?';
		}
	}

	/**
	 * 4–8 questions from crawled facts for this family. Not a stock métier form.
	 *
	 * @param string               $family
	 * @param array<string, mixed> $facts
	 * @param string               $spoken extra words from the gérant (reclass / framing)
	 * @return array<int, string>
	 */
	public static function questions_for( $family, $facts, $spoken = '' ) {
		$facts = array_merge( self::empty_facts(), is_array( $facts ) ? $facts : array() );
		if ( '' !== trim( $spoken ) ) {
			$facts['spoken'] = self::clip( self::plain( $spoken ), 180 );
		}

		switch ( $family ) {
			case 'hours':
				$pool = self::questions_hours( $facts );
				break;
			case 'trade':
				$pool = self::questions_trade( $facts );
				break;
			case 'realtor':
				$pool = self::questions_realtor( $facts );
				break;
			case 'medical':
				$pool = self::questions_medical( $facts );
				break;
			case 'spin':
				$pool = self::questions_spin( $facts );
				break;
			default:
				$pool = self::framing_questions();
				break;
		}

		$pool = array_values(
			array_filter(
				$pool,
				static function ( $q ) {
					return is_string( $q ) && '' !== trim( $q );
				}
			)
		);
		$count = count( $pool );
		if ( $count > 8 ) {
			$pool = array_slice( $pool, 0, 8 );
		}
		return $pool;
	}

	/**
	 * @return array<int, string>
	 */
	public static function framing_questions() {
		return array(
			'Le site dit trop peu : qui êtes-vous, concrètement — métier et ville ?',
			'Pourquoi les gens vous appellent ou vous écrivent, en premier ?',
			'Qu’est-ce que le bot ne doit jamais dire ou promettre à votre place ?',
		);
	}

	/**
	 * @return array<string, string>
	 */
	public static function empty_facts() {
		return array(
			'activity'  => '',
			'city'      => '',
			'services'  => '',
			'hours'     => '',
			'booking'   => '',
			'contact'   => '',
			'title'     => '',
			'h1'        => '',
			'haystack'  => '',
			'spoken'    => '',
		);
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @return array<string, mixed>
	 */
	private static function begin_qcm( $crawl ) {
		if ( ! empty( $crawl['thin'] ) || '' === (string) $crawl['family'] ) {
			$crawl['phase']            = 'frame';
			$crawl['questions']        = self::framing_questions();
			$crawl['q_index']          = 0;
			$crawl['family_confirmed'] = false;
			$crawl['qcm_question']     = $crawl['questions'][0];
			self::save( $crawl );
			return $crawl;
		}

		$crawl['phase']            = 'confirm';
		$crawl['questions']        = array();
		$crawl['q_index']          = 0;
		$crawl['family_confirmed'] = false;
		$crawl['qcm_question']     = self::confirm_question( (string) $crawl['family'], $crawl['facts'] );
		self::save( $crawl );
		return $crawl;
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @param bool                 $with_intro
	 * @return array<string, mixed>
	 */
	private static function present( $crawl, $with_intro ) {
		$phase    = (string) $crawl['phase'];
		$question = (string) $crawl['qcm_question'];
		$intro    = '';

		if ( $with_intro ) {
			if ( 'failed' === $crawl['status'] || ! empty( $crawl['thin'] ) && 'frame' === $phase && 0 === (int) $crawl['q_index'] ) {
				$intro = 'J’ai parcouru votre site : il dit trop peu pour que je devine. On cadre en trois questions, puis je génère la suite.';
			} elseif ( 'done' === $phase ) {
				$intro = 'J’ai parcouru votre site.';
				$question = 'On a déjà cadré l’essentiel. Dites-moi si quelque chose a changé.';
			} else {
				$intro = 'J’ai parcouru votre site, on peut commencer le QCM.';
			}
		}

		if ( 'confirm' === $phase && '' === $question ) {
			$question = self::confirm_question( (string) $crawl['family'], $crawl['facts'] );
		}
		if ( in_array( $phase, array( 'frame', 'questions' ), true ) && '' === $question ) {
			$i = (int) $crawl['q_index'];
			if ( isset( $crawl['questions'][ $i ] ) ) {
				$question = (string) $crawl['questions'][ $i ];
			}
		}
		if ( 'reclass' === $phase && '' === $question ) {
			$question = self::reclass_question();
		}
		if ( 'done' === $phase && '' === $question ) {
			$question = 'C’est noté. Je m’en servirai pour parler comme vous sur le site.';
		}

		$reply = $question;

		return array(
			'visual'   => 'ready',
			'crawl'    => 'done',
			'qcm'      => $phase ? $phase : 'idle',
			'reply'    => $reply,
			'intro'    => $intro,
			'question' => $question,
		);
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @param string               $message
	 * @return array<string, mixed>
	 */
	private static function on_confirm( $crawl, $message ) {
		$crawl['answers'][] = array(
			'phase'  => 'confirm',
			'family' => (string) $crawl['family'],
			'text'   => $message,
		);
		$crawl['qcm_answer'] = $message;

		$stance = self::stance( $message );
		$hint   = self::classify_family( self::plain( $message ) );

		if ( 'no' === $stance || ( '' !== $hint && $hint !== (string) $crawl['family'] && 'yes' !== $stance ) ) {
			if ( '' !== $hint && $hint !== (string) $crawl['family'] ) {
				return self::switch_family( $crawl, $hint, $message );
			}
			$crawl['phase']        = 'reclass';
			$crawl['qcm_question'] = self::reclass_question();
			return $crawl;
		}

		$crawl['family_confirmed'] = true;
		$crawl['questions']        = self::questions_for( (string) $crawl['family'], $crawl['facts'], $message );
		$crawl['q_index']          = 0;
		$crawl['phase']            = 'questions';
		$crawl['qcm_question']     = isset( $crawl['questions'][0] ) ? $crawl['questions'][0] : '';
		return $crawl;
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @param string               $message
	 * @return array<string, mixed>
	 */
	private static function on_reclass( $crawl, $message ) {
		$crawl['answers'][] = array(
			'phase' => 'reclass',
			'text'  => $message,
		);
		$hint = self::classify_family( self::plain( $message ) );
		if ( '' === $hint ) {
			$hint = self::family_from_choice( $message );
		}
		if ( '' === $hint ) {
			$crawl['thin']         = true;
			$crawl['family']       = '';
			$crawl['phase']        = 'frame';
			$crawl['questions']    = self::framing_questions();
			$crawl['q_index']      = 0;
			$crawl['qcm_question'] = $crawl['questions'][0];
			return $crawl;
		}
		return self::switch_family( $crawl, $hint, $message );
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @param string               $message
	 * @return array<string, mixed>
	 */
	private static function on_frame( $crawl, $message ) {
		$crawl['answers'][] = array(
			'phase' => 'frame',
			'index' => (int) $crawl['q_index'],
			'text'  => $message,
		);
		$crawl['q_index'] = (int) $crawl['q_index'] + 1;

		if ( $crawl['q_index'] < 3 ) {
			$crawl['qcm_question'] = $crawl['questions'][ $crawl['q_index'] ];
			return $crawl;
		}

		$spoken = '';
		foreach ( $crawl['answers'] as $row ) {
			if ( isset( $row['phase'], $row['text'] ) && 'frame' === $row['phase'] ) {
				$spoken .= ' ' . $row['text'];
			}
		}
		$spoken = self::plain( $spoken );
		$hint   = self::classify_family( $spoken );
		if ( '' === $hint ) {
			$hint = self::family_from_choice( $spoken );
		}
		if ( '' === $hint ) {
			$hint = 'trade';
		}

		$facts           = $crawl['facts'];
		$facts['spoken'] = self::clip( $spoken, 400 );
		$city            = self::find_city( strtolower( $spoken ) . ' ' . $spoken );
		if ( '' !== $city && '' === (string) $facts['city'] ) {
			$facts['city'] = $city;
		}

		$crawl['family']           = $hint;
		$crawl['thin']             = false;
		$crawl['facts']            = $facts;
		$crawl['family_confirmed'] = true;
		$crawl['questions']        = self::questions_for( $hint, $facts, $spoken );
		$crawl['q_index']          = 0;
		$crawl['phase']            = 'questions';
		$crawl['qcm_question']     = isset( $crawl['questions'][0] ) ? $crawl['questions'][0] : '';
		return $crawl;
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @param string               $message
	 * @return array<string, mixed>
	 */
	private static function on_question( $crawl, $message ) {
		$crawl['answers'][] = array(
			'phase' => 'questions',
			'index' => (int) $crawl['q_index'],
			'text'  => $message,
		);
		$crawl['qcm_answer'] = $message;
		$crawl['q_index']    = (int) $crawl['q_index'] + 1;
		$total               = count( $crawl['questions'] );

		if ( $crawl['q_index'] >= $total ) {
			$crawl['phase']        = 'done';
			$crawl['qcm_question'] = '';
			return $crawl;
		}

		$crawl['qcm_question'] = $crawl['questions'][ $crawl['q_index'] ];
		return $crawl;
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @param string               $family
	 * @param string               $message
	 * @return array<string, mixed>
	 */
	private static function switch_family( $crawl, $family, $message ) {
		$crawl['family']           = $family;
		$crawl['signal']           = $family;
		$crawl['thin']             = false;
		$crawl['family_confirmed'] = true;
		$crawl['questions']        = self::questions_for( $family, $crawl['facts'], $message );
		$crawl['q_index']          = 0;
		$crawl['phase']            = 'questions';
		$crawl['qcm_question']     = isset( $crawl['questions'][0] ) ? $crawl['questions'][0] : '';
		return $crawl;
	}

	/**
	 * @return string
	 */
	private static function reclass_question() {
		return 'D’accord, je me trompe. Vous êtes plutôt : un lieu avec des horaires (musée, visites), un artisan local (plombier, dépannage…), une agence immobilière, un cabinet médical, ou un accompagnement / conseil ?';
	}

	/**
	 * @param string $text
	 * @return string yes|no|other
	 */
	public static function stance( $text ) {
		$n = self::norm( $text );
		if ( '' === $n ) {
			return 'other';
		}
		if ( preg_match( '/^(non|nan|nope|faux|incorrect)\b|pas du tout|pas vraiment|vous vous trompez|ce n est pas|c est pas ca|c est pas/', $n ) ) {
			return 'no';
		}
		if ( preg_match( '/\b(oui|ouais|yep|yes|exactement|exact|correct|voila|tout a fait|c est ca|cest ca|c est bien ca|bien sur|tout juste)\b/', $n ) ) {
			return 'yes';
		}
		return 'other';
	}

	/**
	 * @param string $text
	 * @return string
	 */
	public static function family_from_choice( $text ) {
		$n = self::norm( $text );
		$map = array(
			'hours'   => array( 'musee', 'musée', 'horaire', 'visite', 'expo', 'monument', 'chateau', 'château', 'parc', 'lieu' ),
			'trade'   => array( 'plombier', 'artisan', 'depannage', 'dépannage', 'electricien', 'électricien', 'chauffagiste', 'serrurier', 'couvreur', 'macon', 'maçon' ),
			'realtor' => array( 'immo', 'agence', 'bien', 'location', 'vente', 'appartement', 'maison' ),
			'medical' => array( 'medical', 'médical', 'cabinet', 'dentiste', 'medecin', 'médecin', 'osteo', 'ostéo', 'kine', 'kiné', 'docteur', 'sante', 'santé' ),
			'spin'    => array( 'conseil', 'accompagn', 'spin', 'b2b', 'cabinet de conseil', 'formation', 'consultant' ),
		);
		$best  = '';
		$score = 0;
		foreach ( $map as $family => $needles ) {
			$hit = 0;
			foreach ( $needles as $needle ) {
				if ( false !== strpos( $n, self::norm( $needle ) ) ) {
					$hit++;
				}
			}
			if ( $hit > $score ) {
				$score = $hit;
				$best  = $family;
			}
		}
		return $score > 0 ? $best : '';
	}

	/**
	 * @param string $haystack lowercase-ish text
	 * @return string
	 */
	public static function classify_family( $haystack ) {
		$h = self::norm( $haystack );
		if ( '' === $h ) {
			return '';
		}

		$scores = array(
			'medical' => 0,
			'realtor' => 0,
			'trade'   => 0,
			'hours'   => 0,
			'spin'    => 0,
		);

		$bags = array(
			'medical' => array(
				'dentiste'           => 4,
				'cabinet dentaire'   => 5,
				'orthodont'          => 4,
				'medecin'            => 4,
				'médecin'            => 4,
				'docteur'            => 3,
				'osteo'              => 4,
				'ostéopathe'         => 4,
				'kine'               => 3,
				'kiné'               => 3,
				'kinesither'         => 4,
				'clinique'           => 3,
				'sage femme'         => 4,
				'psychologue'        => 3,
				'veterinaire'        => 3,
				'vétérinaire'        => 3,
				'doctolib'           => 3,
				'cabinet medical'    => 5,
				'cabinet médical'    => 5,
				'infirmerie'         => 2,
				'consultation'       => 1,
				'ordonnance'         => 2,
			),
			'realtor' => array(
				'immobilier'           => 5,
				'agence immobiliere'   => 5,
				'agence immobilière'   => 5,
				'agent immobilier'     => 5,
				'estimation immobili'  => 4,
				'mandat'               => 2,
				'vente appartement'    => 3,
				'location saisonniere' => 3,
				'location saisonnière' => 3,
				'gestion locative'     => 4,
				'visite du bien'       => 3,
				'dpe '                 => 2,
				'compromis'            => 2,
			),
			'trade'   => array(
				'plombier'     => 5,
				'plomberie'    => 5,
				'debouchage'   => 4,
				'débouchage'   => 4,
				'electricien'  => 5,
				'électricien'  => 5,
				'chauffagiste' => 5,
				'serrurier'    => 5,
				'couvreur'     => 4,
				'macon'        => 3,
				'maçon'        => 3,
				'depannage'    => 3,
				'dépannage'    => 3,
				'artisan'      => 2,
				'fuite d eau'  => 3,
				'fuite d’eau'  => 3,
				'chauffe eau'  => 3,
				'intervention 7j' => 2,
			),
			'hours'   => array(
				'musee'             => 5,
				'musée'             => 5,
				'museum'            => 4,
				'horaires d ouverture' => 4,
				'horaires d’ouverture' => 4,
				'visite guidee'     => 3,
				'visite guidée'     => 3,
				'exposition'        => 3,
				'monument'          => 3,
				'chateau'           => 3,
				'château'           => 3,
				'parc zoologique'   => 4,
				'billetterie'       => 3,
				'nocturne'          => 2,
				'collection permanente' => 3,
			),
			'spin'    => array(
				'cabinet de conseil' => 5,
				'conseil aux'        => 4,
				'accompagnement des' => 4,
				'accompagnement des dirigeants' => 5,
				'consultant'         => 3,
				'strategie d entreprise' => 4,
				'stratégie d’entreprise' => 4,
				'formation professionnelle' => 3,
				'b to b'             => 3,
				'dirigeants'         => 2,
				'organisation et'    => 2,
				'avocat'             => 3,
				'notaire'            => 3,
				'expertise comptable' => 3,
				'expert comptable'   => 3,
			),
		);

		foreach ( $bags as $family => $needles ) {
			foreach ( $needles as $needle => $weight ) {
				if ( false !== strpos( $h, self::norm( $needle ) ) ) {
					$scores[ $family ] += $weight;
				}
			}
		}

		if ( false !== strpos( $h, 'cabinet' ) && $scores['medical'] > 0 ) {
			$scores['medical'] += 1;
		}

		arsort( $scores );
		$top    = (int) reset( $scores );
		$family = (string) key( $scores );
		if ( $top < 3 ) {
			return '';
		}
		return $family;
	}

	/**
	 * @param array<string, string> $parsed
	 * @return array<string, string>
	 */
	public static function extract_facts( $parsed ) {
		$facts       = self::empty_facts();
		$title       = isset( $parsed['title'] ) ? (string) $parsed['title'] : '';
		$description = isset( $parsed['description'] ) ? (string) $parsed['description'] : '';
		$h1          = isset( $parsed['h1'] ) ? (string) $parsed['h1'] : '';
		$excerpt     = isset( $parsed['excerpt'] ) ? (string) $parsed['excerpt'] : '';
		$haystack    = isset( $parsed['haystack'] ) ? (string) $parsed['haystack'] : strtolower( $title . ' ' . $description . ' ' . $h1 . ' ' . $excerpt );

		$facts['title']       = $title;
		$facts['h1']          = $h1;
		$facts['haystack']    = $haystack;
		$facts['activity']    = self::clip( $h1 ? $h1 : ( $title ? $title : $description ), 120 );
		$facts['city']        = self::find_city( $title . ' ' . $description . ' ' . $h1 . ' ' . $excerpt );
		$facts['hours']       = self::find_hours( $title . ' ' . $description . ' ' . $excerpt );
		$facts['booking']     = self::find_booking( $haystack );
		$facts['contact']     = self::find_contact( $excerpt . ' ' . $description );
		$facts['services']    = self::find_services( $parsed, $haystack );
		return $facts;
	}

	/**
	 * @param array<string, mixed> $facts
	 * @param string               $family
	 * @return bool
	 */
	public static function is_thin( $facts, $family ) {
		if ( '' === $family ) {
			return true;
		}
		$substance = 0;
		foreach ( array( 'city', 'services', 'hours', 'booking', 'activity' ) as $key ) {
			if ( '' !== trim( (string) $facts[ $key ] ) ) {
				$substance++;
			}
		}
		$excerpt = isset( $facts['haystack'] ) ? (string) $facts['haystack'] : '';
		if ( $substance < 2 && strlen( $excerpt ) < 180 ) {
			return true;
		}
		return false;
	}

	/**
	 * @param string $url
	 * @return string|false
	 */
	private static function fetch_html( $url ) {
		$response = wp_remote_get(
			$url,
			array(
				'timeout'     => 8,
				'redirection' => 2,
				'headers'     => array(
					'Accept' => 'text/html',
				),
				'user-agent'  => 'TalkerSiteRead/0.1.8; ' . talker_now_home_url(),
			)
		);
		if ( is_wp_error( $response ) ) {
			return false;
		}
		$code = (int) wp_remote_retrieve_response_code( $response );
		$html = (string) wp_remote_retrieve_body( $response );
		if ( $code < 200 || $code >= 400 || '' === trim( $html ) ) {
			return false;
		}
		return $html;
	}

	/**
	 * @param string $html
	 * @param string $home
	 * @return array<int, string>
	 */
	private static function extra_urls( $html, $home ) {
		if ( ! preg_match_all( '/href\s*=\s*["\']([^"\']+)["\']/i', $html, $matches ) ) {
			return array();
		}
		$home_parts = wp_parse_url( $home );
		$host       = isset( $home_parts['host'] ) ? strtolower( (string) $home_parts['host'] ) : '';
		$keys       = array( 'horaire', 'contact', 'service', 'prestation', 'rdv', 'rendez', 'tarif', 'equipe', 'about', 'propos', 'cabinet', 'soin', 'bien', 'visite' );
		$scored     = array();
		foreach ( $matches[1] as $href ) {
			$abs = self::absolutize( $href, $home );
			if ( '' === $abs ) {
				continue;
			}
			$parts = wp_parse_url( $abs );
			if ( ! is_array( $parts ) || empty( $parts['host'] ) || strtolower( (string) $parts['host'] ) !== $host ) {
				continue;
			}
			$path = strtolower( isset( $parts['path'] ) ? (string) $parts['path'] : '/' );
			if ( preg_match( '/\.(jpe?g|png|gif|webp|svg|pdf|zip|mp4|css|js)(\?|$)/', $path ) ) {
				continue;
			}
			$home_path = isset( $home_parts['path'] ) ? untrailingslashit( (string) $home_parts['path'] ) : '';
			$page_path = untrailingslashit( $path );
			if ( $page_path === $home_path || '/' === $page_path || '' === $page_path ) {
				continue;
			}
			$score = 0;
			foreach ( $keys as $key ) {
				if ( false !== strpos( $path, $key ) ) {
					$score++;
				}
			}
			if ( $score > 0 ) {
				$scored[ $abs ] = $score;
			}
		}
		arsort( $scored );
		return array_slice( array_keys( $scored ), 0, 3 );
	}

	/**
	 * @param string $href
	 * @param string $home
	 * @return string
	 */
	private static function absolutize( $href, $home ) {
		$href = trim( $href );
		if ( '' === $href || '#' === $href[0] || 0 === stripos( $href, 'mailto:' ) || 0 === stripos( $href, 'tel:' ) || 0 === stripos( $href, 'javascript:' ) ) {
			return '';
		}
		if ( preg_match( '#^https?://#i', $href ) ) {
			return $href;
		}
		$base = untrailingslashit( $home );
		if ( 0 === strpos( $href, '//' ) ) {
			$scheme = wp_parse_url( $home, PHP_URL_SCHEME );
			return ( $scheme ? $scheme : 'https' ) . ':' . $href;
		}
		if ( 0 === strpos( $href, '/' ) ) {
			$parts = wp_parse_url( $home );
			if ( ! is_array( $parts ) || empty( $parts['host'] ) ) {
				return '';
			}
			$scheme = isset( $parts['scheme'] ) ? $parts['scheme'] : 'https';
			return $scheme . '://' . $parts['host'] . $href;
		}
		return $base . '/' . ltrim( $href, '/' );
	}

	/**
	 * @param array<int, string> $blobs
	 * @return array<string, string>
	 */
	private static function merge_pages( $blobs ) {
		$title       = '';
		$description = '';
		$h1          = '';
		$excerpts    = array();
		$headings    = array();
		foreach ( $blobs as $html ) {
			$p = self::parse( $html );
			if ( '' === $title && '' !== $p['title'] ) {
				$title = $p['title'];
			}
			if ( '' === $description && '' !== $p['description'] ) {
				$description = $p['description'];
			}
			if ( '' === $h1 && '' !== $p['h1'] ) {
				$h1 = $p['h1'];
			}
			if ( '' !== $p['excerpt'] ) {
				$excerpts[] = $p['excerpt'];
			}
			if ( '' !== $p['headings'] ) {
				$headings[] = $p['headings'];
			}
		}
		$excerpt  = self::clip( implode( ' ', $excerpts ), 4000 );
		$heading  = self::clip( implode( ' · ', $headings ), 800 );
		$haystack = strtolower( $title . ' ' . $description . ' ' . $h1 . ' ' . $heading . ' ' . $excerpt );
		return array(
			'title'       => $title,
			'description' => $description,
			'h1'          => $h1,
			'excerpt'     => $excerpt,
			'headings'    => $heading,
			'haystack'    => $haystack,
		);
	}

	/**
	 * @param string $html
	 * @return array<string, string>
	 */
	public static function parse( $html ) {
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

		$headings = array();
		if ( preg_match_all( '/<h[2-3][^>]*>(.*?)<\/h[2-3]>/is', $html, $matches ) ) {
			foreach ( $matches[1] as $chunk ) {
				$label = self::plain( $chunk );
				if ( '' !== $label ) {
					$headings[] = $label;
				}
			}
		}

		$excerpt = self::plain( $html );
		if ( strlen( $excerpt ) > 2500 ) {
			$excerpt = substr( $excerpt, 0, 2500 );
		}

		$haystack = strtolower( $title . ' ' . $description . ' ' . $h1 . ' ' . implode( ' ', $headings ) . ' ' . $excerpt );

		return array(
			'title'       => $title,
			'description' => $description,
			'h1'          => $h1,
			'headings'    => implode( ' · ', array_slice( $headings, 0, 12 ) ),
			'excerpt'     => $excerpt,
			'haystack'    => $haystack,
		);
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return array<int, string>
	 */
	private static function questions_hours( $facts ) {
		$hours    = trim( (string) $facts['hours'] );
		$booking  = trim( (string) $facts['booking'] );
		$city     = trim( (string) $facts['city'] );
		$services = self::service_list( $facts );
		$out      = array();

		if ( '' !== $hours ) {
			$out[] = 'J’ai lu sur le site : « ' . $hours . ' ». Ce sont bien les horaires à donner aux visiteurs ?';
		} else {
			$out[] = 'Quels horaires je dois donner, y compris le jour de fermeture, sans rien inventer ?';
		}
		if ( '' !== $booking ) {
			$out[] = 'Les visites se préparent comment — j’ai vu « ' . $booking . ' ». C’est le bon canal ?';
		} else {
			$out[] = 'Billet, groupe, scolaire : on réserve comment, concrètement ?';
		}
		if ( '' !== $services ) {
			$out[] = 'J’ai vu « ' . $services . ' ». C’est encore d’actualité, et je le propose comment ?';
		} else {
			$out[] = 'Visite libre, guidée, expo temporaire : qu’est-ce que je peux citer sans me tromper de saison ?';
		}
		if ( '' !== $city ) {
			$out[] = 'L’accueil se fait bien à ' . $city . ' — accès, parking, entrée, je précise quoi ?';
		} else {
			$out[] = 'Adresse et accès : qu’est-ce qu’un visiteur se trompe souvent, pour que je le dise juste ?';
		}
		$out[] = 'Un visiteur demande un jour férié ou une nocturne : je dis quoi, concrètement ?';
		$out[] = 'Tarif, jauge, expo terminée : qu’est-ce que je ne dois jamais inventer ?';
		return $out;
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return array<int, string>
	 */
	private static function questions_trade( $facts ) {
		$hours    = trim( (string) $facts['hours'] );
		$booking  = trim( (string) $facts['booking'] );
		$contact  = trim( (string) $facts['contact'] );
		$city     = trim( (string) $facts['city'] );
		$services = self::service_list( $facts );
		$join     = $booking ? $booking : $contact;
		$out      = array();

		if ( '' !== $services ) {
			$out[] = 'J’ai vu « ' . $services . ' ». C’est bien ce que les gens appellent en premier — fuite, débouchage, panne ?';
		} else {
			$out[] = 'Dépannage du jour : fuite, débouchage, chauffage, autre — qu’est-ce qui sonne le plus ?';
		}
		if ( '' !== $city ) {
			$out[] = 'Vous vous déplacez bien sur ' . $city . ' — jusqu’où autour, sans que j’invente une zone ?';
		} else {
			$out[] = 'Zone d’intervention : quelles communes oui, quelles communes je dois refuser ?';
		}
		if ( '' !== $hours ) {
			$out[] = 'J’ai lu « ' . $hours . ' ». Urgence le soir ou le week-end : vous venez, ça dépend, ou je renvoie au lendemain ?';
		} else {
			$out[] = 'Le soir et le week-end : je dis que vous venez, que ça dépend, ou que ce n’est pas possible ?';
		}
		if ( '' !== $join ) {
			$out[] = 'Pour joindre, j’ai vu « ' . $join . ' ». Numéro d’urgence à part, ou c’est le bon réflexe ?';
		} else {
			$out[] = 'On vous joint comment pour un dépannage — téléphone, formulaire, SMS ?';
		}
		$out[] = 'Devis ou prix au téléphone : je m’arrête où ? Je ne dois jamais inventer un tarif.';
		$out[] = 'Quels dépannages vous ne faites pas, pour que je ne promette pas à votre place ?';
		$out[] = 'Délai, garantie, marque de pièce : qu’est-ce que le bot ne doit jamais dire ?';
		return $out;
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return array<int, string>
	 */
	private static function questions_realtor( $facts ) {
		$booking  = trim( (string) $facts['booking'] );
		$city     = trim( (string) $facts['city'] );
		$services = self::service_list( $facts );
		$out      = array();

		if ( '' !== $services ) {
			$out[] = 'Le site parle de « ' . $services . ' ». C’est bien votre quotidien — vente, location, gestion ?';
		} else {
			$out[] = 'Achat, location, estimation, gestion : par quoi commencent le plus souvent les messages ?';
		}
		if ( '' !== $city ) {
			$out[] = 'Vous travaillez bien ' . $city . ' — d’autres communes, ou je m’en tiens à ça ?';
		} else {
			$out[] = 'Quelles communes et quels types de biens je peux citer, sans prétendre couvrir tout le département ?';
		}
		if ( '' !== $booking ) {
			$out[] = 'Pour une visite, j’ai vu « ' . $booking . ' ». On prend rendez-vous comment, concrètement ?';
		} else {
			$out[] = 'Visite d’un bien : créneau en ligne, appel, ou passage à l’agence ?';
		}
		$out[] = 'Un visiteur demande si un bien est encore dispo ou son prix : je ne dois rien inventer — je fais quoi ?';
		$out[] = 'Estimation / avis de valeur : vous le faites, sur rendez-vous, ou je dois recadrer poliment ?';
		$out[] = 'Quels mandats ou types de biens je ne dois pas prétendre avoir ?';
		$out[] = 'Prix, dispo, « c’est vendu » : qu’est-ce que le bot ne doit jamais dire ?';
		return $out;
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return array<int, string>
	 */
	private static function questions_medical( $facts ) {
		$hours    = trim( (string) $facts['hours'] );
		$booking  = trim( (string) $facts['booking'] );
		$city     = trim( (string) $facts['city'] );
		$services = self::service_list( $facts );
		$label    = self::medical_label( $facts );
		$out      = array();

		if ( '' !== $services ) {
			$out[] = 'J’ai lu ' . $label . ' et « ' . $services . ' ». Les motifs d’appel les plus fréquents, c’est bien ça ?';
		} else {
			$out[] = 'Pour ' . $label . ' : les gens écrivent surtout pour un premier rendez-vous, un renouvellement, une urgence ?';
		}
		if ( '' !== $booking ) {
			$out[] = 'J’ai vu « ' . $booking . ' ». C’est bien comme ça qu’on prend rendez-vous — pas un autre canal ?';
		} else {
			$out[] = 'Rendez-vous : Doctolib, téléphone du secrétariat, ou les deux ?';
		}
		if ( '' !== $hours ) {
			$out[] = 'Horaires lus : « ' . $hours . ' ». Une douleur le soir : je dis rappel, pharmacie de garde, ou rien d’inventé ?';
		} else {
			$out[] = 'Horaires du cabinet et absences : que puis-je dire sans inventer une urgence médicale ?';
		}
		if ( '' !== $city ) {
			$out[] = 'Le cabinet est bien à ' . $city . ' — étage, interphone, parking à préciser ?';
		} else {
			$out[] = 'Comment on trouve le cabinet sans se tromper de porte ?';
		}
		$out[] = 'Ordonnance, certificat, diagnostic en message : je refuse, je prends un rendez-vous, autre chose ?';
		$out[] = 'Annulation ou retard : quelle règle je peux citer, sans en inventer une ?';
		$out[] = 'Avis médical, tarif non affiché, « venez tout de suite » : qu’est-ce que le bot ne doit jamais dire ?';
		return $out;
	}

	/**
	 * High-ticket / conseil. Not an EOR questionnaire.
	 *
	 * @param array<string, mixed> $facts
	 * @return array<int, string>
	 */
	private static function questions_spin( $facts ) {
		$activity = self::activity_label( $facts );
		$booking  = trim( (string) $facts['booking'] );
		$city     = trim( (string) $facts['city'] );
		$spoken   = trim( (string) $facts['spoken'] );
		$out      = array();

		if ( '' !== $activity ) {
			$out[] = 'J’ai parcouru l’accueil : « ' . $activity . ' ». C’est bien le sujet d’une première conversation ?';
		} elseif ( '' !== $spoken ) {
			$out[] = 'Vous avez dit « ' . self::clip( $spoken, 120 ) . ' ». C’est bien le cadre d’un premier échange ?';
		} else {
			$out[] = 'En une phrase, quel problème quelqu’un doit avoir pour que ce soit chez vous — pas un commerce de passage ?';
		}
		$out[] = 'Qui vous écrit surtout — dirigeant, RH, particulier — et après quel déclencheur ?';
		if ( '' !== $booking ) {
			$out[] = 'Un premier échange, c’est « ' . $booking . ' » ?';
		} else {
			$out[] = 'Premier échange : appel, formulaire, rendez-vous agenda — je oriente vers quoi ?';
		}
		if ( '' !== $city ) {
			$out[] = 'Vous opérez depuis ' . $city . ' — France entière, ou un périmètre plus serré ?';
		} else {
			$out[] = 'Périmètre : local, France, international — que puis-je dire sans gonfler ?';
		}
		$out[] = 'Qu’est-ce qu’il faut que je clarifie avant de proposer un rendez-vous (périmètre, délai, qui décide) ?';
		$out[] = 'Quelles demandes je dois écarter poliment, parce que ce n’est pas chez vous ?';
		$out[] = 'Prix, engagement de résultat, « on s’occupe de tout » : qu’est-ce que le bot ne doit jamais dire ?';
		return $out;
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	private static function medical_label( $facts ) {
		$h = self::norm( (string) $facts['haystack'] . ' ' . (string) $facts['activity'] );
		$map = array(
			'un cabinet dentaire'     => array( 'dentiste', 'dentaire', 'orthodont' ),
			'un cabinet d’ostéopathie' => array( 'osteo', 'ostéo', 'osteopathe' ),
			'un cabinet de kinésithérapie' => array( 'kine', 'kiné', 'kinesither' ),
			'un cabinet médical'      => array( 'medecin', 'médecin', 'docteur', 'generaliste', 'généraliste' ),
			'un cabinet vétérinaire'  => array( 'veterinaire', 'vétérinaire' ),
			'un cabinet de psychologie' => array( 'psychologue', 'psychotherapie', 'psychothérapie' ),
		);
		foreach ( $map as $label => $needles ) {
			foreach ( $needles as $needle ) {
				if ( false !== strpos( $h, self::norm( $needle ) ) ) {
					return $label;
				}
			}
		}
		$activity = self::activity_label( $facts );
		if ( '' !== $activity ) {
			return $activity;
		}
		return 'un cabinet de santé';
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	private static function trade_label( $facts ) {
		$h = self::norm( (string) $facts['haystack'] . ' ' . (string) $facts['activity'] . ' ' . (string) $facts['spoken'] );
		$map = array(
			'plombier'      => array( 'plombier', 'plomberie', 'debouchage', 'débouchage' ),
			'électricien'   => array( 'electricien', 'électricien' ),
			'chauffagiste'  => array( 'chauffagiste', 'chauffage' ),
			'serrurier'     => array( 'serrurier' ),
			'couvreur'      => array( 'couvreur', 'toiture' ),
			'macon'         => array( 'macon', 'maçon' ),
		);
		foreach ( $map as $label => $needles ) {
			foreach ( $needles as $needle ) {
				if ( false !== strpos( $h, self::norm( $needle ) ) ) {
					return $label;
				}
			}
		}
		$activity = self::activity_label( $facts );
		if ( '' !== $activity ) {
			return $activity;
		}
		return 'un artisan du bâtiment';
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	private static function activity_label( $facts ) {
		foreach ( array( 'activity', 'h1', 'title' ) as $key ) {
			$v = trim( (string) $facts[ $key ] );
			if ( '' !== $v ) {
				return self::clip( $v, 80 );
			}
		}
		return '';
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	private static function service_list( $facts ) {
		return self::clip( trim( (string) $facts['services'] ), 120 );
	}

	/**
	 * @param array<string, string> $parsed
	 * @param string                $haystack
	 * @return string
	 */
	private static function find_services( $parsed, $haystack ) {
		$found = array();
		if ( ! empty( $parsed['headings'] ) ) {
			foreach ( explode( ' · ', (string) $parsed['headings'] ) as $heading ) {
				$heading = trim( $heading );
				if ( self::looks_like_service( $heading ) ) {
					$found[] = $heading;
				}
			}
		}

		$catalog = array(
			'implants', 'détartrage', 'orthodontie', 'blanchiment', 'urgence dentaire',
			'débouchage', 'dépannage', 'fuite', 'chauffe-eau',
			'vente', 'location', 'estimation', 'gestion locative',
			'visite guidée', 'exposition', 'billetterie', 'audioguide',
			'consultation', 'ostéopathie', 'kinésithérapie', 'bilan',
		);
		$normalized = self::norm( $haystack );
		foreach ( $catalog as $word ) {
			if ( false !== strpos( $normalized, self::norm( $word ) ) ) {
				$found[] = $word;
			}
		}

		$found = array_values( array_unique( array_filter( $found ) ) );
		return self::clip( implode( ', ', array_slice( $found, 0, 6 ) ), 140 );
	}

	/**
	 * @param string $heading
	 * @return bool
	 */
	private static function looks_like_service( $heading ) {
		$n = self::norm( $heading );
		if ( strlen( $n ) < 4 || strlen( $n ) > 48 ) {
			return false;
		}
		$skip = array( 'accueil', 'contact', 'mentions', 'blog', 'actualites', 'actualités', 'accueil' );
		foreach ( $skip as $bad ) {
			if ( $n === self::norm( $bad ) ) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @param string $text
	 * @return string
	 */
	private static function find_hours( $text ) {
		if ( preg_match( '/((?:lun|mar|mer|jeu|ven|sam|dim)[a-z.]*\s*(?:au|à|-|–)\s*(?:lun|mar|mer|jeu|ven|sam|dim)[a-z.]*[^.]{0,40}\d{1,2}\s*h(?:\d{2})?\s*(?:-|–|à)\s*\d{1,2}\s*h(?:\d{2})?)/iu', $text, $m ) ) {
			return self::clip( self::plain( $m[1] ), 80 );
		}
		if ( preg_match( '/(\d{1,2}\s*h(?:\d{2})?\s*(?:-|–|à)\s*\d{1,2}\s*h(?:\d{2})?)/iu', $text, $m ) ) {
			return self::clip( self::plain( $m[1] ), 40 );
		}
		if ( preg_match( '/(ouvert[^.]{0,60})/iu', $text, $m ) ) {
			return self::clip( self::plain( $m[1] ), 80 );
		}
		return '';
	}

	/**
	 * @param string $haystack
	 * @return string
	 */
	private static function find_booking( $haystack ) {
		$map = array(
			'Doctolib'          => array( 'doctolib' ),
			'réservation en ligne' => array( 'reserv', 'réserv', 'billetterie' ),
			'rendez-vous'       => array( 'rendez-vous', 'rendez vous', 'prendre rdv', 'prise de rendez' ),
			'téléphone'         => array( 'appelez', 'appele', 'par telephone', 'par téléphone' ),
			'formulaire'        => array( 'formulaire', 'nous ecrire', 'nous écrire' ),
		);
		foreach ( $map as $label => $needles ) {
			foreach ( $needles as $needle ) {
				if ( false !== strpos( $haystack, $needle ) ) {
					return $label;
				}
			}
		}
		return '';
	}

	/**
	 * @param string $text
	 * @return string
	 */
	private static function find_contact( $text ) {
		$bits = array();
		if ( preg_match( '/0\d(?:[\s.]?\d{2}){4}/', $text, $m ) ) {
			$bits[] = self::plain( $m[0] );
		}
		if ( preg_match( '/[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/i', $text, $m ) ) {
			$bits[] = strtolower( $m[0] );
		}
		return implode( ' · ', $bits );
	}

	/**
	 * @param string $text
	 * @return string
	 */
	public static function find_city( $text ) {
		if ( preg_match( '/\b(\d{5})\s+([A-ZÉÈÊÀÂÎÏÔÛÙÇ][a-zàâäéèêëïîôùûüç\'’ -]{2,30})\b/u', $text, $m ) ) {
			return trim( $m[2] );
		}

		$cities = array(
			'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg',
			'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Saint-Étienne', 'Toulon', 'Le Havre', 'Grenoble',
			'Dijon', 'Angers', 'Villeurbanne', 'Nîmes', 'Clermont-Ferrand', 'Aix-en-Provence', 'Brest',
			'Tours', 'Amiens', 'Limoges', 'Annecy', 'Perpignan', 'Boulogne-Billancourt', 'Metz', 'Besançon',
			'Orléans', 'Rouen', 'Mulhouse', 'Caen', 'Nancy', 'Argenteuil', 'Montreuil', 'Roubaix', 'Tourcoing',
			'Avignon', 'Poitiers', 'Versailles', 'Pau', 'La Rochelle', 'Calais', 'Colmar', 'Bayonne',
		);
		foreach ( $cities as $city ) {
			if ( preg_match( '/\b' . preg_quote( $city, '/' ) . '\b/u', $text ) ) {
				return $city;
			}
		}

		if ( preg_match( '/\b(?:à|au|aux)\s+([A-ZÉÈÊÀÂÎÏÔÛÙÇ][a-zàâäéèêëïîôùûüç\'’-]{2,30})\b/u', $text, $m ) ) {
			$guess = trim( $m[1] );
			$skip  = array( 'Votre', 'Propos', 'Jour', 'Partir', 'Disposition', 'Lire', 'Bientôt', 'Tout', 'Tous' );
			if ( ! in_array( $guess, $skip, true ) ) {
				return $guess;
			}
		}
		return '';
	}

	/**
	 * @param string $value
	 * @return string
	 */
	public static function plain( $value ) {
		$value = wp_strip_all_tags( (string) $value );
		$value = html_entity_decode( $value, ENT_QUOTES, 'UTF-8' );
		$value = preg_replace( '/\s+/u', ' ', $value );
		return trim( (string) $value );
	}

	/**
	 * @param string $value
	 * @return string
	 */
	private static function norm( $value ) {
		$value = strtolower( self::plain( $value ) );
		$map   = array(
			'à' => 'a', 'â' => 'a', 'ä' => 'a', 'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e',
			'ï' => 'i', 'î' => 'i', 'ô' => 'o', 'ù' => 'u', 'û' => 'u', 'ü' => 'u', 'ç' => 'c',
			'’' => "'",
		);
		$value = strtr( $value, $map );
		$value = preg_replace( "/[^a-z0-9' ]+/", ' ', $value );
		$value = preg_replace( '/\s+/', ' ', (string) $value );
		return trim( (string) $value );
	}

	/**
	 * @param string $value
	 * @param int    $max
	 * @return string
	 */
	private static function clip( $value, $max ) {
		$value = trim( (string) $value );
		if ( strlen( $value ) <= $max ) {
			return $value;
		}
		$cut = substr( $value, 0, $max );
		$sp  = strrpos( $cut, ' ' );
		if ( false !== $sp && $sp > 20 ) {
			$cut = substr( $cut, 0, $sp );
		}
		return rtrim( $cut, ' ,;') . '…';
	}
}
