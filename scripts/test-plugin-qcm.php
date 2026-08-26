<?php
/**
 * CLI checks for crawl facts, five families, confirm-first QCM, and scan payload.
 * No WordPress bootstrap: mocks the few WP helpers the crawl class uses.
 */

define( 'ABSPATH', sys_get_temp_dir() . '/' );

$GLOBALS['tn_options'] = array();
$GLOBALS['tn_http']    = array();

function get_option( $key, $default = false ) {
	return array_key_exists( $key, $GLOBALS['tn_options'] ) ? $GLOBALS['tn_options'][ $key ] : $default;
}
function update_option( $key, $value, $autoload = true ) {
	unset( $autoload );
	$GLOBALS['tn_options'][ $key ] = $value;
	return true;
}
function wp_strip_all_tags( $value ) {
	return trim( preg_replace( '/\s+/', ' ', strip_tags( (string) $value ) ) );
}
function wp_parse_url( $url, $component = -1 ) {
	return parse_url( $url, $component );
}
function untrailingslashit( $value ) {
	return rtrim( (string) $value, '/\\' );
}
function is_wp_error( $thing ) {
	return $thing instanceof WP_Error_Stub;
}
function wp_remote_get( $url, $args = array() ) {
	unset( $args );
	if ( ! isset( $GLOBALS['tn_http'][ $url ] ) ) {
		return new WP_Error_Stub( 'missing' );
	}
	return $GLOBALS['tn_http'][ $url ];
}
function wp_remote_retrieve_response_code( $response ) {
	return is_array( $response ) && isset( $response['code'] ) ? $response['code'] : 0;
}
function wp_remote_retrieve_body( $response ) {
	return is_array( $response ) && isset( $response['body'] ) ? $response['body'] : '';
}
function talker_now_home_url() {
	return 'https://site.example/';
}

class WP_Error_Stub {
	public $code;
	public function __construct( $code ) {
		$this->code = $code;
	}
}

function is_user_logged_in() {
	return true;
}
function wp_get_current_user() {
	$user = new stdClass();
	$user->display_name = 'Tech Webmaster';
	$user->user_email   = 'tech@example.com';
	return $user;
}

require dirname( __DIR__ ) . '/wp-plugin/talker-now/includes/class-crawl.php';

$failed = 0;
function tn_assert( $ok, $label ) {
	global $failed;
	if ( $ok ) {
		echo "ok  $label\n";
		return;
	}
	$failed++;
	echo "FAIL  $label\n";
}

$fixtures = array(
	'medical' => '<html><head><title>Cabinet dentaire Dupont à Lyon</title><meta name="description" content="Dentiste à Lyon 3e. Soins, implants, urgence. Prise de rendez-vous Doctolib. Lun-Ven 8h30-18h."></head><body><h1>Cabinet dentaire Dupont</h1><h2>Implants</h2><h2>Détartrage</h2><p>Orthodontie et urgence dentaire. 69003 Lyon. Tél 04 72 00 00 00. Lun-Ven 8h30-18h.</p></body></html>',
	'realtor' => '<html><head><title>Agence immobilière Martin — Bordeaux</title><meta name="description" content="Vente et location d’appartements à Bordeaux. Estimation et visites sur rendez-vous. Gestion locative."></head><body><h1>Agence immobilière Martin</h1><h2>Vente</h2><h2>Location</h2><p>Appartements et maisons à Bordeaux. Visite du bien sur rendez-vous. Estimation immobilière.</p></body></html>',
	'trade'   => '<html><head><title>Dupond Plomberie dépannage Paris 15</title><meta name="description" content="Plombier à Paris 15e. Débouchage, fuite, chauffe-eau. Intervention 7j/7. Appelez le 06 12 34 56 78."></head><body><h1>Dupond Plomberie</h1><h2>Débouchage</h2><h2>Dépannage</h2><p>Fuite d’eau, débouchage, chauffe-eau. Paris 15. Appelez le 06 12 34 56 78. Ouvert 7j/7 8h-20h.</p></body></html>',
	'hours'   => '<html><head><title>Musée des Tissus — Lyon</title><meta name="description" content="Horaires d’ouverture mar-dim 10h-18h. Visites guidées. Billetterie et expositions."></head><body><h1>Musée des Tissus</h1><h2>Visite guidée</h2><h2>Exposition</h2><p>Collection permanente. Mar-dim 10h-18h. Réservation groupes. Lyon.</p></body></html>',
	'spin'    => '<html><head><title>Accompagnement des dirigeants — stratégie</title><meta name="description" content="Cabinet de conseil aux PME. Accompagnement des dirigeants. Premier échange sur rendez-vous."></head><body><h1>Accompagnement des dirigeants</h1><p>Conseil aux dirigeants, organisation et stratégie d’entreprise. Consultant. Rendez-vous.</p></body></html>',
	'thin'    => '<html><head><title>Bienvenue</title></head><body><p>Hello.</p></body></html>',
);

