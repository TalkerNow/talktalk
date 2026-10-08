import { faqPageJsonLd, type FaqItem } from "./faq-jsonld";

export const RATES_AS_OF = "Tarifs relevés le 08/10/2026";

export const ALTERNATIVE_ILLUSTRATION = {
  src: "/visuels/talker-23h47-paysage-1200x630.png",
  width: 1200,
  height: 630,
  alt: "Illustration produit : Talker répond à 23 h 47 à un visiteur, conversation fictive",
  caption: "Illustration produit · conversation fictive",
} as const;

export type AlternativeId =
  | "tidio"
  | "crisp"
  | "chatbase"
  | "tawkto"
  | "smartsupp"
  | "livechat"
  | "botpress"
  | "aiengine";

export type ComparisonRow = {
  label: string;
  talker: string;
  other: string;
};

export type AlternativePage = {
  id: AlternativeId;
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  otherName: string;
  shortAnswer: string;
  tableTitle: string;
  rows: ComparisonRow[];
  whenOtherTitle: string;
  whenOther: string[];
  whenTalkerTitle: string;
  whenTalker: string[];
  faq: FaqItem[];
  sources: { href: string; label: string }[];
  sourceNote: string;
};

const sharedAlso = {
  tarifs: { href: "/tarifs", label: "Tarifs" },
  comparatif: {
    href: "/comparatif-talker-live-chat",
    label: "Talker et le chat live",
  },
  faq: { href: "/faq", label: "FAQ" },
  installer: { href: "/installer", label: "Installer" },
} as const;

