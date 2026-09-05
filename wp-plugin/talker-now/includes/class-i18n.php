<?php
/**
 * Runtime locale packs for the zip widget + admin QCM.
 * WordPress locale (or user locale in admin) maps onto Talker locales.
 * FR strings stay character-identical so existing QCM tests keep passing.
 *
 * @package TalkerNow
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @return array<int, string>
 */
function talker_now_supported_locales() {
	return array( 'fr', 'en', 'de', 'it', 'es', 'nl', 'pl' );
}

/**
 * @param string $raw WordPress locale (fr_FR, de_DE, nl_BE, …)
 * @return string
 */
function talker_now_normalize_locale( $raw ) {
	$code = strtolower( strtok( str_replace( '-', '_', (string) $raw ), '_' ) );
	$map  = array(
		'fr' => 'fr',
		'en' => 'en',
		'de' => 'de',
		'it' => 'it',
		'es' => 'es',
		'nl' => 'nl',
		'pl' => 'pl',
	);
	return isset( $map[ $code ] ) ? $map[ $code ] : 'fr';
}

/**
 * Public site: blog locale. WP-Admin: the logged-in user's locale.
 *
 * @return string
 */
function talker_now_locale() {
	if ( isset( $GLOBALS['talker_now_locale_override'] ) && '' !== (string) $GLOBALS['talker_now_locale_override'] ) {
		return talker_now_normalize_locale( (string) $GLOBALS['talker_now_locale_override'] );
	}
	if ( function_exists( 'talker_now_is_manager' ) && talker_now_is_manager() && function_exists( 'get_user_locale' ) ) {
		return talker_now_normalize_locale( get_user_locale() );
	}
	if ( function_exists( 'determine_locale' ) ) {
		return talker_now_normalize_locale( determine_locale() );
	}
	if ( function_exists( 'get_locale' ) ) {
		return talker_now_normalize_locale( get_locale() );
	}
	return 'fr';
}

/**
 * @param string               $key
 * @param array<int, string>   $args
 * @return string
 */
function talker_now_i18n( $key, $args = array() ) {
	$packs  = talker_now_i18n_packs();
	$locale = talker_now_locale();
	$tpl    = '';
	if ( isset( $packs[ $locale ][ $key ] ) ) {
		$tpl = $packs[ $locale ][ $key ];
	} elseif ( isset( $packs['fr'][ $key ] ) ) {
		$tpl = $packs['fr'][ $key ];
	} else {
		$tpl = $key;
	}
	if ( empty( $args ) ) {
		return $tpl;
	}
	return vsprintf( $tpl, $args );
}

/**
 * Widget chrome + contact fields, already localized for wp_localize_script.
 *
 * @return array<string, string>
 */
function talker_now_widget_i18n() {
	return array(
		'placeholder'    => talker_now_i18n( 'widget.placeholder' ),
		'send'           => talker_now_i18n( 'widget.send' ),
		'close'          => talker_now_i18n( 'widget.close' ),
		'open'           => talker_now_i18n( 'widget.open' ),
		'contactHint'    => talker_now_i18n( 'widget.contactHint' ),
		'contactToggle'  => talker_now_i18n( 'widget.contactToggle' ),
		'name'           => talker_now_i18n( 'widget.name' ),
		'email'          => talker_now_i18n( 'widget.email' ),
		'phone'          => talker_now_i18n( 'widget.phone' ),
		'offline'        => talker_now_i18n( 'visitor.stub_thanks' ),
		'scanning'       => talker_now_i18n( 'widget.scanning' ),
		'scanningShort'  => talker_now_i18n( 'widget.scanningShort' ),
		'scanned'        => talker_now_i18n( 'qcm.intro_ready' ),
		'poweredBy'      => talker_now_i18n( 'widget.poweredBy' ),
	);
}

/**
 * Localized defaults. Stored FR defaults stay as the option seed.
 *
 * @param string $locale
 * @return array<string, string>
 */
function talker_now_defaults_for_locale( $locale = '' ) {
	$prev = $GLOBALS['talker_now_locale_override'] ?? null;
	if ( '' !== $locale ) {
		$GLOBALS['talker_now_locale_override'] = $locale;
	}
	$out = array(
		'invite_1' => talker_now_i18n( 'default.invite_1' ),
		'invite_2' => talker_now_i18n( 'default.invite_2' ),
		'invite_3' => talker_now_i18n( 'default.invite_3' ),
		'greeting' => talker_now_i18n( 'default.greeting' ),
	);
	if ( null === $prev ) {
		unset( $GLOBALS['talker_now_locale_override'] );
	} else {
		$GLOBALS['talker_now_locale_override'] = $prev;
	}
	return $out;
}

/**
 * @return array<string, array<string, string>>
 */