$families = array();
$confirms = array();
$sequences = array();

foreach ( $fixtures as $name => $html ) {
	$parsed = Talker_Now_Crawl::parse( $html );
	$facts  = Talker_Now_Crawl::extract_facts( $parsed );
	$family = Talker_Now_Crawl::classify_family( $facts['haystack'] );
	$thin   = Talker_Now_Crawl::is_thin( $facts, $family );
	$families[ $name ] = $family;
	if ( 'thin' === $name ) {
		tn_assert( $thin && '' === $family, "thin crawl is unclassified" );
		$framing = Talker_Now_Crawl::framing_questions( $facts );
		tn_assert( 3 === count( $framing ), "thin path has three framing questions" );
		tn_assert( false !== strpos( $framing[0], 'parlez pour' ) || false !== strpos( $framing[0], 'plugin' ), "thin first question separates dirigeant vs prestataire" );
		tn_assert( false !== strpos( $framing[0], 'j’installe pour quelqu’un d’autre' ) || false !== strpos( $framing[0], "j'installe pour quelqu'un d'autre" ), "thin first question offers technician escape" );
		tn_assert( false !== strpos( $framing[1], 'appellent' ) || false !== strpos( $framing[1], 'écrivent' ), "framing asks why people call" );
		tn_assert( false !== strpos( $framing[2], 'jamais' ), "framing asks what never to say" );
		continue;
	}
	tn_assert( $family === $name, "$name classified as $name (got {$family})" );
	tn_assert( ! $thin, "$name is not thin" );
	$confirm = Talker_Now_Crawl::confirm_question( $family, $facts );
	$confirms[ $name ] = $confirm;
	$qs = Talker_Now_Crawl::questions_for( $family, $facts );
	$sequences[ $name ] = $qs;
	tn_assert( count( $qs ) >= 4 && count( $qs ) <= 8, "$name has 4–8 generated questions (" . count( $qs ) . ")" );
	$blob = strtolower( $confirm . ' ' . implode( ' ', $qs ) );
	tn_assert( false === strpos( $blob, 'nom de votre entreprise' ) && false === strpos( $blob, 'quel est le nom' ), "$name never asks company name" );
	tn_assert( false === strpos( $blob, 'employer of record' ) && false === strpos( $blob, 'eor' ), "$name does not clone EOR" );
}

tn_assert( $confirms['medical'] !== $confirms['realtor'] && $confirms['medical'] !== $confirms['trade'], "confirm questions differ across métiers" );
tn_assert( false !== strpos( strtolower( $confirms['medical'] ), 'cabinet' ) || false !== strpos( strtolower( $confirms['medical'] ), 'dentaire' ), "medical confirm names the cabinet" );
tn_assert( false !== strpos( $confirms['medical'], 'Lyon' ), "medical confirm is grounded in city" );
tn_assert( false !== strpos( strtolower( $confirms['trade'] ), 'plomb' ), "trade confirm names plumber" );
tn_assert( false !== strpos( $confirms['realtor'], 'Bordeaux' ) || false !== strpos( strtolower( $confirms['realtor'] ), 'immobili' ), "realtor confirm grounded" );

