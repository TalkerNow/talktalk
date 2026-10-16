import { faqPageJsonLd, type FaqItem } from "./faq-jsonld";

export const TARIFS_PATH = "/tarifs";

export const RATES_AS_OF = "Tarifs relevés le 08/10/2026";

export const TARIFS_META = {
  title: "Tarifs Talker — plugin WordPress, 50 conversations par mois",
  description:
    "50 conversations par mois et par site, remises à zéro chaque mois, sans carte, sans limite de durée. Option Sans badge : 9,99 € ou 12,99 €. Pro, Pro 3 et Pro Max : marque blanche. 29 €, 49 € ou 99 € par mois en annuel.",
} as const;

export const TARIFS_H1 = "Tarifs Talker";

export const tarifsSummary = [
  "50 conversations par mois et par site, remises à zéro chaque mois, sans carte, sans limite de durée. Alertes à 25, 38 et 45 conversations.",
  "Le plan gratuit affiche « Powered by Talker · Créez le vôtre », avec un lien vers talker.now, et une puce « Talker Now ».",
  "Option Sans badge, sur le Starter : 9,99 €/mois en paiement annuel, 12,99 €/mois en paiement mensuel. Elle retire le badge et la puce. Elle ne lève pas la limite de conversations.",
  "Pro (1 site) 29 €, Pro 3 (3 sites) 49 €, Pro Max (10 sites) 99 € par mois en annuel. Marque blanche : pas de badge.",
] as const;

export const tarifsAfterHundred = {
  title: "Ce qui se passe à la 50e conversation du mois",
  items: [
    "Une conversation, c'est un visiteur qui discute (une session).",
    "Au-delà de 50 conversations dans le mois, passez à un plan payant ou attendez le mois suivant.",
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
      from: "Option Sans badge sur Starter ; incluse sur Pro, Pro 3 et Pro Max",
      price:
        "Option Sans badge : 9,99 €/mois en annuel (12,99 € au mois). Pro : 29 €/mois en annuel (35 € au mois). Pro 3 : 49 €/mois, 3 sites. Pro Max : 99 €/mois, 10 sites (en annuel)",
      note: "Le Starter affiche « Powered by Talker · Créez le vôtre » (lien vers talker.now) et une puce « Talker Now ». L'option retire le badge et la puce, sans lever la limite de 50 conversations. Sur les plans payants, la mention disparaît. Conversations illimitées.",
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
    q: "Faut-il une carte bancaire pour commencer à utiliser un chatbot IA ?",
    a: "Non, le chatbot IA Talker démarre sans carte bancaire. Vous installez le plugin WordPress (un zip) et le plan gratuit vous donne 50 conversations par mois et par site, remises à zéro chaque mois, sans limite de durée. Aucune carte n'a été demandée, donc rien n'est prélevé automatiquement.",
  },
  {
    q: "Les 50 conversations de l'agent conversationnel de site web sont-elles par mois ?",
    a: "Oui, l'agent conversationnel Talker offre 50 conversations par mois et par site, et le compteur repart à zéro chaque mois. Une conversation, c'est un visiteur qui discute avec le chatbot, soit une session. Vous recevez des alertes à 25, 38 et 45 conversations pour suivre votre consommation.",
  },
  {
    q: "Que se passe-t-il après 50 conversations ?",
    a: "Après 50 conversations dans le mois, vous passez à un plan payant ou vous attendez le mois suivant, quand le compteur repart à zéro. Aucune carte n'ayant été demandée, rien n'est prélevé automatiquement. Les plans Pro, Pro 3 et Pro Max offrent des conversations illimitées, à partir de 29 € par mois en annuel.",
  },
  {
    q: "C'est quoi la marque blanche du chatbot IA Talker ?",
    a: "La marque blanche du chatbot IA Talker, c'est un widget sans mention de Talker. Le Starter gratuit affiche « Powered by Talker · Créez le vôtre » et une puce « Talker Now ». L'Option Sans badge (9,99 €/mois en annuel, 12,99 € au mois) les retire, sans lever la limite. Sur Pro, Pro 3 et Pro Max, la mention disparaît.",
  },
  {
    q: "Combien coûte un chatbot IA pour site WordPress avec Talker ?",
    a: "Un chatbot IA Talker coûte de 0 € à 99 € par mois selon le plan choisi en paiement annuel. Le Starter est gratuit, avec 50 conversations par mois et par site. Pro coûte 29 € (1 site), Pro 3 coûte 49 € (3 sites) et Pro Max coûte 99 € (10 sites), soit 17 % de moins qu'au mois.",
  },
  {
    q: "Peut-on payer son chatbot IA au mois plutôt qu'à l'année ?",
    a: "Oui, chaque plan payant de Talker se règle aussi au mois. Pro coûte 35 € par mois pour 1 site, Pro 3 coûte 69 € pour 3 sites et Pro Max coûte 119 € pour 10 sites. En paiement annuel, les mêmes plans reviennent à 29 €, 49 € et 99 € par mois.",
  },
  {
    q: "Comment mettre une IA LLM ou un agent IA sur mon site ?",
    a: "Pour mettre une IA LLM sur votre site WordPress, vous installez le plugin Talker (un zip) et l'agent IA répond à vos visiteurs. Talker utilise un grand modèle de langage, Google Gemini 2.5 Flash, dont le nom n'est pas montré aux visiteurs. Le plan gratuit offre 50 conversations par mois et par site, sans carte.",
  },
  {
    q: "Talker, c'est ChatGPT sur mon site ?",
    a: "Non, Talker n'est pas ChatGPT et n'est pas un produit OpenAI, mais il apporte sur votre site une conversation du même style. Talker utilise un LLM de la même catégorie que les systèmes derrière ChatGPT, Gemini ou Claude : Google Gemini 2.5 Flash. Un méta-prompt construit un prompt spécifique pour chaque site.",
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