export const alternatives: readonly AlternativePage[] = [
  {
    id: "tidio",
    slug: "alternative-tidio-wordpress",
    path: "/alternative-tidio-wordpress",
    metaTitle: "Alternative à Tidio pour WordPress — Talker",
    metaDescription:
      "Talker répond seul aux visiteurs de votre site WordPress : zip, aucun réglage, conversations par e-mail. Faits et tarifs comparés avec Tidio.",
    h1: "Une alternative à Tidio pour WordPress",
    otherName: "Tidio",
    shortAnswer:
      "Si vous voulez un agent IA qui répond seul aux visiteurs de votre site WordPress, sans équipe pour tenir un chat en direct, Talker est une alternative à Tidio. Talker s'installe avec un fichier zip, lit les pages publiques de votre site et vous envoie les conversations par e-mail. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. Tidio convient mieux si votre équipe veut répondre elle-même en direct, ou gérer plusieurs canaux de messagerie au même endroit.",
    tableTitle: "Talker et Tidio en bref",
    rows: [
      {
        label: "Ce que c'est",
        talker:
          "Un plugin WordPress : un agent IA qui répond seul sur votre site.",
        other:
          "Une plateforme de service client : chat en direct, agent IA Lyro, automatisations Flows.",
      },
      {
        label: "Qui répond",
        talker: "L'agent IA. Personne ne répond en direct derrière la bulle.",
        other: "Votre équipe en direct, et/ou l'agent IA Lyro.",
      },
      {
        label: "Installation",
        talker: "Fichier zip, puis « Activer ». Aucun réglage obligatoire.",
        other: "Plugin Tidio relié à un compte Tidio.",
      },
      {
        label: "Pour démarrer",
        talker:
          "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
        other:
          "Plan gratuit : 50 conversations où un humain répond. Lyro : 50 conversations IA au départ, rechargées chaque mois seulement avec l'offre Lyro. Essai 7 jours sans carte.",
      },
      {
        label: "Premier plan payant",
        talker:
          "Pro : 29 €/mois en annuel (35 € au mois), 1 site, conversations illimitées.",
        other:
          "Starter : 24,17 $/mois (100 conversations où un humain répond). L'agent IA Lyro est en plus, à partir de 32,50 $/mois.",
      },
      {
        label: "Retirer la marque",
        talker:
          "Le plan gratuit affiche « Propulsé par Talker » (lien vers talker.now). La mention disparaît dès Pro.",
        other:
          "Option à 16,67 $/mois sur Growth (à partir de 49,17 $/mois), incluse sur Plus (à partir de 300 $/mois).",
      },
      {
        label: "Plusieurs sites",
        talker:
          "Pro 3 : 49 €/mois, 3 sites. Pro Max : 99 €/mois, 10 sites (en annuel). Un agent par site.",
        other:
          "Possible, mais le widget garde les mêmes réglages (couleurs, horaires, messages) sur tous les sites.",
      },
      {
        label: "Où arrivent les conversations",
        talker:
          "Par e-mail toutes les 4 heures (rien s'il n'y en a pas), et dans votre espace client Talker.",
        other: "Dans l'interface Tidio.",
      },
    ],
    whenOtherTitle: "Quand choisir Tidio",
    whenOther: [
      "Votre équipe veut répondre elle-même, en direct, dans une fenêtre de chat.",
      "Vous voulez gérer aussi l'e-mail et les réseaux sociaux dans le même outil.",
    ],
    whenTalkerTitle: "Quand choisir Talker",
    whenTalker: [
      "Personne n'est disponible pour tenir un chat, surtout le soir et le week-end.",
      "Vous voulez un agent qui pose les bonnes questions sur votre métier et garde le contact du visiteur.",
      "Vous installez des sites pour des clients et voulez la marque blanche sans palier cher.",
    ],
    faq: [
      {
        q: "Talker est-il un chat en direct comme Tidio ?",
        a: "Non. Talker est un agent IA : il répond seul. Personne de votre équipe ne répond en direct dans la bulle.",
      },
      {
        q: "Combien coûte Talker par rapport à Tidio ?",
        a: "Le plan gratuit de Talker, c'est 100 conversations par mois et par site, sans carte, sans limite de durée. Une conversation, c'est un visiteur qui discute (une session). Au-delà, passez à un plan payant ou attendez le mois suivant. Pro coûte 29 € par mois en annuel pour 1 site, conversations illimitées. Pro 3 : 49 € pour 3 sites. Pro Max : 99 € pour 10 sites (en annuel). Chez Tidio, Starter est à 24,17 $ par mois et l'agent IA Lyro s'ajoute à partir de 32,50 $ par mois (tarifs relevés le 08/10/2026).",
      },
      {
        q: "Faut-il régler quelque chose à l'installation ?",
        a: "Non. Vous déposez le zip dans WordPress et vous l'activez. Talker lit ensuite les pages publiques du site.",
      },
      {
        q: "Talker fonctionne-t-il sans WordPress ?",
        a: "Non. Talker est un plugin WordPress.",
      },
    ],
    sources: [{ href: "https://www.tidio.com/pricing/", label: "https://www.tidio.com/pricing/" }],
    sourceNote:
      "Tarifs relevés le 08/10/2026 sur la page officielle de Tidio. Prix en dollars US tels qu'affichés (offre annuelle).",
  },
  {
    id: "crisp",
    slug: "alternative-crisp-wordpress",
    path: "/alternative-crisp-wordpress",
    metaTitle: "Alternative à Crisp pour WordPress — Talker",
    metaDescription:
      "Un agent IA qui répond seul sur votre site WordPress, marque blanche dès 29 €/mois. Faits et tarifs comparés avec Crisp.",
    h1: "Une alternative à Crisp pour WordPress",
    otherName: "Crisp",
    shortAnswer:
      "Si vous cherchez un agent IA qui répond seul aux visiteurs de votre site WordPress, Talker est une alternative à Crisp. Talker s'installe avec un fichier zip, sans réglage, et vous envoie les conversations par e-mail. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée ; il affiche « Propulsé par Talker » (lien vers talker.now). La marque blanche arrive dès le premier plan payant. Crisp convient mieux si votre équipe répond en direct sur plusieurs canaux et a besoin d'une boîte de réception partagée.",
    tableTitle: "Talker et Crisp en bref",
    rows: [
      {
        label: "Ce que c'est",
        talker:
          "Un plugin WordPress : un agent IA qui répond seul sur votre site.",
        other:
          "Une boîte de réception partagée pour le service client : chat du site, e-mail, réseaux sociaux, agent IA.",
      },
      {
        label: "Qui répond",
        talker: "L'agent IA. Personne ne répond en direct derrière la bulle.",
        other: "Votre équipe, et l'agent IA selon le plan.",
      },
      {
        label: "Pour démarrer",
        talker:
          "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
        other: "Plan gratuit : chat du site, 2 sièges, aucun crédit IA.",
      },
      {
        label: "IA incluse",
        talker: "Dès le départ.",
        other:
          "À partir de Mini (45 $/mois) : environ 90 conversations automatisées par mois.",
      },
      {
        label: "Marque blanche",
        talker:
          "Le plan gratuit affiche « Propulsé par Talker » (lien vers talker.now). Marque blanche dès Pro : 29 €/mois en annuel.",
        other: "Plan Plus : 295 $/mois. Retire la mention « We run on Crisp ».",
      },
      {
        label: "Plusieurs sites",
        talker: "Pro 3 : 49 €/mois, 3 sites. Pro Max : 99 €/mois, 10 sites (en annuel).",
        other:
          "Tarif par workspace. 20 % de remise pour 3 workspaces supplémentaires (Essentials et Plus).",
      },
      {
        label: "Où arrivent les conversations",
        talker:
          "Par e-mail toutes les 4 heures (rien s'il n'y en a pas), et dans votre espace client Talker.",
        other: "Dans la boîte de réception Crisp (web et applications).",
      },
    ],
    whenOtherTitle: "Quand choisir Crisp",
    whenOther: [
      "Votre équipe répond en direct et veut tout centraliser : chat, e-mail, WhatsApp, Instagram.",
      "Vous avez besoin d'outils d'équipe : attribution, notes internes, base d'aide.",
    ],
    whenTalkerTitle: "Quand choisir Talker",
    whenTalker: [
      "Personne n'est disponible pour tenir un chat.",
      "Vous voulez un agent qui connaît votre métier et garde le contact du visiteur, sans rien configurer.",
      "Vous êtes une agence : marque blanche dès Pro (29 €, 1 site), Pro 3 (49 €, 3 sites) ou Pro Max (99 €, 10 sites).",
    ],
    faq: [
      {
        q: "Talker remplace-t-il la boîte de réception de Crisp ?",
        a: "Non. Talker ne gère pas l'e-mail ni les réseaux sociaux. Il répond sur votre site WordPress et vous envoie les conversations.",
      },
      {
        q: "Où commence la marque blanche ?",
        a: "Chez Talker, dès Pro (29 € par mois en annuel, 1 site), ainsi que sur Pro 3 et Pro Max. Chez Crisp, sur le plan Plus (295 $ par mois, tarif relevé le 08/10/2026).",
      },
      {
        q: "Le plan gratuit de Crisp inclut-il l'IA ?",
        a: "Non. Le plan gratuit de Crisp n'inclut aucun crédit IA (page tarifs relevée le 08/10/2026). Talker offre 100 conversations IA par mois et par site, gratuites, sans carte, sans limite de durée.",
      },
      {
        q: "Talker fonctionne-t-il sans WordPress ?",
        a: "Non. Talker est un plugin WordPress.",
      },
    ],
    sources: [{ href: "https://crisp.chat/en/pricing/", label: "https://crisp.chat/en/pricing/" }],
    sourceNote:
      "Tarifs relevés le 08/10/2026 sur la page officielle de Crisp. Prix en dollars US tels qu'affichés, hors TVA.",
  },
  {
    id: "chatbase",
    slug: "alternative-chatbase-wordpress",
    path: "/alternative-chatbase-wordpress",
    metaTitle: "Alternative à Chatbase pour WordPress — Talker",
    metaDescription:
      "Talker : un plugin zip qui lit votre site WordPress, sans compte à configurer. Faits et tarifs comparés avec Chatbase.",
    h1: "Une alternative à Chatbase pour WordPress",
    otherName: "Chatbase",
    shortAnswer:
      "Si vous voulez un agent IA sur votre site WordPress sans créer ni entraîner un agent dans un autre outil, Talker est une alternative à Chatbase. Talker s'installe avec un fichier zip, lit les pages publiques de votre site et pose des questions adaptées à votre métier. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. Chatbase convient mieux si vous devez nourrir l'agent avec des documents internes ou le brancher sur d'autres canaux.",
    tableTitle: "Talker et Chatbase en bref",
    rows: [
      {
        label: "Ce que c'est",
        talker:
          "Un plugin WordPress : un agent IA qui répond seul sur votre site.",
        other:
          "Une plateforme pour créer des agents IA, à placer sur un site ou d'autres canaux.",
      },
      {
        label: "Installation sur WordPress",
        talker: "Fichier zip, puis « Activer ». Aucun réglage obligatoire.",
        other:
          "Créer et configurer l'agent sur Chatbase, puis installer le plugin Chatbase et coller l'« Agent ID ».",
      },
      {
        label: "D'où viennent les réponses",
        talker: "Des pages publiques de votre site. Pas d'envoi de fichiers.",
        other: "Des sources que vous ajoutez (site, documents…).",
      },
      {
        label: "Pour démarrer",
        talker:
          "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
        other:
          "50 crédits de message par mois. Les agents du plan gratuit sont supprimés après 14 jours d'inactivité.",
      },
      {
        label: "Comptage",
        talker: "En conversations. Illimitées sur les plans payants.",
        other:
          "En crédits de message : 700 (Hobby, 40 $/mois), 4 000 (Standard, 150 $/mois), 15 000 (Pro, 500 $/mois).",
      },
      {
        label: "Retirer la marque",
        talker:
          "Le plan gratuit affiche « Propulsé par Talker » (lien vers talker.now). La mention disparaît dès Pro : 29 €/mois en annuel.",
        other:
          "Option « Remove Powered By Chatbase » à 99 $/mois. Marque blanche complète en Enterprise, sur devis.",
      },
      {
        label: "Plusieurs sites",
        talker: "Pro 3 : 49 €/mois, 3 sites. Pro Max : 99 €/mois, 10 sites (en annuel).",
        other: "Selon le plan et les agents ajoutés.",
      },
    ],
    whenOtherTitle: "Quand choisir Chatbase",
    whenOther: [
      "L'agent doit répondre à partir de documents internes (PDF, base d'aide…).",
      "Vous voulez le même agent sur WhatsApp, Messenger, le téléphone ou Slack.",
    ],
    whenTalkerTitle: "Quand choisir Talker",
    whenTalker: [
      "Vous voulez un agent en place en quelques minutes, sans rien entraîner.",
      "Votre site WordPress contient déjà ce qu'il faut savoir.",
      "Vous installez des sites pour des clients et voulez la marque blanche incluse.",
    ],
    faq: [
      {
        q: "Faut-il entraîner Talker comme un agent Chatbase ?",
        a: "Non. Talker lit les pages publiques de votre site après l'activation, puis vous pose quelques questions sur votre métier dans WordPress.",
      },
      {
        q: "Peut-on envoyer des PDF à Talker ?",
        a: "Non. Talker n'utilise pas de fichiers : il s'appuie sur les pages publiques de votre site.",
      },
      {
        q: "Combien coûte la marque blanche ?",
        a: "Chez Talker, elle est incluse dès Pro (29 € par mois en annuel, 1 site), ainsi que sur Pro 3 et Pro Max. Chez Chatbase, retirer « Powered by Chatbase » est une option à 99 $ par mois, et la marque blanche complète est en Enterprise (tarifs relevés le 08/10/2026).",
      },
      {
        q: "Talker fonctionne-t-il sans WordPress ?",
        a: "Non. Talker est un plugin WordPress.",
      },
    ],
    sources: [
      { href: "https://www.chatbase.co/pricing", label: "https://www.chatbase.co/pricing" },
      {
        href: "https://www.chatbase.co/docs/user-guides/integrations/wordpress",
        label: "https://www.chatbase.co/docs/user-guides/integrations/wordpress",
      },
    ],
    sourceNote:
      "Tarifs relevés le 08/10/2026 sur la page officielle de Chatbase. Prix mensuels en dollars US tels qu'affichés.",
  },
  {
    id: "tawkto",
    slug: "alternative-tawk-to-wordpress",
    path: "/alternative-tawk-to-wordpress",
    metaTitle: "Alternative à tawk.to pour WordPress — Talker",
    metaDescription:
      "Un agent qui répond seul sur votre site WordPress, à partir des pages publiques. Faits et tarifs comparés avec tawk.to.",
    h1: "Une alternative à tawk.to pour WordPress",
    otherName: "tawk.to",
    shortAnswer:
      "Si vous voulez un agent IA qui répond seul aux visiteurs de votre site WordPress, sans équipe pour tenir un chat en direct, Talker est une alternative à tawk.to. Talker s'installe avec un fichier zip, lit les pages publiques de votre site et vous envoie les conversations par e-mail. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. tawk.to convient mieux si votre équipe veut répondre elle-même : le chat en direct est gratuit, et des agents humains peuvent répondre à votre place pour 1 $ de l'heure.",
    tableTitle: "Talker et tawk.to en bref",
    rows: [
      {
        label: "Ce que c'est",
        talker:
          "Un plugin WordPress : un agent IA qui répond seul sur votre site.",
        other:
          "Un chat en direct. L'agent IA (AI Assist) et le retrait de la marque sont des options.",
      },
      {
        label: "Qui répond",
        talker: "L'agent IA. Personne ne répond en direct derrière la bulle.",
        other:
          "Votre équipe en direct. AI Assist traite les questions courantes et passe la main à un humain. Vous pouvez aussi engager des agents.",
      },
      {
        label: "Installation",
        talker: "Fichier zip, puis « Activer ». Aucun réglage obligatoire.",
        other:
          "Installeur en un clic pour WordPress, ou un extrait à coller. Sans carte, sans frais d'installation, sans essai limité à 14 jours.",
      },
      {
        label: "D'où viennent les réponses",
        talker: "Des pages publiques de votre site. Pas d'envoi de fichiers.",
        other:
          "AI Assist répond à partir de la base de connaissances et de raccourcis FAQ.",
      },
      {
        label: "Pour démarrer",
        talker:
          "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
        other:
          "Le chat en direct est gratuit, sans carte. AI Assist a un plan gratuit pour un volume limité, puis à partir de 29 $/mois.",
      },
      {
        label: "Retirer la marque",
        talker:
          "Le plan gratuit affiche « Propulsé par Talker » (lien vers talker.now). La mention disparaît dès Pro : 29 €/mois en annuel, conversations illimitées, 1 site.",
        other:
          "Retirer « Powered by tawk.to » : 29 $/mois. Sans cette option, le chat en direct reste gratuit.",
      },
      {
        label: "Où arrivent les conversations",
        talker:
          "Par e-mail toutes les 4 heures (rien s'il n'y en a pas), et dans votre espace client Talker.",
        other: "Dans l'interface tawk.to.",
      },
    ],
    whenOtherTitle: "Quand choisir tawk.to",
    whenOther: [
      "Votre équipe veut répondre elle-même, dans un chat gratuit.",
      "Vous voulez des humains qui répondent à votre place, à 1 $ de l'heure.",
    ],
    whenTalkerTitle: "Quand choisir Talker",
    whenTalker: [
      "Personne n'est disponible pour tenir un chat, surtout le soir et le week-end.",
      "Vous voulez un agent qui lit les pages publiques du site, sans remplir une base de connaissances.",
      "Vous voulez la marque blanche et les conversations illimitées dès Pro (29 €/mois en annuel, 1 site), Pro 3 (49 €, 3 sites) ou Pro Max (99 €, 10 sites).",
    ],
    faq: [
      {
        q: "Talker est-il un chat en direct comme tawk.to ?",
        a: "Non. Talker est un agent IA : il répond seul. Personne de votre équipe ne répond en direct dans la bulle.",
      },
      {
        q: "Combien coûte l'agent IA ?",
        a: "Chez Talker, il est là dès le plan gratuit : 100 conversations par mois et par site, sans carte, sans limite de durée. Pro : 29 € par mois en annuel, 1 site, conversations illimitées, marque blanche. Pro 3 : 49 € pour 3 sites. Pro Max : 99 € pour 10 sites (en annuel). Chez tawk.to, le chat en direct est gratuit ; AI Assist part de 29 $ par mois, et retirer la marque coûte aussi 29 $ par mois (tarifs relevés le 08/10/2026).",
      },
      {
        q: "Faut-il remplir une base de connaissances ?",
        a: "Non pour Talker : il lit les pages publiques du site après l'activation. AI Assist, chez tawk.to, répond à partir de la base de connaissances et de raccourcis FAQ.",
      },
      {
        q: "Talker fonctionne-t-il sans WordPress ?",
        a: "Non. Talker est un plugin WordPress.",
      },
    ],
    sources: [
      { href: "https://www.tawk.to/pricing/", label: "https://www.tawk.to/pricing/" },
      { href: "https://www.tawk.to/features/", label: "https://www.tawk.to/features/" },
    ],
    sourceNote:
      "Tarifs relevés le 08/10/2026 sur les pages officielles de tawk.to. Prix en dollars US tels qu'affichés.",
  },
  {
    id: "smartsupp",
    slug: "alternative-smartsupp-wordpress",
    path: "/alternative-smartsupp-wordpress",
    metaTitle: "Alternative à Smartsupp pour WordPress — Talker",
    metaDescription:
      "Un agent qui répond seul sur votre site WordPress, marque blanche dès 29 €/mois. Faits et tarifs comparés avec Smartsupp.",
    h1: "Une alternative à Smartsupp pour WordPress",
    otherName: "Smartsupp",
    shortAnswer:
      "Si vous voulez un agent IA qui répond seul aux visiteurs de votre site WordPress, Talker est une alternative à Smartsupp. Talker s'installe avec un fichier zip, lit les pages publiques de votre site et vous envoie les conversations par e-mail. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. Smartsupp convient mieux si votre équipe veut répondre en direct : le plan gratuit inclut le chat du site, WhatsApp et Messenger, pour 25 conversations par mois.",
    tableTitle: "Talker et Smartsupp en bref",
    rows: [
      {
        label: "Ce que c'est",
        talker:
          "Un plugin WordPress : un agent IA qui répond seul sur votre site.",
        other:
          "Un chat en direct. L'agent autonome Mira est une option, à part des aides à la rédaction.",
      },
      {
        label: "Qui répond",
        talker: "L'agent IA. Personne ne répond en direct derrière la bulle.",
        other:
          "Votre équipe. L'aide à la rédaction ne parle que si un humain est en ligne. Mira peut répondre seule, puis passer la main.",
      },
      {
        label: "Installation",
        talker: "Fichier zip, puis « Activer ». Aucun réglage obligatoire.",
        other:
          "Intégration en un clic pour WordPress, WooCommerce ou PrestaShop.",
      },
      {
        label: "Pour démarrer",
        talker:
          "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
        other:
          "Plan gratuit : 0 €, 1 opérateur, 25 conversations par mois, historique de 14 jours. Mira à l'essai : 10 conversations, puis 25 après la mise en route, sans carte.",
      },
      {
        label: "Agent qui lit le site",
        talker:
          "Dès le départ, à partir des pages publiques du site. Conversations illimitées dès Pro : 29 €/mois en annuel, 1 site.",
        other:
          "Mira : 16 € (16 $) par mois en annuel pour 100 conversations, jusqu'à 5 000. 400 conversations : 64 $ par mois. Mira lit jusqu'à 20 pages du site.",
      },
      {
        label: "Chat avec une équipe",
        talker:
          "Pas de chat tenu par une équipe. Les conversations partent par e-mail.",
        other:
          "Solo : 14 € (17 $), 1 opérateur, conversations illimitées, 50 aides à la rédaction par mois. Un palier à 21 € (25 $) : 3 opérateurs et 250 aides. Un palier à 69 € (83 $) : 5 opérateurs et plus, 3 sites.",
      },
      {
        label: "Où arrivent les conversations",
        talker:
          "Par e-mail toutes les 4 heures (rien s'il n'y en a pas), et dans votre espace client Talker.",
        other: "Dans le tableau de bord Smartsupp.",
      },
    ],
    whenOtherTitle: "Quand choisir Smartsupp",
    whenOther: [
      "Votre équipe répond en direct, y compris sur WhatsApp et Messenger.",
      "Vous voulez une aide à la rédaction pendant qu'un humain est en ligne.",
    ],
    whenTalkerTitle: "Quand choisir Talker",
    whenTalker: [
      "Personne n'est disponible pour tenir un chat.",
      "Vous voulez un agent qui lit le site dès l'installation, pas une option à 16 € pour 100 conversations.",
      "Vous êtes une agence : marque blanche dès Pro (29 €, 1 site), Pro 3 (49 €, 3 sites) ou Pro Max (99 €, 10 sites).",
    ],
    faq: [
      {
        q: "Le plan gratuit de Smartsupp inclut-il un agent IA ?",
        a: "Le plan à 0 € compte 25 conversations de chat par mois, sans les aides à la rédaction. Mira s'essaie avec 10 conversations, puis 25 après la mise en route, sans carte. Talker offre 100 conversations IA par mois et par site, gratuites, sans carte, sans limite de durée (tarifs relevés le 08/10/2026).",
      },
      {
        q: "Combien coûte Mira par rapport à Talker ?",
        a: "Mira coûte 16 € (16 $) par mois en annuel pour 100 conversations, et 64 $ par mois pour 400 conversations. Pro, chez Talker, coûte 29 € par mois en annuel pour 1 site, conversations illimitées, marque blanche. Pro 3 : 49 € pour 3 sites. Pro Max : 99 € pour 10 sites (en annuel).",
      },
      {
        q: "D'où Mira tire-t-elle ses réponses ?",
        a: "La page tarifs indique que Mira lit jusqu'à 20 pages du site, et que vous pouvez ajouter des consignes ou des documents. Talker lit les pages publiques du site, sans envoi de fichiers.",
      },
      {
        q: "Talker fonctionne-t-il sans WordPress ?",
        a: "Non. Talker est un plugin WordPress.",
      },
    ],
    sources: [
      {
        href: "https://www.smartsupp.com/pricing/",
        label: "https://www.smartsupp.com/pricing/",
      },
    ],
    sourceNote:
      "Tarifs relevés le 08/10/2026 sur la page officielle de Smartsupp. Prix en euros et en dollars US tels qu'affichés.",
  },
  {
    id: "livechat",
    slug: "alternative-livechat-wordpress",
    path: "/alternative-livechat-wordpress",
    metaTitle: "Alternative à LiveChat pour WordPress — Talker",
    metaDescription:
      "Un agent qui répond seul sur votre site WordPress, sans prix par utilisateur. Faits et tarifs comparés avec LiveChat (Text).",
    h1: "Une alternative à LiveChat pour WordPress",
    otherName: "LiveChat",
    shortAnswer:
      "Si vous voulez un agent IA qui répond seul sur votre site WordPress, sans payer un siège par personne, Talker est une alternative à LiveChat. Les nouveaux essais sont les plans Text, sur la page tarifs de LiveChat ; les clients LiveChat déjà abonnés gardent leur plan. Talker s'installe avec un fichier zip, lit les pages publiques du site et vous envoie les conversations par e-mail. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. LiveChat convient mieux si une équipe répond en direct dans une boîte partagée.",
    tableTitle: "Talker et LiveChat en bref",
    rows: [
      {
        label: "Ce que c'est",
        talker:
          "Un plugin WordPress : un agent IA qui répond seul sur votre site.",
        other:
          "Text, le produit actuel pour les nouveaux essais : chat du site, boîte de réception et agent IA. Les abonnés LiveChat gardent leur plan.",
      },
      {
        label: "Qui répond",
        talker: "L'agent IA. Personne ne répond en direct derrière la bulle.",
        other: "Votre équipe, et un agent IA dans la limite des résolutions incluses.",
      },
      {
        label: "Installation",
        talker: "Fichier zip, puis « Activer ». Aucun réglage obligatoire.",
        other:
          "Quelques minutes : un extrait de code, ou un plugin pour WordPress, Shopify ou Webflow.",
      },
      {
        label: "Pour démarrer",
        talker:
          "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
        other: "Essai de 14 jours sur Essential ou Growth, sans carte.",
      },
      {
        label: "Premier plan payant",
        talker:
          "Pro : 29 €/mois en annuel (35 € au mois), 1 site, conversations illimitées.",
        other:
          "Essential : 19 $ par utilisateur et par mois en annuel (25 $ au mois). 1 agent IA, 10 résolutions IA par mois.",
      },
      {
        label: "Au-delà du forfait IA",
        talker:
          "Les plans payants n'ont pas de quota de conversations. Au-delà de 100 sur le plan gratuit, passez à un plan payant ou attendez le mois suivant.",
        other:
          "Growth : 79 $ par utilisateur et par mois en annuel (99 $ au mois), 10 agents IA, 200 résolutions par mois. Un pack de 50 résolutions en plus : 49,50 $.",
      },
      {
        label: "Marque blanche",
        talker:
          "Le plan gratuit affiche « Propulsé par Talker » (lien vers talker.now). La mention disparaît dès Pro.",
        other: "Widget en marque blanche : plan Enterprise, sur devis.",
      },
      {
        label: "Plusieurs sites",
        talker: "Pro 3 : 49 €/mois, 3 sites. Pro Max : 99 €/mois, 10 sites (en annuel).",
        other: "Plusieurs sites inclus sur Essential, Growth et Enterprise.",
      },
    ],
    whenOtherTitle: "Quand choisir LiveChat",
    whenOther: [
      "Une équipe répond en direct, et vous payez un siège par personne.",
      "Vous voulez Messenger et les SMS (Twilio) dans la même boîte : ils sont inclus sur tous les plans Text.",
    ],
    whenTalkerTitle: "Quand choisir Talker",
    whenTalker: [
      "Personne n'est disponible pour tenir un chat.",
      "Vous ne voulez pas un prix par utilisateur pour 10 résolutions IA par mois.",
      "Vous voulez la marque blanche dès Pro (29 €, 1 site), Pro 3 (49 €, 3 sites) ou Pro Max (99 €, 10 sites), pas seulement sur un plan sur devis.",
    ],
    faq: [
      {
        q: "Talker est-il le même produit que LiveChat ?",
        a: "Non. Talker est un agent IA sur WordPress : personne ne répond en direct dans la bulle. LiveChat, pour les nouveaux essais, vend les plans Text : une équipe répond, avec un agent IA en plus.",
      },
      {
        q: "Combien coûte le premier plan ?",
        a: "Pro, chez Talker, coûte 29 € par mois en annuel pour 1 site, conversations illimitées. Essential, chez Text, coûte 19 $ par utilisateur et par mois en annuel (25 $ au mois), avec 10 résolutions IA par mois. Une résolution, c'est une question à laquelle l'IA a répondu directement. Un pack de 50 résolutions en plus coûte 49,50 $ (tarifs relevés le 08/10/2026).",
      },
      {
        q: "Où est la marque blanche ?",
        a: "Chez Talker, dès Pro (29 € par mois en annuel), ainsi que sur Pro 3 et Pro Max. Chez Text, le widget en marque blanche est sur le plan Enterprise, sur devis.",
      },
      {
        q: "Talker fonctionne-t-il sans WordPress ?",
        a: "Non. Talker est un plugin WordPress.",
      },
    ],
    sources: [
      { href: "https://www.livechat.com/pricing/", label: "https://www.livechat.com/pricing/" },
    ],
    sourceNote:
      "Tarifs relevés le 08/10/2026 sur la page officielle de LiveChat (plans Text pour les nouveaux essais). Prix en dollars US tels qu'affichés, hors taxes.",
  },
  {
    id: "botpress",
    slug: "alternative-botpress-wordpress",
    path: "/alternative-botpress-wordpress",
    metaTitle: "Alternative à Botpress pour WordPress — Talker",
    metaDescription:
      "Un plugin zip qui lit votre site WordPress, sans studio à configurer. Faits et tarifs comparés avec Botpress.",
    h1: "Une alternative à Botpress pour WordPress",
    otherName: "Botpress",
    shortAnswer:
      "Si vous voulez un agent IA sur votre site WordPress sans le construire dans un studio, Talker est une alternative à Botpress. Talker s'installe avec un fichier zip, lit les pages publiques de votre site et pose des questions adaptées à votre métier. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. Botpress convient mieux si vous voulez dessiner les flux vous-même et ajouter vos propres sources.",
    tableTitle: "Talker et Botpress en bref",
    rows: [
      {
        label: "Ce que c'est",
        talker:
          "Un plugin WordPress : un agent IA qui répond seul sur votre site.",
        other: "Une plateforme pour créer des agents IA, puis les poser sur un site.",
      },
      {
        label: "Installation sur WordPress",
        talker: "Fichier zip, puis « Activer ». Aucun réglage obligatoire.",
        other:
          "Créer l'agent dans Botpress, ajouter des sources, puis coller le script webchat sur le site WordPress.",
      },
      {
        label: "D'où viennent les réponses",
        talker: "Des pages publiques de votre site. Pas d'envoi de fichiers.",
        other: "Des sources que vous ajoutez (site, documents).",
      },
      {
        label: "Pour démarrer",
        talker:
          "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
        other:
          "Plan gratuit : 0 $, 100 conversations, sans packs ni dépassement, 3 sièges, 3 agents IA, support communautaire.",
      },
      {
        label: "Comptage",
        talker:
          "En conversations : un visiteur qui discute (une session). Illimitées sur les plans payants.",
        other:
          "Un échange avec au moins deux messages du visiteur dans le mois. Un échange à cheval sur deux mois compte deux fois.",
      },
      {
        label: "Premier plan payant",
        talker:
          "Pro : 29 €/mois en annuel (35 € au mois), 1 site, conversations illimitées, marque blanche.",
        other:
          "Plus : 150 $/mois en annuel, 250 conversations par mois, puis des packs de 100 à 65 $ (0,65 $ la conversation). Marque blanche du webchat incluse. 3 sièges.",
      },
      {
        label: "Au-delà du quota",
        talker:
          "Au-delà de 100 conversations dans le mois, passez à un plan payant ou attendez le mois suivant. Les plans payants sont illimités.",
        other:
          "La page indique qu'à 95 % du quota, un pack de 100 conversations est ajouté, et que ce rechargement ne se coupe pas. Le plan gratuit est affiché sans packs ni dépassement. Team : 750 $/mois en annuel, 1 500 conversations, packs de 100 à 50 $.",
      },
    ],
    whenOtherTitle: "Quand choisir Botpress",
    whenOther: [
      "Vous voulez dessiner les flux et brancher des documents vous-même.",
      "Vous voulez aussi WhatsApp : il est inclus sur Plus.",
    ],
    whenTalkerTitle: "Quand choisir Talker",
    whenTalker: [
      "Vous voulez un agent en place avec un zip, sans rien construire dans un studio.",
      "Votre site WordPress contient déjà ce qu'il faut savoir.",
      "Vous voulez la marque blanche et les conversations illimitées dès Pro (29 €, 1 site), pas 150 $ par mois pour 250 conversations.",
    ],
    faq: [
      {
        q: "Faut-il construire l'agent Talker comme sur Botpress ?",
        a: "Non. Talker lit les pages publiques de votre site après l'activation, puis vous pose quelques questions sur votre métier dans WordPress.",
      },
      {
        q: "Que se passe-t-il quand le quota est atteint ?",
        a: "Chez Talker, au-delà de 100 conversations dans le mois, passez à un plan payant ou attendez le mois suivant. Les plans payants n'ont pas de quota. Chez Botpress, le plan gratuit affiche 100 conversations sans packs ni dépassement. La page tarifs indique aussi qu'à 95 % du quota un pack de 100 conversations est ajouté, et que ce rechargement ne se coupe pas (tarifs relevés le 08/10/2026).",
      },
      {
        q: "Combien coûte la marque blanche ?",
        a: "Chez Talker, elle est incluse dès Pro (29 € par mois en annuel, 1 site), ainsi que sur Pro 3 (49 €, 3 sites) et Pro Max (99 €, 10 sites). Chez Botpress, la marque blanche du webchat est sur Plus : 150 $ par mois en annuel, pour 250 conversations.",
      },
      {
        q: "Talker fonctionne-t-il sans WordPress ?",
        a: "Non. Talker est un plugin WordPress.",
      },
    ],
    sources: [
      { href: "https://botpress.com/pricing", label: "https://botpress.com/pricing" },
      {
        href: "https://botpress.com/integrations/wordpress",
        label: "https://botpress.com/integrations/wordpress",
      },
    ],
    sourceNote:
      "Tarifs relevés le 08/10/2026 sur la page officielle de Botpress. Prix en dollars US tels qu'affichés, offre annuelle pour Plus et Team.",
  },
  {
    id: "aiengine",
    slug: "alternative-ai-engine-wordpress",
    path: "/alternative-ai-engine-wordpress",
    metaTitle: "Alternative à AI Engine pour WordPress — Talker",
    metaDescription:
      "Talker est un agent conversationnel WordPress : un zip, sans clé API. Alternative à AI Engine, la boîte à outils IA de Meow Apps. Chatbot léger, un seul rôle.",
    h1: "Une alternative à AI Engine pour WordPress",
    otherName: "AI Engine",
    shortAnswer:
      "Si vous voulez un agent qui répond aux visiteurs de votre site, et rien d'autre, Talker est une alternative à AI Engine. AI Engine (Meow Apps) est une boîte à outils IA complète : génération de contenu, images, formulaires, agent sur le site, base de connaissances, et d'autres modules. Elle est pensée pour ceux qui veulent tout régler, avec leur propre clé API. Talker fait une seule chose. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
    tableTitle: "Talker et AI Engine en bref",
    rows: [
      {
        label: "Ce que c'est",
        talker: "Un plugin WordPress : un agent qui répond seul sur votre site.",
        other:
          "Une boîte à outils IA pour WordPress (Meow Apps) : contenu, images, formulaires, agent, base de connaissances, copilot dans l'éditeur, serveur MCP.",
      },
      {
        label: "Pour qui",
        talker: "Quelqu'un qui veut un agent sur le site, sans suite d'outils à configurer.",
        other: "Quelqu'un qui veut brancher plusieurs usages de l'IA et choisir les modèles.",
      },
      {
        label: "Installation",
        talker:
          "Fichier zip, puis « Activer ». Aucun réglage obligatoire. Le zip pèse 28 951 octets et contient 10 fichiers.",
        other: "Extension à activer, puis réglages des modules et du fournisseur d'IA.",
      },
      {
        label: "Ce que le site charge",
        talker:
          "Une feuille de style et un script (widget.js, 19 768 octets), imprimé en pied de page. Pas d'autre script public.",
        other:
          "Plus une extension fait de choses, plus il y a de code et de réglages. Le détail du chargement n'est pas chiffré ici.",
      },
      {
        label: "Clé API",
        talker: "Aucune clé à fournir. Le plugin n'a pas de formulaire pour en coller une.",
        other:
          "Vos propres clés (OpenAI, Claude, Gemini, Mistral, Perplexity ou OpenRouter). Vous payez le fournisseur, sans marge sur les tokens.",
      },
      {
        label: "Contact du visiteur",
        talker: "Le visiteur peut laisser un e-mail ou un téléphone. Les conversations partent par e-mail.",
        other: "Selon les modules que vous activez.",
      },
      {
        label: "Pour démarrer",
        talker:
          "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
        other:
          "Version gratuite. Plus de 90 000 installations actives. Pas d'essai sur Pro : remboursement sur demande sous 2 semaines.",
      },
      {
        label: "Premier plan payant",
        talker:
          "Pro : 29 €/mois en annuel (35 € au mois), 1 site, conversations illimitées, marque blanche.",
        other:
          "Pro Starter : 79 $ par an, 1 site, un an de support. Standard : 99 $ par an, 5 sites. Professional : 179 $ par an, 20 sites. Licences à vie à partir de 499 $ (5 sites).",
      },
    ],
    whenOtherTitle: "Quand choisir AI Engine",
    whenOther: [
      "Vous voulez générer du contenu, des images ou des formulaires, et pas seulement répondre aux visiteurs.",
      "Vous avez un compte chez un fournisseur d'IA et vous voulez utiliser votre clé, sans intermédiaire.",
    ],
    whenTalkerTitle: "Quand choisir Talker",
    whenTalker: [
      "Vous voulez un agent sur le site, et vous n'avez pas besoin du reste.",
      "Vous ne voulez pas créer de clé API ni suivre une facture de tokens.",
      "Le visiteur laisse un e-mail ou un téléphone, et vous recevez les conversations toutes les 4 heures.",
    ],
    faq: [
      {
        q: "Talker demande-t-il une clé API ?",
        a: "Non. Le plugin Talker n'a pas de formulaire pour coller une clé. AI Engine utilise vos propres clés (OpenAI ou un autre fournisseur). La page Meow Apps indique qu'il n'y a pas de marge sur les tokens : vous payez le fournisseur (relevé le 08/10/2026).",
      },
      {
        q: "Talker remplace-t-il toute la boîte à outils ?",
        a: "Non. Talker répond aux visiteurs du site. Il ne génère pas d'articles, d'images ni de formulaires. AI Engine couvre ces usages, dans la version gratuite ou en Pro.",
      },
      {
        q: "Que pèse le plugin Talker ?",
        a: "Le zip pèse 28 951 octets et contient 10 fichiers. Sur le site public, Talker charge une feuille de style et un script de 19 768 octets, imprimé en pied de page. Plus une extension fait de choses, plus il y a de code et de réglages : ce n'est pas une mesure de la vitesse d'AI Engine.",
      },
      {
        q: "Combien coûte AI Engine Pro ?",
        a: "Starter : 79 $ par an pour 1 site. Standard : 99 $ par an pour 5 sites. Professional : 179 $ par an pour 20 sites. Des licences à vie commencent à 499 $ pour 5 sites. Talker Pro : 29 € par mois en annuel pour 1 site, conversations illimitées. Pro 3 : 49 € pour 3 sites. Pro Max : 99 € pour 10 sites (tarifs relevés le 08/10/2026).",
      },
    ],
    sources: [
      { href: "https://meowapps.com/ai-engine/", label: "https://meowapps.com/ai-engine/" },
      {
        href: "https://meowapps.com/products/ai-engine-pro/",
        label: "https://meowapps.com/products/ai-engine-pro/",
      },
    ],
    sourceNote:
      "Tarifs relevés le 08/10/2026 sur les pages officielles de Meow Apps. Prix AI Engine Pro en dollars US, licence annuelle sauf mention d'une licence à vie. Le poids du zip Talker est celui du fichier livré avec le site.",
  },
];

const byId = new Map(alternatives.map((page) => [page.id, page]));

export function getAlternative(id: AlternativeId) {
  const page = byId.get(id);
  if (!page) {
    throw new Error(`Missing alternative page: ${id}`);
  }
  return page;
}

export function alternativeFaqJsonLd(id: AlternativeId) {
  return faqPageJsonLd(getAlternative(id).faq);
}

export function alternativeAlsoLinks(id: AlternativeId) {
  const others = alternatives
    .filter((page) => page.id !== id)
    .map((page) => ({ href: page.path, label: `Alternative à ${page.otherName}` }));

  return [sharedAlso.tarifs, sharedAlso.comparatif, ...others, sharedAlso.faq, sharedAlso.installer];
}