$med = strtolower( implode( ' ', $sequences['medical'] ) );
$imo = strtolower( implode( ' ', $sequences['realtor'] ) );
$plb = strtolower( implode( ' ', $sequences['trade'] ) );
tn_assert( $med !== $imo && $med !== $plb && $imo !== $plb, "generated sequences are not the same" );
tn_assert( false !== strpos( $med, 'doctolib' ) || false !== strpos( $med, 'rendez-vous' ) || false !== strpos( $med, 'ordonnance' ), "medical asks cabinet booking/care" );
tn_assert( false === strpos( $med, 'débouchage' ) && false === strpos( $med, 'mandat' ), "medical does not ask plumber/realtor stock" );
tn_assert( false !== strpos( $imo, 'bien' ) || false !== strpos( $imo, 'visite' ) || false !== strpos( $imo, 'estimation' ), "realtor asks about biens/visites" );
tn_assert( false === strpos( $imo, 'débouchage' ) && false === strpos( $imo, 'ordonnance' ) && false === strpos( $imo, 'doctolib' ), "realtor does not ask medical/plumber stock" );
tn_assert( false !== strpos( $plb, 'dépann' ) || false !== strpos( $plb, 'zone' ) || false !== strpos( $plb, 'urgence' ) || false !== strpos( $plb, 'débouch' ), "trade asks dépannage/zone" );
tn_assert( false === strpos( $plb, 'doctolib' ) && false === strpos( $plb, 'ordonnance' ) && false === strpos( $plb, 'estimation' ), "trade does not ask medical/realtor stock" );

tn_assert( 'yes' === Talker_Now_Crawl::stance( 'Oui, exactement' ), "stance yes" );
tn_assert( 'no' === Talker_Now_Crawl::stance( 'Non, je suis plombier' ), "stance no" );

$GLOBALS['tn_options'] = array();
$parsed = Talker_Now_Crawl::parse( $fixtures['medical'] );
$facts  = Talker_Now_Crawl::extract_facts( $parsed );
Talker_Now_Crawl::save(
	array(
		'status' => 'done',
		'family' => 'medical',
		'facts'  => $facts,
		'thin'   => false,
		'phase'  => 'idle',
		'title'  => $facts['title'],
	)
);
$hello = Talker_Now_Crawl::hello();
tn_assert( 'ready' === $hello['visual'], "done crawl: no scan visual" );
tn_assert( false !== strpos( $hello['intro'], 'parcouru' ) && false !== strpos( $hello['intro'], 'QCM' ), "done crawl intro starts QCM" );
tn_assert( false !== strpos( $hello['question'], '?' ), "first question is the confirm" );
tn_assert( 'confirm' === $hello['qcm'], "phase is confirm" );
tn_assert( false !== strpos( $hello['question'], 'parlez pour' ) || false !== strpos( strtolower( $hello['question'] ), 'cabinet' ), "no-name identity uses société from crawl" );
tn_assert( false === strpos( $hello['question'], 'Tech Webmaster' ), "WP display name is never the identity" );
tn_assert( false === strpos( $hello['question'], 'tech@example.com' ), "WP email is never the identity" );

$switched = Talker_Now_Crawl::answer( 'Non, je suis plombier à Lyon' );
tn_assert( 'questions' === $switched['qcm'], "no + métier switches in one turn" );
tn_assert( false !== strpos( strtolower( $switched['question'] ), 'plomb' ) || false !== strpos( strtolower( $switched['question'] ), 'dépann' ) || false !== strpos( strtolower( $switched['question'] ), 'zone' ) || false !== strpos( strtolower( $switched['question'] ), 'fuite' ) || false !== strpos( strtolower( $switched['question'] ), 'débouch' ), "switched sequence is trade, not medical" );
tn_assert( false === strpos( strtolower( $switched['question'] ), 'doctolib' ), "switched away from medical Doctolib" );

$GLOBALS['tn_options'] = array();
Talker_Now_Crawl::save(
	array(
		'status'     => 'running',
		'phase'      => 'idle',
		'updated_at' => gmdate( 'c' ),
		'url'        => talker_now_home_url(),
	)
);
$scan = Talker_Now_Crawl::hello();
tn_assert( 'scan' === $scan['visual'], "running crawl returns scan visual" );
tn_assert( '' === $scan['intro'] && '' === $scan['question'], "scan payload has no QCM text yet" );

