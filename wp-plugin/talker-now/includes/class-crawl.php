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

if ( ! function_exists( 'talker_now_i18n' ) ) {
	require_once dirname( __FILE__ ) . '/class-i18n.php';
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
			'voice'             => 'self',
			'gerant_name'       => '',
			'gerant_email'      => '',
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
		if ( ! is_array( $crawl['facts']['people'] ) ) {
			$crawl['facts']['people'] = array();
		}
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
			if ( in_array( $data['phase'], array( 'confirm', 'reclass', 'frame', 'proxy', 'questions' ), true ) ) {
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
			case 'proxy':
				$crawl = self::on_proxy( $crawl, $message );
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
					'reply'    => talker_now_i18n( 'qcm.noted_changed' ),
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
		$facts = isset( $crawl['facts'] ) && is_array( $crawl['facts'] ) ? $crawl['facts'] : self::empty_facts();
		if ( ! empty( $crawl['thin'] ) || '' === (string) $crawl['family'] ) {
			$framing = self::framing_questions( $facts );
			return $framing[0];
		}
		return self::confirm_question( (string) $crawl['family'], $facts );
	}

	/**
	 * Identity first — crawled names, never the WP account.
	 *
	 * @param string               $family
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	public static function confirm_question( $family, $facts ) {
		$people  = self::people_list( $facts );
		$city    = trim( (string) $facts['city'] );
		$where   = '' !== $city ? talker_now_i18n( 'qcm.city_prefix', array( $city ) ) : '';
		$societe = self::societe_label( $facts );
		$metier  = self::metier_short( $family, $facts );
		$escape  = talker_now_i18n( 'qcm.escape' );

		if ( 1 === count( $people ) ) {
			$who = $people[0];
			$job = '' !== $metier ? ', ' . $metier : '';
			return talker_now_i18n( 'qcm.confirm_one', array( $who, $job, $where ) ) . $escape;
		}
		if ( count( $people ) >= 2 ) {
			$shown = array_slice( $people, 0, 3 );
			$last  = array_pop( $shown );
			$list  = implode( ', ', $shown );
			if ( '' !== $list ) {
				$list .= talker_now_i18n( 'qcm.and' ) . $last;
			} else {
				$list = $last;
			}
			return talker_now_i18n( 'qcm.confirm_many', array( $list ) ) . $escape;
		}

		$org = '' !== $societe ? $societe : ( '' !== $metier ? $metier : talker_now_i18n( 'qcm.this_activity' ) );
		return talker_now_i18n( 'qcm.confirm_org', array( $org, $where ) );
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return array<int, string>
	 */
	public static function framing_questions( $facts = array() ) {
		$facts   = array_merge( self::empty_facts(), is_array( $facts ) ? $facts : array() );
		$societe = self::societe_label( $facts );
		$city    = trim( (string) $facts['city'] );
		$where   = '' !== $city ? talker_now_i18n( 'qcm.city_prefix', array( $city ) ) : '';
		$org     = '' !== $societe ? $societe : talker_now_i18n( 'qcm.this_activity' );
		return array(
			talker_now_i18n( 'qcm.frame_1', array( $org, $where ) ),
			talker_now_i18n( 'qcm.frame_2' ),
			talker_now_i18n( 'qcm.frame_3' ),
		);
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
				$pool = self::framing_questions( $facts );
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
		if ( 'proxy' === (string) $facts['voice'] ) {
			$rewritten = array();
			foreach ( $pool as $q ) {
				$rewritten[] = self::in_proxy_voice( $q, $facts );
			}
			$pool = $rewritten;
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
	 * @return array<string, mixed>
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
			'people'    => array(),
			'societe'   => '',
			'voice'     => 'self',
			'gerant_name'  => '',
			'gerant_email' => '',
		);
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @return array<string, mixed>
	 */
	private static function begin_qcm( $crawl ) {
		if ( ! empty( $crawl['thin'] ) || '' === (string) $crawl['family'] ) {
			$crawl['phase']            = 'frame';
			$crawl['questions']        = self::framing_questions( isset( $crawl['facts'] ) ? $crawl['facts'] : array() );
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
				$intro = talker_now_i18n( 'qcm.intro_thin' );
			} elseif ( 'done' === $phase ) {
				$intro = talker_now_i18n( 'qcm.intro_short' );
				$question = talker_now_i18n( 'qcm.already_framed' );
			} else {
				$intro = talker_now_i18n( 'qcm.intro_ready' );
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
		if ( 'proxy' === $phase && '' === $question ) {
			$question = self::proxy_question( $crawl );
		}
		if ( 'done' === $phase && '' === $question ) {
			if ( 'proxy' === (string) $crawl['voice'] ) {
				$who      = trim( (string) $crawl['gerant_name'] );
				$who      = '' !== $who ? $who : talker_now_i18n( 'qcm.the_manager' );
				$question = talker_now_i18n( 'qcm.noted_proxy', array( $who ) );
			} else {
				$question = talker_now_i18n( 'qcm.noted_self' );
			}
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

		if ( self::is_technician( $message ) ) {
			return self::begin_proxy( $crawl, $message );
		}

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
		$crawl['questions']        = self::questions_for( (string) $crawl['family'], self::voice_facts( $crawl ), $message );
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
		if ( self::is_technician( $message ) ) {
			$crawl['answers'][] = array(
				'phase' => 'reclass',
				'text'  => $message,
			);
			return self::begin_proxy( $crawl, $message );
		}
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
			$crawl['questions']    = self::framing_questions( isset( $crawl['facts'] ) ? $crawl['facts'] : array() );
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
		if ( 0 === (int) $crawl['q_index'] && self::is_technician( $message ) ) {
			$crawl['answers'][] = array(
				'phase' => 'frame',
				'index' => 0,
				'text'  => $message,
			);
			return self::begin_proxy( $crawl, $message );
		}
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

		$facts           = self::voice_facts( $crawl );
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
		$crawl['questions']        = self::questions_for( $family, self::voice_facts( $crawl ), $message );
		$crawl['q_index']          = 0;
		$crawl['phase']            = 'questions';
		$crawl['qcm_question']     = isset( $crawl['questions'][0] ) ? $crawl['questions'][0] : '';
		return $crawl;
	}

	/**
	 * Technician path: identify the real gérant, never write in the installer voice.
	 *
	 * @param array<string, mixed> $crawl
	 * @param string               $message
	 * @return array<string, mixed>
	 */
	private static function begin_proxy( $crawl, $message ) {
		unset( $message );
		$crawl['voice']             = 'proxy';
		$crawl['facts']['voice']    = 'proxy';
		$crawl['proxy_from']        = (string) $crawl['phase'];
		$crawl['phase']             = 'proxy';
		$crawl['qcm_question']      = self::proxy_question( $crawl );
		return $crawl;
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @param string               $message
	 * @return array<string, mixed>
	 */
	private static function on_proxy( $crawl, $message ) {
		$parsed                     = self::parse_gerant( $message );
		$crawl['gerant_name']       = $parsed['name'];
		$crawl['gerant_email']      = $parsed['email'];
		$crawl['facts']['gerant_name']  = $parsed['name'];
		$crawl['facts']['gerant_email'] = $parsed['email'];
		$crawl['facts']['voice']        = 'proxy';
		$crawl['voice']                 = 'proxy';
		$crawl['answers'][]             = array(
			'phase' => 'proxy',
			'text'  => $message,
		);

		$from = isset( $crawl['proxy_from'] ) ? (string) $crawl['proxy_from'] : 'confirm';
		if ( 'frame' === $from || ! empty( $crawl['thin'] ) || '' === (string) $crawl['family'] ) {
			$qs                    = self::framing_questions( $crawl['facts'] );
			$crawl['questions']    = array(
				$qs[0],
				self::in_proxy_voice( $qs[1], $crawl['facts'] ),
				self::in_proxy_voice( $qs[2], $crawl['facts'] ),
			);
			$crawl['phase']        = 'frame';
			$crawl['q_index']      = 1;
			$crawl['qcm_question'] = $crawl['questions'][1];
			return $crawl;
		}

		$crawl['family_confirmed'] = true;
		$crawl['questions']        = self::questions_for( (string) $crawl['family'], self::voice_facts( $crawl ), $message );
		$crawl['q_index']          = 0;
		$crawl['phase']            = 'questions';
		$crawl['qcm_question']     = isset( $crawl['questions'][0] ) ? $crawl['questions'][0] : '';
		return $crawl;
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @return string
	 */
	private static function proxy_question( $crawl ) {
		unset( $crawl );
		return talker_now_i18n( 'qcm.proxy_who' );
	}

	/**
	 * @return string
	 */
	private static function reclass_question() {
		return talker_now_i18n( 'qcm.reclass' );
	}

	/**
	 * @param string $text
	 * @return bool
	 */
	public static function is_technician( $text ) {
		$n = self::norm( $text );
		$n = str_replace( array( "'", "’" ), ' ', $n );
		$n = trim( (string) preg_replace( '/\s+/', ' ', $n ) );
		if ( '' === $n ) {
			return false;
		}
		$needles = array(
			'j installe pour',
			'jinstalle pour',
			'installe pour quelqu',
			'pose le plugin',
			'poser le plugin',
			'vous posez le plugin',
			'pour quelqu un d autre',
			'pour quelquun d autre',
			'prestataire',
			'webmaster',
			'agence web',
			'technicien',
			'pas le gerant',
			'pas le dirigeant',
			'pour le client',
			'je pose pour',
			'i m installing for',
			'im installing for',
			'installing for someone',
			'ich installiere fur',
			'installo per qualcun',
			'instalo para otra',
			'ik installeer voor',
			'instaluje dla kogos',
			'instaluję dla kogoś',
		);
		foreach ( $needles as $needle ) {
			if ( false !== strpos( $n, $needle ) ) {
				return true;
			}
		}
		if ( preg_match( '/\b(pour eux|pas moi)\b/', $n ) && ! preg_match( '/\bje (parle|suis|tiens|fais)\b/', $n ) ) {
			return true;
		}
		return false;
	}

	/**
	 * @param string $text
	 * @return array{name:string,email:string}
	 */
	public static function parse_gerant( $text ) {
		$email = '';
		if ( preg_match( '/[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/i', $text, $m ) ) {
			$email = strtolower( $m[0] );
		}
		$name = trim( (string) preg_replace( '/' . preg_quote( $email, '/' ) . '/', '', $text ) );
		$name = self::plain( $name );
		$name = preg_replace( '/^(le\s+)?g[ée]rant\s+(est\s+)?/iu', '', (string) $name );
		$name = trim( (string) $name, " \t,;:-" );
		if ( strlen( $name ) > 80 ) {
			$name = self::clip( $name, 80 );
		}
		return array(
			'name'  => $name,
			'email' => $email,
		);
	}

	/**
	 * @param array<string, mixed> $crawl
	 * @return array<string, mixed>
	 */
	private static function voice_facts( $crawl ) {
		$facts = isset( $crawl['facts'] ) && is_array( $crawl['facts'] ) ? $crawl['facts'] : self::empty_facts();
		$facts = array_merge( self::empty_facts(), $facts );
		$facts['voice']        = isset( $crawl['voice'] ) ? (string) $crawl['voice'] : (string) $facts['voice'];
		$facts['gerant_name']  = isset( $crawl['gerant_name'] ) ? (string) $crawl['gerant_name'] : (string) $facts['gerant_name'];
		$facts['gerant_email'] = isset( $crawl['gerant_email'] ) ? (string) $crawl['gerant_email'] : (string) $facts['gerant_email'];
		return $facts;
	}

	/**
	 * Rewrite a client QCM line so it is not in the technician's mouth.
	 *
	 * @param string               $question
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	public static function in_proxy_voice( $question, $facts ) {
		$who = trim( (string) $facts['gerant_name'] );
		if ( '' === $who ) {
			$who = self::societe_label( $facts );
		}
		if ( '' === $who ) {
			$who = talker_now_i18n( 'qcm.their_activity' );
		}
		$q = (string) $question;
		$q = preg_replace( '/\b[Vv]ous êtes\b/u', $who . ' est', $q );
		$q = preg_replace( '/\b[Vv]ous tenez\b/u', $who . ' tient', $q );
		$q = preg_replace( '/\b[Vv]ous faites\b/u', $who . ' fait', $q );
		$q = preg_replace( '/\b[Vv]ous vous déplacez\b/u', 'On se déplace', $q );
		$q = preg_replace( '/\b[Vv]ous travaillez\b/u', 'On travaille', $q );
		$q = preg_replace( '/\b[Vv]ous opérez\b/u', 'On opère', $q );
		$q = preg_replace( '/\bà votre place\b/u', 'à leur place', $q );
		$q = preg_replace( '/\bqui vous écrit\b/u', 'qui leur écrit', $q );
		$q = preg_replace( '/\b[Vv]ous\b/u', 'on', $q );
		$q = preg_replace( '/\bvotre\b/u', 'leur', $q );
		$q = preg_replace( '/\bvos\b/u', 'leurs', $q );
		return $q;
	}

	/**
	 * Crawled people only. WP display name may reorder, never invent.
	 *
	 * @param array<string, mixed> $facts
	 * @return array<int, string>
	 */
	public static function people_list( $facts ) {
		$people = array();
		if ( isset( $facts['people'] ) && is_array( $facts['people'] ) ) {
			foreach ( $facts['people'] as $name ) {
				$name = trim( (string) $name );
				if ( '' !== $name ) {
					$people[] = $name;
				}
			}
		}
		return array_slice( self::rank_people_by_hint( $people ), 0, 3 );
	}

	/**
	 * @param array<int, string> $people
	 * @return array<int, string>
	 */
	public static function rank_people_by_hint( $people ) {
		$hint = self::wp_identity_hint();
		$hn   = self::norm( $hint['name'] );
		if ( '' === $hn || empty( $people ) ) {
			return array_values( $people );
		}
		$matched = null;
		$rest    = array();
		foreach ( $people as $name ) {
			if ( null === $matched && self::norm( $name ) === $hn ) {
				$matched = $name;
			} else {
				$rest[] = $name;
			}
		}
		if ( null !== $matched ) {
			array_unshift( $rest, $matched );
			return $rest;
		}
		return array_values( $people );
	}

	/**
	 * Weak hint only. Never treat as the gérant identity.
	 *
	 * @return array{name:string,email:string}
	 */
	public static function wp_identity_hint() {
		$hint = array(
			'name'  => '',
			'email' => '',
		);
		if ( ! function_exists( 'is_user_logged_in' ) || ! is_user_logged_in() ) {
			return $hint;
		}
		if ( ! function_exists( 'wp_get_current_user' ) ) {
			return $hint;
		}
		$user = wp_get_current_user();
		if ( is_object( $user ) ) {
			$hint['name']  = isset( $user->display_name ) ? trim( (string) $user->display_name ) : '';
			$hint['email'] = isset( $user->user_email ) ? trim( (string) $user->user_email ) : '';
		}
		return $hint;
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	public static function societe_label( $facts ) {
		foreach ( array( 'societe', 'h1', 'title', 'activity' ) as $key ) {
			$v = trim( (string) $facts[ $key ] );
			if ( '' !== $v ) {
				return self::clip( $v, 80 );
			}
		}
		return '';
	}

	/**
	 * @param string               $family
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	public static function metier_short( $family, $facts ) {
		switch ( $family ) {
			case 'medical':
				$label = self::medical_label( $facts );
				$map   = array(
					talker_now_i18n( 'label.dental' )  => talker_now_i18n( 'job.dentist' ),
					talker_now_i18n( 'label.osteo' )   => talker_now_i18n( 'job.osteo' ),
					talker_now_i18n( 'label.physio' )  => talker_now_i18n( 'job.physio' ),
					talker_now_i18n( 'label.medical' ) => talker_now_i18n( 'job.doctor' ),
					talker_now_i18n( 'label.vet' )     => talker_now_i18n( 'job.vet' ),
					talker_now_i18n( 'label.psych' )   => talker_now_i18n( 'job.psych' ),
					talker_now_i18n( 'label.health' )  => talker_now_i18n( 'job.practitioner' ),
				);
				return isset( $map[ $label ] ) ? $map[ $label ] : $label;
			case 'trade':
				return self::trade_label( $facts );
			case 'realtor':
				return talker_now_i18n( 'job.realtor' );
			case 'hours':
				$act = self::activity_label( $facts );
				return '' !== $act ? $act : talker_now_i18n( 'job.public_place' );
			case 'spin':
				$act = self::activity_label( $facts );
				return '' !== $act ? $act : talker_now_i18n( 'job.advice' );
			default:
				return self::activity_label( $facts );
		}
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
		if ( preg_match( '/^(non|nan|nope|faux|incorrect|nein|nee|nie|no)\b|pas du tout|pas vraiment|vous vous trompez|ce n est pas|c est pas ca|c est pas|nicht wahr|nicht stimmt|no es|non e|het klopt niet/', $n ) ) {
			return 'no';
		}
		if ( preg_match( '/\b(oui|ouais|yep|yes|ja|si|sí|tak|exactement|exact|correct|voila|tout a fait|c est ca|cest ca|c est bien ca|bien sur|tout juste|genau|richtig|esatto|exacto|klopt|zgadza)\b/', $n ) ) {
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
		$facts['societe']     = self::clip( $h1 ? $h1 : $title, 80 );
		$facts['people']      = self::find_people( $parsed );
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
				'user-agent'  => 'TalkerSiteRead/0.1.9; ' . talker_now_home_url(),
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
		$keys       = array( 'horaire', 'contact', 'service', 'prestation', 'rdv', 'rendez', 'tarif', 'equipe', 'about', 'propos', 'cabinet', 'soin', 'bien', 'visite', 'team', 'staff', 'fondateur' );
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
					if ( in_array( $key, array( 'equipe', 'about', 'propos', 'team', 'staff' ), true ) ) {
						$score += 2;
					}
				}
			}
			if ( $score > 0 ) {
				$scored[ $abs ] = $score;
			}
		}
		arsort( $scored );
		return array_slice( array_keys( $scored ), 0, 4 );
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
		$footers     = array();
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
			if ( ! empty( $p['footer'] ) ) {
				$footers[] = $p['footer'];
			}
		}
		$excerpt  = self::clip( implode( ' ', $excerpts ), 4000 );
		$heading  = self::clip( implode( ' · ', $headings ), 800 );
		$footer   = self::clip( implode( ' ', $footers ), 800 );
		$haystack = strtolower( $title . ' ' . $description . ' ' . $h1 . ' ' . $heading . ' ' . $excerpt . ' ' . $footer );
		return array(
			'title'       => $title,
			'description' => $description,
			'h1'          => $h1,
			'excerpt'     => $excerpt,
			'headings'    => $heading,
			'footer'      => $footer,
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

		$footer = '';
		if ( preg_match( '/<footer\b[^>]*>(.*?)<\/footer>/is', $html, $match ) ) {
			$footer = self::plain( $match[1] );
		}

		$haystack = strtolower( $title . ' ' . $description . ' ' . $h1 . ' ' . implode( ' ', $headings ) . ' ' . $excerpt . ' ' . $footer );

		return array(
			'title'       => $title,
			'description' => $description,
			'h1'          => $h1,
			'headings'    => implode( ' · ', array_slice( $headings, 0, 12 ) ),
			'excerpt'     => $excerpt,
			'footer'      => $footer,
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
			$out[] = talker_now_i18n( 'q.hours_read', array( $hours ) );
		} else {
			$out[] = talker_now_i18n( 'q.hours_ask' );
		}
		if ( '' !== $booking ) {
			$out[] = talker_now_i18n( 'q.hours_booking_read', array( $booking ) );
		} else {
			$out[] = talker_now_i18n( 'q.hours_booking_ask' );
		}
		if ( '' !== $services ) {
			$out[] = talker_now_i18n( 'q.hours_svc_read', array( $services ) );
		} else {
			$out[] = talker_now_i18n( 'q.hours_svc_ask' );
		}
		if ( '' !== $city ) {
			$out[] = talker_now_i18n( 'q.hours_city_read', array( $city ) );
		} else {
			$out[] = talker_now_i18n( 'q.hours_city_ask' );
		}
		$out[] = talker_now_i18n( 'q.hours_holiday' );
		$out[] = talker_now_i18n( 'q.hours_never' );
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
			$out[] = talker_now_i18n( 'q.trade_svc_read', array( $services ) );
		} else {
			$out[] = talker_now_i18n( 'q.trade_svc_ask' );
		}
		if ( '' !== $city ) {
			$out[] = talker_now_i18n( 'q.trade_city_read', array( $city ) );
		} else {
			$out[] = talker_now_i18n( 'q.trade_city_ask' );
		}
		if ( '' !== $hours ) {
			$out[] = talker_now_i18n( 'q.trade_hours_read', array( $hours ) );
		} else {
			$out[] = talker_now_i18n( 'q.trade_hours_ask' );
		}
		if ( '' !== $join ) {
			$out[] = talker_now_i18n( 'q.trade_join_read', array( $join ) );
		} else {
			$out[] = talker_now_i18n( 'q.trade_join_ask' );
		}
		$out[] = talker_now_i18n( 'q.trade_price' );
		$out[] = talker_now_i18n( 'q.trade_refuse' );
		$out[] = talker_now_i18n( 'q.trade_never' );
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
			$out[] = talker_now_i18n( 'q.re_svc_read', array( $services ) );
		} else {
			$out[] = talker_now_i18n( 'q.re_svc_ask' );
		}
		if ( '' !== $city ) {
			$out[] = talker_now_i18n( 'q.re_city_read', array( $city ) );
		} else {
			$out[] = talker_now_i18n( 'q.re_city_ask' );
		}
		if ( '' !== $booking ) {
			$out[] = talker_now_i18n( 'q.re_book_read', array( $booking ) );
		} else {
			$out[] = talker_now_i18n( 'q.re_book_ask' );
		}
		$out[] = talker_now_i18n( 'q.re_avail' );
		$out[] = talker_now_i18n( 'q.re_estimate' );
		$out[] = talker_now_i18n( 'q.re_mandate' );
		$out[] = talker_now_i18n( 'q.re_never' );
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
			$out[] = talker_now_i18n( 'q.med_svc_read', array( $label, $services ) );
		} else {
			$out[] = talker_now_i18n( 'q.med_svc_ask', array( $label ) );
		}
		if ( '' !== $booking ) {
			$out[] = talker_now_i18n( 'q.med_book_read', array( $booking ) );
		} else {
			$out[] = talker_now_i18n( 'q.med_book_ask' );
		}
		if ( '' !== $hours ) {
			$out[] = talker_now_i18n( 'q.med_hours_read', array( $hours ) );
		} else {
			$out[] = talker_now_i18n( 'q.med_hours_ask' );
		}
		if ( '' !== $city ) {
			$out[] = talker_now_i18n( 'q.med_city_read', array( $city ) );
		} else {
			$out[] = talker_now_i18n( 'q.med_city_ask' );
		}
		$out[] = talker_now_i18n( 'q.med_rx' );
		$out[] = talker_now_i18n( 'q.med_cancel' );
		$out[] = talker_now_i18n( 'q.med_never' );
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
			$out[] = talker_now_i18n( 'q.spin_act_read', array( $activity ) );
		} elseif ( '' !== $spoken ) {
			$out[] = talker_now_i18n( 'q.spin_spoken', array( self::clip( $spoken, 120 ) ) );
		} else {
			$out[] = talker_now_i18n( 'q.spin_act_ask' );
		}
		$out[] = talker_now_i18n( 'q.spin_who' );
		if ( '' !== $booking ) {
			$out[] = talker_now_i18n( 'q.spin_book_read', array( $booking ) );
		} else {
			$out[] = talker_now_i18n( 'q.spin_book_ask' );
		}
		if ( '' !== $city ) {
			$out[] = talker_now_i18n( 'q.spin_city_read', array( $city ) );
		} else {
			$out[] = talker_now_i18n( 'q.spin_city_ask' );
		}
		$out[] = talker_now_i18n( 'q.spin_clarify' );
		$out[] = talker_now_i18n( 'q.spin_refuse' );
		$out[] = talker_now_i18n( 'q.spin_never' );
		return $out;
	}

	/**
	 * @param array<string, mixed> $facts
	 * @return string
	 */
	private static function medical_label( $facts ) {
		$h = self::norm( (string) $facts['haystack'] . ' ' . (string) $facts['activity'] );
		$map = array(
			talker_now_i18n( 'label.dental' )  => array( 'dentiste', 'dentaire', 'orthodont' ),
			talker_now_i18n( 'label.osteo' )   => array( 'osteo', 'ostéo', 'osteopathe' ),
			talker_now_i18n( 'label.physio' )  => array( 'kine', 'kiné', 'kinesither' ),
			talker_now_i18n( 'label.medical' ) => array( 'medecin', 'médecin', 'docteur', 'generaliste', 'généraliste' ),
			talker_now_i18n( 'label.vet' )     => array( 'veterinaire', 'vétérinaire' ),
			talker_now_i18n( 'label.psych' )   => array( 'psychologue', 'psychotherapie', 'psychothérapie' ),
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
		return talker_now_i18n( 'label.health' );
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
		return talker_now_i18n( 'job.trade' );
	}

	/**
	 * Names from À propos / équipe / footer. Never WP display_name or admin_email.
	 *
	 * @param array<string, string> $parsed
	 * @return array<int, string>
	 */
	public static function find_people( $parsed ) {
		$chunks = array(
			isset( $parsed['footer'] ) ? (string) $parsed['footer'] : '',
			isset( $parsed['headings'] ) ? (string) $parsed['headings'] : '',
			isset( $parsed['excerpt'] ) ? (string) $parsed['excerpt'] : '',
			isset( $parsed['description'] ) ? (string) $parsed['description'] : '',
		);
		$text = implode( ' · ', $chunks );
		$found = array();

		if ( preg_match_all( '/(?:Dr|Dre|Dr\.|Docteur|Pr|Pr\.|Me|Ma[îi]tre)\s+([A-ZÉÈÊÀÂÎÏÔÛÙÇ][a-zàâäéèêëïîôùûüç\'’-]+(?:\s+[A-ZÉÈÊÀÂÎÏÔÛÙÇ][a-zàâäéèêëïîôùûüç\'’-]+)+)/u', $text, $m ) ) {
			foreach ( $m[1] as $name ) {
				$found[] = self::plain( $name );
			}
		}

		if ( preg_match_all( '/\b([A-ZÉÈÊÀÂÎÏÔÛÙÇ][a-zàâäéèêëïîôùûüç\'’-]{2,20})\s+([A-ZÉÈÊÀÂÎÏÔÛÙÇ][a-zàâäéèêëïîôùûüç\'’-]{2,20})\b/u', $text, $m, PREG_SET_ORDER ) ) {
			foreach ( $m as $row ) {
				$first = $row[1];
				$last  = $row[2];
				if ( self::looks_like_person( $first, $last ) ) {
					$found[] = $first . ' ' . $last;
				}
			}
		}

		$unique = array();
		$seen   = array();
		foreach ( $found as $name ) {
			$key = self::norm( $name );
			if ( '' === $key || isset( $seen[ $key ] ) ) {
				continue;
			}
			$seen[ $key ] = true;
			$unique[]     = $name;
			if ( count( $unique ) >= 3 ) {
				break;
			}
		}
		return $unique;
	}

	/**
	 * @param string $first
	 * @param string $last
	 * @return bool
	 */
	private static function looks_like_person( $first, $last ) {
		$skip_first = array(
			'cabinet', 'agence', 'musee', 'horaires', 'contact', 'mentions',
			'accueil', 'notre', 'equipe', 'bienvenue', 'plomberie', 'dentaire',
			'doctolib', 'france', 'visite', 'location', 'vente', 'estimation',
			'implants', 'detartrage', 'debouchage', 'depannage', 'exposition',
			'collection', 'accompagnement', 'strategie', 'dirigeants', 'wordpress',
			'talker', 'prendre', 'lundi', 'mardi', 'samedi', 'dimanche', 'avenue',
			'rue', 'place', 'centre', 'immobilier', 'immobiliere', 'tissus',
			'orthodontie', 'urgence', 'appartement', 'maison',
		);
		$skip_last = array(
			'dentaire', 'immobilier', 'immobiliere', 'plomberie', 'wordpress',
			'doctolib', 'horaires', 'tissus', 'ouverture', 'rendez',
		);
		$nf = self::norm( $first );
		$nl = self::norm( $last );
		if ( in_array( $nf, $skip_first, true ) || in_array( $nl, $skip_last, true ) ) {
			return false;
		}
		if ( $nf === $nl ) {
			return false;
		}
		return true;
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