function talker_now_i18n_packs() {
	static $packs = null;
	if ( is_array( $packs ) ) {
		return $packs;
	}

	$override = isset( $GLOBALS['talker_now_locale_override'] ) ? (string) $GLOBALS['talker_now_locale_override'] : '';
	if ( '' !== $override ) {
		// Packs themselves do not depend on the override; lookup does.
	}

	$fr = array(
		'widget.placeholder'   => 'Écrivez votre message…',
		'widget.send'          => 'Envoyer',
		'widget.close'         => 'Fermer',
		'widget.open'          => 'Ouvrir la discussion',
		'widget.contactHint'   => 'Vous pouvez laisser un nom, un e-mail ou un téléphone.',
		'widget.contactToggle' => 'Laisser un contact',
		'widget.name'          => 'Nom',
		'widget.email'         => 'E-mail',
		'widget.phone'         => 'Téléphone',
		'widget.scanning'      => 'Je parcours votre site.',
		'widget.scanningShort' => 'Je parcours votre site…',
		'widget.poweredBy'     => 'Propulsé par talker.now',
		'default.invite_1'     => 'Talker Now',
		'default.invite_2'     => 'Poser une question',
		'default.invite_3'     => 'Prendre rendez-vous',
		'default.greeting'     => 'Bonjour. Comment puis-je vous aider ?',
		'admin.hello_chip'     => 'Bonjour, vous me voyez ? je suis là, cliquez-moi.',
		'visitor.stub_thanks'  => 'Merci. Nous vous recontacterons.',
		'visitor.stub_message' => 'Bien reçu. Laissez votre nom et un e-mail ou un téléphone, nous vous recontacterons.',
		'visitor.stub_empty'   => 'Laissez votre nom et un moyen de vous joindre, nous vous recontacterons.',
		'qcm.city_prefix'      => ' à %s',
		'qcm.escape'           => ' Si vous posez le plugin pour eux, dites « j’installe pour quelqu’un d’autre ».',
		'qcm.confirm_one'      => 'Vous êtes bien %1$s%2$s%3$s ?',
		'qcm.confirm_many'     => 'Je vois %s — c’est bien vous, ou quelqu’un d’autre ?',
		'qcm.and'              => ' et ',
		'qcm.this_activity'    => 'cette activité',
		'qcm.confirm_org'      => 'Vous parlez pour %1$s%2$s, ou vous posez le plugin pour eux ?',
		'qcm.frame_1'          => 'Le site dit trop peu. Vous parlez pour %1$s%2$s, ou vous posez le plugin pour quelqu’un d’autre ? Si vous installez pour quelqu’un d’autre, dites « j’installe pour quelqu’un d’autre ».',
		'qcm.frame_2'          => 'Pourquoi les gens appellent ou écrivent, en premier ?',
		'qcm.frame_3'          => 'Qu’est-ce que le bot ne doit jamais dire ou promettre — à leur place, pas à la vôtre si vous n’êtes pas le gérant ?',
		'qcm.intro_thin'       => 'J’ai parcouru votre site : il dit trop peu pour que je devine. On cadre en trois questions, puis je génère la suite.',
		'qcm.intro_short'      => 'J’ai parcouru votre site.',
		'qcm.already_framed'   => 'On a déjà cadré l’essentiel. Dites-moi si quelque chose a changé.',
		'qcm.intro_ready'      => 'J’ai parcouru votre site, on peut commencer le QCM.',
		'qcm.noted_proxy'      => 'C’est noté. Je parlerai comme %s, pas avec votre voix.',
		'qcm.the_manager'      => 'le gérant',
		'qcm.noted_self'       => 'C’est noté. Je m’en servirai pour parler comme vous sur le site.',
		'qcm.noted_changed'    => 'C’est noté. Dites-moi si quelque chose a changé sur le site.',
		'qcm.proxy_who'        => 'Qui est le vrai gérant — nom et e-mail ? Je ne dois pas écrire le prompt du client avec votre voix.',
		'qcm.reclass'          => 'D’accord, je me trompe. Vous êtes plutôt : un lieu avec des horaires (musée, visites), un artisan local (plombier, dépannage…), une agence immobilière, un cabinet médical, ou un accompagnement / conseil ?',
		'qcm.their_activity'   => 'leur activité',
		'job.dentist'          => 'dentiste',
		'job.osteo'            => 'ostéopathe',
		'job.physio'           => 'kinésithérapeute',
		'job.doctor'           => 'médecin',
		'job.vet'              => 'vétérinaire',
		'job.psych'            => 'psychologue',
		'job.practitioner'     => 'praticien',
		'job.realtor'          => 'agent immobilier',
		'job.public_place'     => 'un lieu ouvert au public',
		'job.advice'           => 'conseil',
		'job.trade'            => 'un artisan du bâtiment',
		'label.dental'         => 'un cabinet dentaire',
		'label.osteo'          => 'un cabinet d’ostéopathie',
		'label.physio'         => 'un cabinet de kinésithérapie',
		'label.medical'        => 'un cabinet médical',
		'label.vet'            => 'un cabinet vétérinaire',
		'label.psych'          => 'un cabinet de psychologie',
		'label.health'         => 'un cabinet de santé',
		'q.hours_read'         => 'J’ai lu sur le site : « %s ». Ce sont bien les horaires à donner aux visiteurs ?',
		'q.hours_ask'          => 'Quels horaires je dois donner, y compris le jour de fermeture, sans rien inventer ?',
		'q.hours_booking_read' => 'Les visites se préparent comment — j’ai vu « %s ». C’est le bon canal ?',
		'q.hours_booking_ask'  => 'Billet, groupe, scolaire : on réserve comment, concrètement ?',
		'q.hours_svc_read'     => 'J’ai vu « %s ». C’est encore d’actualité, et je le propose comment ?',
		'q.hours_svc_ask'      => 'Visite libre, guidée, expo temporaire : qu’est-ce que je peux citer sans me tromper de saison ?',
		'q.hours_city_read'    => 'L’accueil se fait bien à %s — accès, parking, entrée, je précise quoi ?',
		'q.hours_city_ask'     => 'Adresse et accès : qu’est-ce qu’un visiteur se trompe souvent, pour que je le dise juste ?',
		'q.hours_holiday'      => 'Un visiteur demande un jour férié ou une nocturne : je dis quoi, concrètement ?',
		'q.hours_never'       => 'Tarif, jauge, expo terminée : qu’est-ce que je ne dois jamais inventer ?',
		'q.trade_svc_read'    => 'J’ai vu « %s ». C’est bien ce que les gens appellent en premier — fuite, débouchage, panne ?',
		'q.trade_svc_ask'     => 'Dépannage du jour : fuite, débouchage, chauffage, autre — qu’est-ce qui sonne le plus ?',
		'q.trade_city_read'   => 'Vous vous déplacez bien sur %s — jusqu’où autour, sans que j’invente une zone ?',
		'q.trade_city_ask'    => 'Zone d’intervention : quelles communes oui, quelles communes je dois refuser ?',
		'q.trade_hours_read'  => 'J’ai lu « %s ». Urgence le soir ou le week-end : vous venez, ça dépend, ou je renvoie au lendemain ?',
		'q.trade_hours_ask'   => 'Le soir et le week-end : je dis que vous venez, que ça dépend, ou que ce n’est pas possible ?',
		'q.trade_join_read'   => 'Pour joindre, j’ai vu « %s ». Numéro d’urgence à part, ou c’est le bon réflexe ?',
		'q.trade_join_ask'    => 'On vous joint comment pour un dépannage — téléphone, formulaire, SMS ?',
		'q.trade_price'       => 'Devis ou prix au téléphone : je m’arrête où ? Je ne dois jamais inventer un tarif.',
		'q.trade_refuse'      => 'Quels dépannages vous ne faites pas, pour que je ne promette pas à votre place ?',
		'q.trade_never'       => 'Délai, garantie, marque de pièce : qu’est-ce que le bot ne doit jamais dire ?',
		'q.re_svc_read'       => 'Le site parle de « %s ». C’est bien votre quotidien — vente, location, gestion ?',
		'q.re_svc_ask'        => 'Achat, location, estimation, gestion : par quoi commencent le plus souvent les messages ?',
		'q.re_city_read'      => 'Vous travaillez bien %s — d’autres communes, ou je m’en tiens à ça ?',
		'q.re_city_ask'       => 'Quelles communes et quels types de biens je peux citer, sans prétendre couvrir tout le département ?',
		'q.re_book_read'      => 'Pour une visite, j’ai vu « %s ». On prend rendez-vous comment, concrètement ?',
		'q.re_book_ask'       => 'Visite d’un bien : créneau en ligne, appel, ou passage à l’agence ?',
		'q.re_avail'          => 'Un visiteur demande si un bien est encore dispo ou son prix : je ne dois rien inventer — je fais quoi ?',
		'q.re_estimate'       => 'Estimation / avis de valeur : vous le faites, sur rendez-vous, ou je dois recadrer poliment ?',
		'q.re_mandate'        => 'Quels mandats ou types de biens je ne dois pas prétendre avoir ?',
		'q.re_never'          => 'Prix, dispo, « c’est vendu » : qu’est-ce que le bot ne doit jamais dire ?',
		'q.med_svc_read'      => 'J’ai lu %1$s et « %2$s ». Les motifs d’appel les plus fréquents, c’est bien ça ?',
		'q.med_svc_ask'       => 'Pour %s : les gens écrivent surtout pour un premier rendez-vous, un renouvellement, une urgence ?',
		'q.med_book_read'     => 'J’ai vu « %s ». C’est bien comme ça qu’on prend rendez-vous — pas un autre canal ?',
		'q.med_book_ask'      => 'Rendez-vous : Doctolib, téléphone du secrétariat, ou les deux ?',
		'q.med_hours_read'    => 'Horaires lus : « %s ». Une douleur le soir : je dis rappel, pharmacie de garde, ou rien d’inventé ?',
		'q.med_hours_ask'     => 'Horaires du cabinet et absences : que puis-je dire sans inventer une urgence médicale ?',
		'q.med_city_read'     => 'Le cabinet est bien à %s — étage, interphone, parking à préciser ?',
		'q.med_city_ask'      => 'Comment on trouve le cabinet sans se tromper de porte ?',
		'q.med_rx'            => 'Ordonnance, certificat, diagnostic en message : je refuse, je prends un rendez-vous, autre chose ?',
		'q.med_cancel'        => 'Annulation ou retard : quelle règle je peux citer, sans en inventer une ?',
		'q.med_never'         => 'Avis médical, tarif non affiché, « venez tout de suite » : qu’est-ce que le bot ne doit jamais dire ?',
		'q.spin_act_read'     => 'J’ai parcouru l’accueil : « %s ». C’est bien le sujet d’une première conversation ?',
		'q.spin_spoken'       => 'Vous avez dit « %s ». C’est bien le cadre d’un premier échange ?',
		'q.spin_act_ask'      => 'En une phrase, quel problème quelqu’un doit avoir pour que ce soit chez vous — pas un commerce de passage ?',
		'q.spin_who'          => 'Qui vous écrit surtout — dirigeant, RH, particulier — et après quel déclencheur ?',
		'q.spin_book_read'    => 'Un premier échange, c’est « %s » ?',
		'q.spin_book_ask'     => 'Premier échange : appel, formulaire, rendez-vous agenda — je oriente vers quoi ?',
		'q.spin_city_read'    => 'Vous opérez depuis %s — France entière, ou un périmètre plus serré ?',
		'q.spin_city_ask'     => 'Périmètre : local, France, international — que puis-je dire sans gonfler ?',
		'q.spin_clarify'      => 'Qu’est-ce qu’il faut que je clarifie avant de proposer un rendez-vous (périmètre, délai, qui décide) ?',
		'q.spin_refuse'       => 'Quelles demandes je dois écarter poliment, parce que ce n’est pas chez vous ?',
		'q.spin_never'        => 'Prix, engagement de résultat, « on s’occupe de tout » : qu’est-ce que le bot ne doit jamais dire ?',
	);

	$en = array(
		'widget.placeholder'   => 'Write your message…',
		'widget.send'          => 'Send',
		'widget.close'         => 'Close',
		'widget.open'          => 'Open the conversation',
		'widget.contactHint'   => 'You can leave a name, an email or a phone number.',
		'widget.contactToggle' => 'Leave a contact',
		'widget.name'          => 'Name',
		'widget.email'         => 'Email',
		'widget.phone'         => 'Phone',
		'widget.scanning'      => 'I’m reading your site.',
		'widget.scanningShort' => 'I’m reading your site…',
		'widget.poweredBy'     => 'Powered by talker.now',
		'default.invite_1'     => 'Talker Now',
		'default.invite_2'     => 'Ask a question',
		'default.invite_3'     => 'Book a visit',
		'default.greeting'     => 'Hello. How can I help you?',
		'admin.hello_chip'     => 'Hello, can you see me? I’m here — click me.',
		'visitor.stub_thanks'  => 'Thanks. We’ll get back to you.',
		'visitor.stub_message' => 'Got it. Leave your name and an email or phone number, we’ll get back to you.',
		'visitor.stub_empty'   => 'Leave your name and a way to reach you, we’ll get back to you.',
		'qcm.city_prefix'      => ' in %s',
		'qcm.escape'           => ' If you are installing the plugin for them, say “I’m installing for someone else”.',
		'qcm.confirm_one'      => 'You are %1$s%2$s%3$s, right?',
		'qcm.confirm_many'     => 'I see %s — is that you, or someone else?',
		'qcm.and'              => ' and ',
		'qcm.this_activity'    => 'this business',
		'qcm.confirm_org'      => 'Are you speaking for %1$s%2$s, or are you installing the plugin for them?',
		'qcm.frame_1'          => 'The site says too little. Are you speaking for %1$s%2$s, or installing the plugin for someone else? If you install for someone else, say “I’m installing for someone else”.',
		'qcm.frame_2'          => 'Why do people call or write, first of all?',
		'qcm.frame_3'          => 'What must the bot never say or promise — in their name, not yours if you are not the owner?',
		'qcm.intro_thin'       => 'I read your site: it says too little for me to guess. We frame it in three questions, then I generate the rest.',
		'qcm.intro_short'      => 'I read your site.',
		'qcm.already_framed'   => 'We already framed the essentials. Tell me if something changed.',
		'qcm.intro_ready'      => 'I read your site, we can start the questionnaire.',
		'qcm.noted_proxy'      => 'Noted. I will speak as %s, not in your voice.',
		'qcm.the_manager'      => 'the owner',
		'qcm.noted_self'       => 'Noted. I will use that to speak like you on the site.',
		'qcm.noted_changed'    => 'Noted. Tell me if something changed on the site.',
		'qcm.proxy_who'        => 'Who is the real owner — name and email? I must not write the client prompt in your voice.',
		'qcm.reclass'          => 'Understood, I have it wrong. Are you rather: a place with opening hours (museum, visits), a local trade (plumber, call-outs…), an estate agency, a medical practice, or consulting / support?',
		'qcm.their_activity'   => 'their business',
		'job.dentist'          => 'dentist',
		'job.osteo'            => 'osteopath',
		'job.physio'           => 'physiotherapist',
		'job.doctor'           => 'doctor',
		'job.vet'              => 'vet',
		'job.psych'            => 'psychologist',
		'job.practitioner'     => 'practitioner',
		'job.realtor'          => 'estate agent',
		'job.public_place'     => 'a place open to the public',
		'job.advice'           => 'consulting',
		'job.trade'            => 'a building tradesperson',
		'label.dental'         => 'a dental practice',
		'label.osteo'          => 'an osteopathy practice',
		'label.physio'         => 'a physiotherapy practice',
		'label.medical'        => 'a medical practice',
		'label.vet'            => 'a veterinary practice',
		'label.psych'          => 'a psychology practice',
		'label.health'         => 'a health practice',
		'q.hours_read'         => 'I read on the site: “%s”. Are those the hours to give visitors?',
		'q.hours_ask'          => 'Which hours should I give, including the closed day, without inventing anything?',
		'q.hours_booking_read' => 'How are visits arranged — I saw “%s”. Is that the right channel?',
		'q.hours_booking_ask'  => 'Ticket, group, school: how do people book, concretely?',
		'q.hours_svc_read'     => 'I saw “%s”. Is that still current, and how should I offer it?',
		'q.hours_svc_ask'      => 'Free visit, guided, temporary show: what can I cite without getting the season wrong?',
		'q.hours_city_read'    => 'Reception is in %s — access, parking, entrance, what should I specify?',
		'q.hours_city_ask'     => 'Address and access: what do visitors often get wrong, so I say it right?',
		'q.hours_holiday'      => 'A visitor asks about a public holiday or a late opening: what do I say, concretely?',
		'q.hours_never'       => 'Price, capacity, a show that has ended: what must I never invent?',
		'q.trade_svc_read'    => 'I saw “%s”. Is that what people call about first — leak, blockage, breakdown?',
		'q.trade_svc_ask'     => 'Same-day call-out: leak, blockage, heating, something else — what rings most?',
		'q.trade_city_read'   => 'You cover %s — how far around, without me inventing a zone?',
		'q.trade_city_ask'    => 'Call-out area: which towns yes, which towns must I refuse?',
		'q.trade_hours_read'  => 'I read “%s”. Evening or weekend emergency: you come, it depends, or I point to the next day?',
		'q.trade_hours_ask'   => 'Evening and weekend: do I say you come, it depends, or it is not possible?',
		'q.trade_join_read'   => 'To reach you I saw “%s”. A separate emergency number, or is that the right reflex?',
		'q.trade_join_ask'    => 'How do people reach you for a call-out — phone, form, SMS?',
		'q.trade_price'       => 'Quote or price on the phone: where do I stop? I must never invent a rate.',
		'q.trade_refuse'      => 'Which call-outs do you not do, so I do not promise in your name?',
		'q.trade_never'       => 'Delay, warranty, part brand: what must the bot never say?',
		'q.re_svc_read'       => 'The site talks about “%s”. Is that your day-to-day — sale, let, management?',
		'q.re_svc_ask'        => 'Buy, let, valuation, management: what do messages start with most often?',
		'q.re_city_read'      => 'You work %s — other towns, or do I stick to that?',
		'q.re_city_ask'       => 'Which towns and which property types can I cite, without claiming the whole county?',
		'q.re_book_read'      => 'For a viewing I saw “%s”. How do people book, concretely?',
		'q.re_book_ask'       => 'Viewing a property: online slot, phone, or drop-in at the agency?',
		'q.re_avail'          => 'A visitor asks if a property is still available or its price: I must invent nothing — what do I do?',
		'q.re_estimate'       => 'Valuation: you do it, by appointment, or should I politely reframe?',
		'q.re_mandate'        => 'Which mandates or property types must I not claim to have?',
		'q.re_never'          => 'Price, availability, “it’s sold”: what must the bot never say?',
		'q.med_svc_read'      => 'I read %1$s and “%2$s”. Are those the most frequent reasons for calling?',
		'q.med_svc_ask'       => 'For %s: do people write mostly for a first appointment, a renewal, an emergency?',
		'q.med_book_read'     => 'I saw “%s”. Is that how appointments are booked — not another channel?',
		'q.med_book_ask'      => 'Appointments: Doctolib, the desk phone, or both?',
		'q.med_hours_read'    => 'Hours I read: “%s”. Pain in the evening: do I say callback, duty pharmacy, or invent nothing?',
		'q.med_hours_ask'     => 'Practice hours and absences: what can I say without inventing a medical emergency?',
		'q.med_city_read'     => 'The practice is in %s — floor, intercom, parking to mention?',
		'q.med_city_ask'      => 'How do people find the practice without the wrong door?',
		'q.med_rx'            => 'Prescription, certificate, diagnosis by message: do I refuse, book a visit, something else?',
		'q.med_cancel'        => 'Cancellation or lateness: which rule can I cite, without inventing one?',
		'q.med_never'         => 'Medical advice, an unpublished fee, “come right now”: what must the bot never say?',
		'q.spin_act_read'     => 'I read the home page: “%s”. Is that the subject of a first conversation?',
		'q.spin_spoken'       => 'You said “%s”. Is that the frame of a first exchange?',
		'q.spin_act_ask'      => 'In one sentence, what problem should someone have for this to be you — not a walk-in shop?',
		'q.spin_who'          => 'Who writes most — owner, HR, private individual — and after which trigger?',
		'q.spin_book_read'    => 'A first exchange is “%s”?',
		'q.spin_book_ask'     => 'First exchange: call, form, diary slot — what do I point to?',
		'q.spin_city_read'    => 'You operate from %s — nationwide, or a tighter perimeter?',
		'q.spin_city_ask'     => 'Perimeter: local, national, international — what can I say without inflating it?',
		'q.spin_clarify'      => 'What should I clarify before offering a meeting (scope, timing, who decides)?',
		'q.spin_refuse'       => 'Which requests should I politely decline, because this is not you?',
		'q.spin_never'        => 'Price, promised result, “we handle everything”: what must the bot never say?',
	);

	$de = $en;
	$de['widget.placeholder']   = 'Schreiben Sie Ihre Nachricht…';
	$de['widget.send']          = 'Senden';
	$de['widget.close']         = 'Schließen';
	$de['widget.open']          = 'Gespräch öffnen';
	$de['widget.contactHint']   = 'Sie können einen Namen, eine E-Mail oder eine Telefonnummer hinterlassen.';
	$de['widget.contactToggle'] = 'Kontakt hinterlassen';
	$de['widget.name']          = 'Name';
	$de['widget.email']         = 'E-Mail';
	$de['widget.phone']         = 'Telefon';
	$de['widget.scanning']      = 'Ich lese Ihre Website.';
	$de['widget.scanningShort'] = 'Ich lese Ihre Website…';
	$de['widget.poweredBy']     = 'Bereitgestellt von talker.now';
	$de['default.invite_2']     = 'Eine Frage stellen';
	$de['default.invite_3']     = 'Termin vereinbaren';
	$de['default.greeting']     = 'Guten Tag. Wie kann ich Ihnen helfen?';
	$de['admin.hello_chip']     = 'Guten Tag, sehen Sie mich? Ich bin da — klicken Sie mich.';
	$de['visitor.stub_thanks']  = 'Danke. Wir melden uns bei Ihnen.';
	$de['visitor.stub_message'] = 'Verstanden. Hinterlassen Sie Name und E-Mail oder Telefon, wir melden uns.';
	$de['visitor.stub_empty']   = 'Hinterlassen Sie Ihren Namen und einen Weg, Sie zu erreichen, wir melden uns.';
	$de['qcm.city_prefix']      = ' in %s';
	$de['qcm.escape']           = ' Wenn Sie das Plugin für sie installieren, sagen Sie „ich installiere für jemand anderen“.';
	$de['qcm.confirm_one']      = 'Sie sind %1$s%2$s%3$s — richtig?';
	$de['qcm.confirm_many']     = 'Ich sehe %s — sind Sie das, oder jemand anderes?';
	$de['qcm.and']              = ' und ';
	$de['qcm.this_activity']    = 'dieses Unternehmen';
	$de['qcm.confirm_org']      = 'Sprechen Sie für %1$s%2$s, oder installieren Sie das Plugin für sie?';
	$de['qcm.frame_1']          = 'Die Website sagt zu wenig. Sprechen Sie für %1$s%2$s, oder installieren Sie das Plugin für jemand anderen? Wenn Sie für jemand anderen installieren, sagen Sie „ich installiere für jemand anderen“.';
	$de['qcm.frame_2']          = 'Warum rufen oder schreiben die Leute zuerst?';
	$de['qcm.frame_3']          = 'Was darf der Bot nie sagen oder versprechen — in ihrem Namen, nicht in Ihrem, wenn Sie nicht der Inhaber sind?';
	$de['qcm.intro_thin']       = 'Ich habe Ihre Website gelesen: sie sagt zu wenig, um zu raten. Wir rahmen das in drei Fragen, dann erzeuge ich den Rest.';
	$de['qcm.intro_short']      = 'Ich habe Ihre Website gelesen.';
	$de['qcm.already_framed']   = 'Das Wesentliche ist schon gerahmt. Sagen Sie mir, wenn sich etwas geändert hat.';
	$de['qcm.intro_ready']      = 'Ich habe Ihre Website gelesen, wir können mit dem Fragebogen beginnen.';
	$de['qcm.noted_proxy']      = 'Notiert. Ich spreche als %s, nicht mit Ihrer Stimme.';
	$de['qcm.the_manager']      = 'der Inhaber';
	$de['qcm.noted_self']       = 'Notiert. Damit spreche ich auf der Website wie Sie.';
	$de['qcm.noted_changed']    = 'Notiert. Sagen Sie mir, wenn sich auf der Website etwas geändert hat.';
	$de['qcm.proxy_who']        = 'Wer ist der echte Inhaber — Name und E-Mail? Ich darf den Kundenprompt nicht mit Ihrer Stimme schreiben.';
	$de['qcm.reclass']          = 'Verstanden, ich liege falsch. Sind Sie eher: ein Ort mit Öffnungszeiten (Museum, Besuche), ein lokales Handwerk (Klempner, Notdienst…), eine Immobilienagentur, eine Arztpraxis oder Beratung / Begleitung?';
	$de['job.dentist']          = 'Zahnarzt';
	$de['job.realtor']          = 'Immobilienmakler';
	$de['label.dental']         = 'eine Zahnarztpraxis';
	$de['label.medical']        = 'eine Arztpraxis';
	$de['label.health']         = 'eine Gesundheitspraxis';

	$it = $en;
	$it['widget.placeholder']   = 'Scrivete il vostro messaggio…';
	$it['widget.send']          = 'Invia';
	$it['widget.close']         = 'Chiudi';
	$it['widget.open']          = 'Apri la conversazione';
	$it['widget.contactHint']   = 'Potete lasciare un nome, un’e-mail o un telefono.';
	$it['widget.contactToggle'] = 'Lasciare un contatto';
	$it['widget.name']          = 'Nome';
	$it['widget.email']         = 'E-mail';
	$it['widget.phone']         = 'Telefono';
	$it['widget.scanning']      = 'Sto leggendo il vostro sito.';
	$it['widget.scanningShort'] = 'Sto leggendo il vostro sito…';
	$it['widget.poweredBy']     = 'Offerto da talker.now';
	$it['default.invite_2']     = 'Fare una domanda';
	$it['default.invite_3']     = 'Prenotare un appuntamento';
	$it['default.greeting']     = 'Buongiorno. Come posso aiutarvi?';
	$it['admin.hello_chip']     = 'Buongiorno, mi vedete? Sono qui — cliccatemi.';
	$it['visitor.stub_thanks']  = 'Grazie. Vi ricontatteremo.';
	$it['visitor.stub_message'] = 'Ricevuto. Lasciate nome e un’e-mail o un telefono, vi ricontatteremo.';
	$it['visitor.stub_empty']   = 'Lasciate il nome e un modo per raggiungervi, vi ricontatteremo.';
	$it['qcm.city_prefix']      = ' a %s';
	$it['qcm.escape']           = ' Se installate il plugin per loro, dite « installo per qualcun altro ».';
	$it['qcm.confirm_one']      = 'Siete %1$s%2$s%3$s, vero?';
	$it['qcm.confirm_many']     = 'Vedo %s — siete voi, o qualcun altro?';
	$it['qcm.and']              = ' e ';
	$it['qcm.this_activity']    = 'questa attività';
	$it['qcm.confirm_org']      = 'Parlate per %1$s%2$s, o installate il plugin per loro?';
	$it['qcm.frame_1']          = 'Il sito dice troppo poco. Parlate per %1$s%2$s, o installate il plugin per qualcun altro? Se installate per qualcun altro, dite « installo per qualcun altro ».';
	$it['qcm.frame_2']          = 'Perché le persone chiamano o scrivono, per prima cosa?';
	$it['qcm.frame_3']          = 'Cosa non deve mai dire o promettere il bot — a nome loro, non vostro se non siete il titolare?';
	$it['qcm.intro_thin']       = 'Ho letto il sito: dice troppo poco per indovinare. Inquadriamo in tre domande, poi genero il resto.';
	$it['qcm.intro_short']      = 'Ho letto il vostro sito.';
	$it['qcm.already_framed']   = 'Abbiamo già inquadrato l’essenziale. Ditemi se qualcosa è cambiato.';
	$it['qcm.intro_ready']      = 'Ho letto il vostro sito, possiamo iniziare il questionario.';
	$it['qcm.noted_proxy']      = 'Annotato. Parlerò come %s, non con la vostra voce.';
	$it['qcm.the_manager']      = 'il titolare';
	$it['qcm.noted_self']       = 'Annotato. Me ne servirò per parlare come voi sul sito.';
	$it['qcm.noted_changed']    = 'Annotato. Ditemi se qualcosa è cambiato sul sito.';
	$it['qcm.proxy_who']        = 'Chi è il vero titolare — nome e e-mail? Non devo scrivere il prompt del cliente con la vostra voce.';
	$it['qcm.reclass']          = 'D’accordo, sbaglio. Siete piuttosto: un luogo con orari (museo, visite), un artigiano locale (idraulico, interventi…), un’agenzia immobiliare, uno studio medico, o un accompagnamento / consulenza?';
	$it['job.dentist']          = 'dentista';
	$it['job.realtor']          = 'agente immobiliare';
	$it['label.dental']         = 'uno studio dentistico';
	$it['label.medical']        = 'uno studio medico';
	$it['label.health']         = 'uno studio sanitario';

	$es = $en;
	$es['widget.placeholder']   = 'Escriba su mensaje…';
	$es['widget.send']          = 'Enviar';
	$es['widget.close']         = 'Cerrar';
	$es['widget.open']          = 'Abrir la conversación';
	$es['widget.contactHint']   = 'Puede dejar un nombre, un correo o un teléfono.';
	$es['widget.contactToggle'] = 'Dejar un contacto';
	$es['widget.name']          = 'Nombre';
	$es['widget.email']         = 'Correo';
	$es['widget.phone']         = 'Teléfono';
	$es['widget.scanning']      = 'Estoy leyendo su web.';
	$es['widget.scanningShort'] = 'Estoy leyendo su web…';
	$es['widget.poweredBy']     = 'Con tecnología de talker.now';
	$es['default.invite_2']     = 'Hacer una pregunta';
	$es['default.invite_3']     = 'Pedir cita';
	$es['default.greeting']     = 'Hola. ¿En qué puedo ayudarle?';
	$es['admin.hello_chip']     = 'Hola, ¿me ve? Estoy aquí — púlseme.';
	$es['visitor.stub_thanks']  = 'Gracias. Le contactaremos.';
	$es['visitor.stub_message'] = 'Recibido. Deje su nombre y un correo o teléfono, le contactaremos.';
	$es['visitor.stub_empty']   = 'Deje su nombre y una forma de localizarle, le contactaremos.';
	$es['qcm.city_prefix']      = ' en %s';
	$es['qcm.escape']           = ' Si instala el plugin para ellos, diga « instalo para otra persona ».';
	$es['qcm.confirm_one']      = 'Usted es %1$s%2$s%3$s, ¿verdad?';
	$es['qcm.confirm_many']     = 'Veo %s — ¿es usted, u otra persona?';
	$es['qcm.and']              = ' y ';
	$es['qcm.this_activity']    = 'esta actividad';
	$es['qcm.confirm_org']      = '¿Habla por %1$s%2$s, o instala el plugin para ellos?';
	$es['qcm.frame_1']          = 'El sitio dice demasiado poco. ¿Habla por %1$s%2$s, o instala el plugin para otra persona? Si instala para otra persona, diga « instalo para otra persona ».';
	$es['qcm.frame_2']          = '¿Por qué llaman o escriben la gente, en primer lugar?';
	$es['qcm.frame_3']          = '¿Qué no debe decir ni prometer nunca el bot — en su nombre, no en el suyo si usted no es el titular?';
	$es['qcm.intro_thin']       = 'He leído su web: dice demasiado poco para adivinar. Lo encuadramos en tres preguntas y luego genero el resto.';
	$es['qcm.intro_short']      = 'He leído su web.';
	$es['qcm.already_framed']   = 'Ya encuadramos lo esencial. Dígame si algo ha cambiado.';
	$es['qcm.intro_ready']      = 'He leído su web, podemos empezar el cuestionario.';
	$es['qcm.noted_proxy']      = 'Anotado. Hablaré como %s, no con su voz.';
	$es['qcm.the_manager']      = 'el titular';
	$es['qcm.noted_self']       = 'Anotado. Lo usaré para hablar como usted en el sitio.';
	$es['qcm.noted_changed']    = 'Anotado. Dígame si algo ha cambiado en el sitio.';
	$es['qcm.proxy_who']        = '¿Quién es el titular real — nombre y correo? No debo escribir el prompt del cliente con su voz.';
	$es['qcm.reclass']          = 'De acuerdo, me equivoco. ¿Es más bien: un lugar con horarios (museo, visitas), un oficio local (fontanero, urgencias…), una inmobiliaria, una consulta médica, o un acompañamiento / asesoría?';
	$es['job.dentist']          = 'dentista';
	$es['job.realtor']          = 'agente inmobiliario';
	$es['label.dental']         = 'una clínica dental';
	$es['label.medical']        = 'una consulta médica';
	$es['label.health']         = 'una consulta de salud';

	$nl = $en;
	$nl['widget.placeholder']   = 'Schrijf uw bericht…';
	$nl['widget.send']          = 'Verzenden';
	$nl['widget.close']         = 'Sluiten';
	$nl['widget.open']          = 'Het gesprek openen';
	$nl['widget.contactHint']   = 'U kunt een naam, e-mail of telefoonnummer achterlaten.';
	$nl['widget.contactToggle'] = 'Een contact nalaten';
	$nl['widget.name']          = 'Naam';
	$nl['widget.email']         = 'E-mail';
	$nl['widget.phone']         = 'Telefoon';
	$nl['widget.scanning']      = 'Ik lees uw site.';
	$nl['widget.scanningShort'] = 'Ik lees uw site…';
	$nl['widget.poweredBy']     = 'Aangedreven door talker.now';
	$nl['default.invite_2']     = 'Een vraag stellen';
	$nl['default.invite_3']     = 'Een afspraak maken';
	$nl['default.greeting']     = 'Goedendag. Hoe kan ik u helpen?';
	$nl['admin.hello_chip']     = 'Goedendag, ziet u me? Ik ben hier — klik me.';
	$nl['visitor.stub_thanks']  = 'Dank u. We nemen contact op.';
	$nl['visitor.stub_message'] = 'Begrepen. Laat uw naam en een e-mail of telefoon na, we nemen contact op.';
	$nl['visitor.stub_empty']   = 'Laat uw naam en een manier om u te bereiken na, we nemen contact op.';
	$nl['qcm.city_prefix']      = ' in %s';
	$nl['qcm.escape']           = ' Als u de plugin voor hen installeert, zeg « ik installeer voor iemand anders ».';
	$nl['qcm.confirm_one']      = 'U bent %1$s%2$s%3$s, klopt dat?';
	$nl['qcm.confirm_many']     = 'Ik zie %s — bent u dat, of iemand anders?';
	$nl['qcm.and']              = ' en ';
	$nl['qcm.this_activity']    = 'deze activiteit';
	$nl['qcm.confirm_org']      = 'Spreekt u voor %1$s%2$s, of installeert u de plugin voor hen?';
	$nl['qcm.frame_1']          = 'De site zegt te weinig. Spreekt u voor %1$s%2$s, of installeert u de plugin voor iemand anders? Als u voor iemand anders installeert, zeg « ik installeer voor iemand anders ».';
	$nl['qcm.frame_2']          = 'Waarom bellen of schrijven mensen, in de eerste plaats?';
	$nl['qcm.frame_3']          = 'Wat mag de bot nooit zeggen of beloven — in hun naam, niet in de uwe als u niet de zaakvoerder bent?';
	$nl['qcm.intro_thin']       = 'Ik heb uw site gelezen: hij zegt te weinig om te gissen. We kaderen in drie vragen, daarna genereer ik de rest.';
	$nl['qcm.intro_short']      = 'Ik heb uw site gelezen.';
	$nl['qcm.already_framed']   = 'Het essentiële is al gekaderd. Zeg me als er iets veranderd is.';
	$nl['qcm.intro_ready']      = 'Ik heb uw site gelezen, we kunnen de vragenlijst starten.';
	$nl['qcm.noted_proxy']      = 'Genoteerd. Ik spreek als %s, niet met uw stem.';
	$nl['qcm.the_manager']      = 'de zaakvoerder';
	$nl['qcm.noted_self']       = 'Genoteerd. Daarmee spreek ik op de site zoals u.';
	$nl['qcm.noted_changed']    = 'Genoteerd. Zeg me als er iets veranderd is op de site.';
	$nl['qcm.proxy_who']        = 'Wie is de echte zaakvoerder — naam en e-mail? Ik mag de klantprompt niet met uw stem schrijven.';
	$nl['qcm.reclass']          = 'Akkoord, ik zit ernaast. Bent u eerder: een plek met openingsuren (museum, bezoeken), een lokale vakman (loodgieter, interventies…), een immokantoor, een medische praktijk, of begeleiding / advies?';
	$nl['job.dentist']          = 'tandarts';
	$nl['job.realtor']          = 'vastgoedmakelaar';
	$nl['label.dental']         = 'een tandartspraktijk';
	$nl['label.medical']        = 'een medische praktijk';
	$nl['label.health']         = 'een gezondheidspraktijk';

	$pl = $en;
	$pl['widget.placeholder']   = 'Napiszcie wiadomość…';
	$pl['widget.send']          = 'Wyślij';
	$pl['widget.close']         = 'Zamknij';
	$pl['widget.open']          = 'Otwórz rozmowę';
	$pl['widget.contactHint']   = 'Możecie zostawić imię, e-mail lub telefon.';
	$pl['widget.contactToggle'] = 'Zostawić kontakt';
	$pl['widget.name']          = 'Imię';
	$pl['widget.email']         = 'E-mail';
	$pl['widget.phone']         = 'Telefon';
	$pl['widget.scanning']      = 'Czytam waszą stronę.';
	$pl['widget.scanningShort'] = 'Czytam waszą stronę…';
	$pl['widget.poweredBy']     = 'Napędzane przez talker.now';
	$pl['default.invite_2']     = 'Zadać pytanie';
	$pl['default.invite_3']     = 'Umówić wizytę';
	$pl['default.greeting']     = 'Dzień dobry. W czym mogę pomóc?';
	$pl['admin.hello_chip']     = 'Dzień dobry, widzicie mnie? Jestem tu — kliknijcie mnie.';
	$pl['visitor.stub_thanks']  = 'Dziękujemy. Odezwiemy się.';
	$pl['visitor.stub_message'] = 'Przyjęte. Zostawcie imię i e-mail albo telefon, odezwiemy się.';
	$pl['visitor.stub_empty']   = 'Zostawcie imię i sposób kontaktu, odezwiemy się.';
	$pl['qcm.city_prefix']      = ' w %s';
	$pl['qcm.escape']           = ' Jeśli instalujecie wtyczkę dla nich, napiszcie « instaluję dla kogoś innego ».';
	$pl['qcm.confirm_one']      = 'To pan/pani %1$s%2$s%3$s, zgadza się?';
	$pl['qcm.confirm_many']     = 'Widzę %s — to państwo, czy ktoś inny?';
	$pl['qcm.and']              = ' i ';
	$pl['qcm.this_activity']    = 'ta działalność';
	$pl['qcm.confirm_org']      = 'Mówicie w imieniu %1$s%2$s, czy instalujecie wtyczkę dla nich?';
	$pl['qcm.frame_1']          = 'Strona mówi za mało. Mówicie w imieniu %1$s%2$s, czy instalujecie wtyczkę dla kogoś innego? Jeśli instalujecie dla kogoś innego, napiszcie « instaluję dla kogoś innego ».';
	$pl['qcm.frame_2']          = 'Dlaczego ludzie dzwonią albo piszą, przede wszystkim?';
	$pl['qcm.frame_3']          = 'Czego bot nigdy nie może powiedzieć ani obiecać — w ich imieniu, nie w waszym, jeśli nie jesteście właścicielem?';
	$pl['qcm.intro_thin']       = 'Przeczytałem stronę: mówi za mało, by zgadywać. Ujmiemy to w trzech pytaniach, potem wygeneruję resztę.';
	$pl['qcm.intro_short']      = 'Przeczytałem waszą stronę.';
	$pl['qcm.already_framed']   = 'Najważniejsze już ujęte. Napiszcie, jeśli coś się zmieniło.';
	$pl['qcm.intro_ready']      = 'Przeczytałem waszą stronę, możemy zacząć kwestionariusz.';
	$pl['qcm.noted_proxy']      = 'Zapisane. Będę mówił jak %s, nie waszym głosem.';
	$pl['qcm.the_manager']      = 'właściciel';
	$pl['qcm.noted_self']       = 'Zapisane. Użyję tego, by mówić jak wy na stronie.';
	$pl['qcm.noted_changed']    = 'Zapisane. Napiszcie, jeśli coś zmieniło się na stronie.';
	$pl['qcm.proxy_who']        = 'Kto jest prawdziwym właścicielem — imię i e-mail? Nie mogę pisać promptu klienta waszym głosem.';
	$pl['qcm.reclass']          = 'Rozumiem, mylę się. Jesteście raczej: miejscem z godzinami (muzeum, zwiedzanie), lokalnym rzemiosłem (hydraulik, interwencje…), agencją nieruchomości, gabinetem medycznym, czy doradztwem / wsparciem?';
	$pl['job.dentist']          = 'dentysta';
	$pl['job.realtor']          = 'agent nieruchomości';
	$pl['label.dental']         = 'gabinet stomatologiczny';
	$pl['label.medical']        = 'gabinet lekarski';
	$pl['label.health']         = 'gabinet zdrowia';

	$packs = array(
		'fr' => $fr,
		'en' => $en,
		'de' => $de,
		'it' => $it,
		'es' => $es,
		'nl' => $nl,
		'pl' => $pl,
	);
	return $packs;
}