$js  = file_get_contents( dirname( __DIR__ ) . '/wp-plugin/talker-now/assets/widget.js' );
$css = file_get_contents( dirname( __DIR__ ) . '/wp-plugin/talker-now/assets/widget.css' );
tn_assert( false !== strpos( $js, 'addScan' ) && false !== strpos( $js, 'talker-now-scan-wheel' ), "admin hello uses scan wheel helper" );
$hello_fn = '';
if ( preg_match( '/function startManagerHello\(\) \{([\s\S]*?)\n  function /', $js, $m ) ) {
	$hello_fn = $m[1];
}
tn_assert( '' !== $hello_fn && false === strpos( $hello_fn, 'addTyping' ), "manager hello never uses typing ellipsis" );
tn_assert( false !== strpos( $js, 'if (!crawlKnownDone())' ) && false !== strpos( $js, 'addScan()' ), "scan wheel only while crawl not known done" );
tn_assert( false !== strpos( $js, 'showManagerPayload' ), "ready path shows intro + question" );
tn_assert( false !== strpos( $css, 'talker-now-spin' ), "scan wheel CSS present" );
tn_assert( false === strpos( $js, 'Bonjour, vous me voyez' ), "chip label stays in PHP, not JS" );
$widget = file_get_contents( dirname( __DIR__ ) . '/wp-plugin/talker-now/includes/class-widget.php' );
$boot   = file_get_contents( dirname( __DIR__ ) . '/wp-plugin/talker-now/talker-now.php' );
tn_assert( false !== strpos( $widget, 'Bonjour, vous me voyez ? je suis là, cliquez-moi.' ), "admin chip unchanged" );
tn_assert( false !== strpos( $css, 'min-width: 13.5rem' ) && false !== strpos( $js, 'createElement("br")' ), "hello chip wraps on 2–3 lines, not one word per line" );
tn_assert( false !== strpos( $js, 'function playAttractSequence' ) && false !== strpos( $js, 'var WAVE_MS = 1500' ) && false !== strpos( $js, 'var BADGE_ALONE_MS = 1600' ) && false !== strpos( $js, 'var CHIP_STAGGER_MS = 1000' ), "both surfaces share A bubble, B rings, C the 1 alone, D chips one by one" );
tn_assert( false === strpos( $js, 'playAdminAttract' ) && false === strpos( $js, 'ADMIN_HALO_MS' ) && false === strpos( $js, 'ADMIN_BADGE_MS' ), "old admin-only stagger is gone" );
tn_assert( false === strpos( $js, 'halo.classList.toggle("is-on"' ) && false === strpos( $js, 'attractOn' ) && false === strpos( $js, 'scheduleAttract' ), "halo is never flipped on with the badge; bubble is not delayed off-screen" );
$seq = '';
if ( preg_match( '/function playAttractSequence\(\) \{([\s\S]*?)\n  function /', $js, $m ) ) {
	$seq = $m[1];
}
tn_assert( '' !== $seq, "attract sequence function is parseable" );
tn_assert( false !== strpos( $seq, 'halo.classList.add("is-pulse")' ) && false !== strpos( $seq, 'setTimeout(afterWave, WAVE_MS)' ), "rings start, then stop, before the 1" );
tn_assert( false !== strpos( $seq, 'stopHalo()' ) && false !== strpos( $seq, 'showUnreadMark()' ) && strpos( $seq, 'stopHalo()' ) < strpos( $seq, 'showUnreadMark()' ), "red 1 only after the rings are gone" );
tn_assert( false !== strpos( $js, 'setTimeout(afterBadgeAlone, BADGE_ALONE_MS)' ), "the 1 sits alone before any chip" );
tn_assert( false !== strpos( $js, 'is-beat-a' ) && false !== strpos( $js, 'is-beat-b' ) && false !== strpos( $js, 'is-beat-c' ) && false !== strpos( $js, 'is-beat-d' ), "beats A–D are exclusive classes" );
tn_assert( false !== strpos( $js, 'chipsRevealed' ) && false !== strpos( $js, 'chip.classList.add("is-in")' ), "chips stay hidden until staggered in" );
tn_assert( false === strpos( $css, 'talker-now-ripple' ) && false !== strpos( $css, 'talker-now-ring-out' ) && false !== strpos( $css, 'ease-out 1 forwards' ), "wave is 2–3 finite rings, not an infinite ripple" );
tn_assert( false !== strpos( $css, '.talker-now-chip.is-in' ) && false !== strpos( $css, '.talker-now-root.is-beat-c .talker-now-chip' ), "CSS keeps chips off during A–C and the 1 off during the wave" );
tn_assert( false !== strpos( $css, '.talker-now-root:not(.is-beat-b) .talker-now-ring' ), "rings cannot leak outside beat B" );
tn_assert( false !== strpos( $css, '.talker-now-launcher-wrap.is-calm .talker-now-dot' ), "unread 1 sits on a calm bubble" );
tn_assert( false !== strpos( $css, 'talker-now-badge-in' ), "the 1 still pops once the wave is gone" );
tn_assert( false === strpos( $js, 'var CALM_MS' ) && false === strpos( $js, 'CHIP_STAGGER_MS = 240' ), "0.1.11 220ms/240ms dump timings are gone" );
tn_assert( false !== strpos( $boot, 'Poser une question' ) && false !== strpos( $boot, 'Prendre rendez-vous' ), "public chips still in defaults" );

