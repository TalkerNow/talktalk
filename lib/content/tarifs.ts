import { faqPageJsonLd, type FaqItem } from "./faq-jsonld";

export const TARIFS_PATH = "/tarifs";

export const RATES_AS_OF = "Tarifs relevés le 08/10/2026";

export const TARIFS_META = {
  title: "Tarifs Talker — plugin WordPress, 100 conversations par mois",
  description:
    "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. Pro, Pro 3 et Pro Max : marque blanche. 29 €, 49 € ou 99 € par mois en annuel.",
} as const;

export const TARIFS_H1 = "Tarifs Talker";

export const tarifsSummary = [
  "100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
  "Le plan gratuit affiche « Propulsé par Talker », avec un lien vers talker.now. Dès le premier plan payant, cette mention disparaît (marque blanche).",
  "Pro (1 site) 29 €, Pro 3 (3 sites) 49 €, Pro Max (10 sites) 99 € par mois en annuel.",
] as const;

export const tarifsAfterHundred = {
  title: "Ce qui se passe à la 100e conversation du mois",
  items: [
    "Une conversation, c'est un visiteur qui discute (une session).",
    "Au-delà de 100 conversations dans le mois, passez à un plan payant ou attendez le mois suivant.",
    "Aucune carte n'a été demandée : rien n'est prélevé automatiquement.",
  ],
} as const;

export const tarifsWhiteLabel = {
  title: "Pour les agences : la marque blanche, comparée",
  intro:
    "Vous installez des sites pour vos clients ? Voici où commence la marque blanche chez Talker et chez trois outils connus. On compare seulement ce point : ces outils font aussi d'autres choses (chat en direct, plusieurs canaux, support d'équipe).",
  columns: ["Outil", "Marque blanche à partir de", "Prix relevé", "À savoir"] as const,
  rows: [
    {
      tool: "Talker",
      from: "Pro (1 site), Pro 3 (3 sites) et Pro Max (10 sites)",
      price:
        "Pro : 29 €/mois en annuel (35 € au mois). Pro 3 : 49 €/mois, 3 sites. Pro Max : 99 €/mois, 10 sites (en annuel)",
      note: "Le plan gratuit affiche « Propulsé par Talker », avec un lien vers talker.now. Sur les plans payants, la mention disparaît. Conversations illimitées.",
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
    a: "Non. Vous installez le zip. Le plan gratuit, c'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée.",
  },
  {
    q: "Les 100 conversations sont-elles par mois ?",
    a: "Oui. C'est 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. Le compteur repart chaque mois. Une conversation, c'est un visiteur qui discute (une session).",
  },
  {
    q: "Que se passe-t-il après 100 conversations ?",
    a: "Au-delà de 100 conversations dans le mois, passez à un plan payant ou attendez le mois suivant.",
  },
  {
    q: "C'est quoi, la marque blanche ?",
    a: "Le plan gratuit affiche « Propulsé par Talker », avec un lien vers talker.now, sous le widget. Sur les plans payants, cette mention disparaît. Rien à régler.",
  },
  {
    q: "Peut-on payer au mois ?",
    a: "Oui. Pro : 35 € par mois (1 site). Pro 3 : 69 € (3 sites). Pro Max : 119 € (10 sites). En annuel : 29 €, 49 € et 99 € par mois.",
  },
];

export const tarifsFaqJsonLd = faqPageJsonLd(tarifsFaq);

export const tarifsAlso = [
  { href: "/comparatif-talker-live-chat", label: "Talker et le chat live" },
  { href: "/alternative-tidio-wordpress", label: "Alternative à Tidio" },
  { href: "/alternative-crisp-wordpress", label: "Alternative à Crisp" },
  { href: "/alternative-chatbase-wordpress", label: "Alternative à Chatbase" },
  { href: "/alternative-tawk-to-wordpress", label: "Alternative à tawk.to" },
  { href: "/alternative-smartsupp-wordpress", label: "Alternative à Smartsupp" },
  { href: "/alternative-livechat-wordpress", label: "Alternative à LiveChat" },
  { href: "/alternative-botpress-wordpress", label: "Alternative à Botpress" },
  { href: "/alternative-ai-engine-wordpress", label: "Alternative à AI Engine" },
  { href: "/faq", label: "FAQ" },
] as const;
