import { faqPageJsonLd, type FaqItem } from "./faq-jsonld";

export const RATES_AS_OF = "Tarifs relevés le 08/10/2026";

export const ALTERNATIVE_ILLUSTRATION = {
  src: "/visuels/talker-23h47-paysage-1200x630.png",
  width: 1200,
  height: 630,
  alt: "Illustration produit : Talker répond à 23 h 47 à un visiteur, conversation fictive",
  caption: "Illustration produit · conversation fictive",
} as const;

export type AlternativeId = "tidio" | "crisp" | "chatbase";

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