$one = '<html><head><title>Cabinet dentaire Dupont à Lyon</title><meta name="description" content="Dentiste à Lyon. Doctolib. Lun-Ven 8h30-18h."></head><body><h1>Cabinet dentaire Dupont</h1><p>Soins, implants. 69003 Lyon.</p><footer>Dr Marie Dupont — dentiste à Lyon</footer></body></html>';
$one_facts = Talker_Now_Crawl::extract_facts( Talker_Now_Crawl::parse( $one ) );
tn_assert( in_array( 'Marie Dupont', $one_facts['people'], true ), "one person crawled from footer" );
$one_q = Talker_Now_Crawl::confirm_question( 'medical', $one_facts );
tn_assert( 0 === strpos( $one_q, 'Vous êtes bien Marie Dupont' ), "one-name identity question" );
tn_assert( false !== strpos( $one_q, 'Lyon' ) && false !== strpos( $one_q, 'j’installe pour quelqu’un d’autre' ), "one-name question has city and technician escape" );
tn_assert( false === strpos( $one_q, 'Tech Webmaster' ), "crawled name wins over WP account" );

$team = '<html><head><title>Cabinet dentaire à Lyon</title></head><body><h1>Cabinet dentaire</h1><h2>L’équipe</h2><h3>Marie Dupont</h3><h3>Jean Martin</h3><h3>Claire Bernard</h3><p>Dentiste à Lyon. Doctolib.</p></body></html>';
$team_facts = Talker_Now_Crawl::extract_facts( Talker_Now_Crawl::parse( $team ) );
$team_q = Talker_Now_Crawl::confirm_question( 'medical', $team_facts );
tn_assert( 0 === strpos( $team_q, 'Je vois ' ) && false !== strpos( $team_q, 'Marie Dupont' ) && false !== strpos( $team_q, 'Jean Martin' ), "two-or-three names listed from crawl" );
tn_assert( false !== strpos( $team_q, 'c’est bien vous, ou quelqu’un d’autre' ), "multi-name asks which person" );

$none_q = Talker_Now_Crawl::confirm_question( 'medical', Talker_Now_Crawl::extract_facts( Talker_Now_Crawl::parse( $fixtures['medical'] ) ) );
tn_assert( 0 === strpos( $none_q, 'Vous parlez pour' ) && false !== strpos( $none_q, 'posez le plugin' ), "no names: dirigeant vs prestataire" );

tn_assert( Talker_Now_Crawl::is_technician( 'j’installe pour quelqu’un d’autre' ), "technician escape is detected" );
tn_assert( ! Talker_Now_Crawl::is_technician( 'Non, je suis plombier' ), "métier correction is not technician" );

$GLOBALS['tn_options'] = array();
Talker_Now_Crawl::save(
	array(
		'status' => 'done',
		'family' => 'medical',
		'facts'  => $one_facts,
		'thin'   => false,
		'phase'  => 'idle',
		'title'  => $one_facts['title'],
	)
);
Talker_Now_Crawl::hello();
$proxy = Talker_Now_Crawl::answer( 'j’installe pour quelqu’un d’autre' );
tn_assert( 'proxy' === $proxy['qcm'], "technician path asks for the real gérant" );
tn_assert( false !== strpos( $proxy['question'], 'gérant' ) && false !== strpos( $proxy['question'], 'e-mail' ), "proxy asks name + email" );
$after = Talker_Now_Crawl::answer( 'Paul Moreau paul@cabinet.example' );
tn_assert( 'questions' === $after['qcm'], "after gérant identity, fact QCM continues" );
tn_assert( false === strpos( strtolower( $after['question'] ), 'tech webmaster' ), "client prompt is not in the technician voice" );
$stored = Talker_Now_Crawl::get();
tn_assert( 'proxy' === $stored['voice'] && false !== strpos( $stored['gerant_name'], 'Paul Moreau' ), "gérant stored, technician is not the voice" );

echo $failed ? "\n$failed failed\n" : "\nall passed\n";
exit( $failed ? 1 : 0 );
