import { faqPageJsonLd, type FaqItem } from "./faq-jsonld";

export const TARIFS_PATH = "/tarifs";

export const RATES_AS_OF = "Tarifs relevés le 08/10/2026";

export const TARIFS_META = {
  title: "Tarifs Talker — plugin WordPress, 100 conversations offertes",
  description:
    "100 conversations offertes par site, sans carte. Marque blanche dès le premier plan payant. 1, 3 ou 10 sites.",
} as const;

export const TARIFS_H1 = "Tarifs Talker";

export const tarifsSummary = [
  "100 conversations offertes par site, sans carte bancaire.",
  "Marque blanche dès le premier plan payant : la mention « Propulsé par talker.now » disparaît.",
  "1, 3 ou 10 sites : 29 €, 49 € ou 99 € par mois en annuel.",
] as const;

export const tarifsAfterHundred = {
  title: "Ce qui se passe à la 100e conversation",
  items: [
    "Vous recevez un e-mail à 50, 75 et 90 conversations.",
    "À 100, le site ne prend plus de nouvelles conversations tant que vous ne passez pas sur un plan payant.",
    "Aucune carte n'a été demandée : rien n'est prélevé automatiquement.",
  ],
} as const;

export const tarifsWhiteLabel = {
  title: "Agences : la marque blanche, comparée",
  intro:
    "Vous installez des sites pour vos clients ? Voici où commence la marque blanche chez Talker et chez trois outils connus. On compare seulement ce point : ces outils font aussi d'autres choses (chat en direct, plusieurs canaux, support d'équipe).",
  columns: ["Outil", "Marque blanche à partir de", "Prix relevé", "À savoir"] as const,
  rows: [
    {
      tool: "Talker",
      from: "Premier plan payant (Pro, 1 site)",
      price:
        "29 €/mois en annuel (35 € au mois). 3 sites : 49 €/mois. 10 sites : 99 €/mois (en annuel)",
      note: "Automatique : la mention « Propulsé par talker.now » disparaît. Conversations illimitées sur les plans payants.",
      source: null,
    },
    {
      tool: "Crisp",
      from: "Plan Plus",
      price: "295 $/mois par workspace",
      note: "Retire la mention « We run on Crisp ». Le plan gratuit n'inclut aucun crédit IA.",
      source: { href: "https://crisp.chat/en/pricing/", label: "Source" },
    },
    {
      tool: "Chatbase",
      from: "Option « Remove Powered By Chatbase » ; marque blanche complète en Enterprise",
      price: "Option à 99 $/mois ; Enterprise sur devis",
      note: "Plans à partir de 40 $/mois (Hobby).",
      source: { href: "https://www.chatbase.co/pricing", label: "Source" },
    },
    {
      tool: "Botpress",
      from: "Plan Plus",
      price: "150 $/mois facturé à l'année",
      note: "250 conversations/mois incluses, puis packs de 100 à 65 $ ajoutés automatiquement.",
      source: { href: "https://botpress.com/pricing", label: "Source" },
    },
  ],
  footnote:
    "Tarifs relevés le 08/10/2026 sur les pages officielles de chaque outil. Prix en dollars US tels qu'affichés. Ils peuvent changer : vérifiez sur la source.",
} as const;

export const tarifsFaq: readonly FaqItem[] = [
  {
    q: "Faut-il une carte bancaire pour commencer ?",
    a: "Non. Vous installez le zip et les 100 premières conversations sont offertes sur ce site.",
  },
  {
    q: "Les 100 conversations sont-elles par mois ?",
    a: "Non. C'est 100 conversations par site, une seule fois, pour juger Talker sur votre vrai site.",
  },
  {
    q: "Que se passe-t-il après 100 conversations ?",
    a: "Le site ne prend plus de nouvelles conversations. Vous passez en Pro (1 site) ou sur une offre agence (3 ou 10 sites) pour continuer.",
  },
  {
    q: "C'est quoi, la marque blanche ?",
    a: "Sur les plans payants, la mention « Propulsé par talker.now » disparaît de la fenêtre de conversation. Rien à régler.",
  },
  {
    q: "Peut-on payer au mois ?",
    a: "Oui : 35 € par mois pour 1 site, 69 € pour 3 sites, 119 € pour 10 sites. En annuel : 29 €, 49 € et 99 € par mois.",
  },
];

export const tarifsFaqJsonLd = faqPageJsonLd(tarifsFaq);

export const tarifsAlso = [
  { href: "/comparatif-talker-live-chat", label: "Talker et le chat live" },
  { href: "/alternative-tidio-wordpress", label: "Alternative à Tidio" },
  { href: "/alternative-crisp-wordpress", label: "Alternative à Crisp" },
  { href: "/alternative-chatbase-wordpress", label: "Alternative à Chatbase" },
  { href: "/faq", label: "FAQ" },
] as const;
