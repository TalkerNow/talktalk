export const COMPARATIF_PATH = "/comparatif-talker-live-chat";

export const COMPARATIF_META = {
  title: "Talker et le chat live — différences",
  description:
    "Talker est un plugin WordPress (zip). Ce n’est pas un chat live humain : pages publiques, prompt métier, e-mails bruts toutes les 4 heures.",
} as const;

export type ComparatifRow = {
  criterion: string;
  talker: string;
  live: string;
  engine: string;
};

export type ComparatifCopy = {
  h1: string;
  lead: string;
  columns: {
    talker: string;
    live: string;
    engine: string;
  };
  rows: ComparatifRow[];
  also: string;
  alsoLinks: { href: string; label: string }[];
  faqLabel: string;
  downloadLabel: string;
};

export const comparatifFr: ComparatifCopy = {
  h1: "Talker et le chat live — différences",
  lead: "Talker est un plugin WordPress : vous l’installez avec un fichier zip. Ce n’est pas un chat live tenu par un humain. Cette page aligne des faits face à Intercom, Crisp, Tidio et au plugin AI Engine. Elle ne classe pas les produits.",
  columns: {
    talker: "Talker",
    live: "Chat live (Intercom, Crisp, Tidio)",
    engine: "AI Engine",
  },
  rows: [
    {
      criterion: "Installation",
      talker: "Fichier zip dans WordPress, puis activation.",
      live: "Intercom, Crisp et Tidio sont des chats live. On les ajoute au site pour qu’une équipe réponde dans une fenêtre. Ce n’est pas le zip Talker.",
      engine: "AI Engine est un plugin WordPress (Meow Apps). Ce n’est pas Talker.",
    },
    {
      criterion: "Qui répond sur le site public",
      talker:
        "Pas un humain. Personne ne répond en direct derrière la bulle publique.",
      live: "Une personne de l’équipe peut répondre dans le chat.",
      engine: "Pas une équipe de chat live. Le plugin connecte un modèle.",
    },
    {
      criterion: "Fichiers et base documentaire",
      talker: "Pas d’upload de fichiers. Pas de base documentaire (RAG).",
      live: "Non cité ici.",
      engine:
        "AI Engine peut indexer du contenu que vous branchez (embeddings). Talker ne le fait pas.",
    },
    {
      criterion: "D’où viennent les réponses",
      talker:
        "Lecture des pages publiques du site, puis un prompt métier dédié. Vous ne rédigez pas ce prompt à la main.",
      live: "La réponse peut être celle d’une personne dans la fenêtre.",
      engine: "Dépend du modèle et du contenu branché au plugin.",
    },
    {
      criterion: "Conversations que vous recevez",
      talker:
        "Par e-mail, toutes les 4 heures, les conversations brutes empilées. S’il n’y en a eu aucune, pas de mail.",
      live: "L’échange se fait dans le chat live.",
      engine: "Non cité ici. Talker envoie les conversations brutes par e-mail.",
    },
    {
      criterion: "Prix Talker",
      talker:
        "Starter — 0 €, 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée. Pro — 29 € / mois en annuel (35 € au mois), 1 site. Pro 3 — 49 € / mois en annuel pour 3 sites. Pro Max — 99 € / mois en annuel pour 10 sites.",
      live: "Prix non cités.",
      engine: "Prix non cités.",
    },
  ],
  also: "Voir aussi",
  alsoLinks: [
    { href: "/tarifs", label: "Tarifs" },
    { href: "/alternative-tidio-wordpress", label: "Alternative à Tidio" },
    { href: "/alternative-crisp-wordpress", label: "Alternative à Crisp" },
    { href: "/alternative-chatbase-wordpress", label: "Alternative à Chatbase" },
    { href: "/alternative-tawk-to-wordpress", label: "Alternative à tawk.to" },
    { href: "/alternative-smartsupp-wordpress", label: "Alternative à Smartsupp" },
    { href: "/alternative-livechat-wordpress", label: "Alternative à LiveChat" },
    { href: "/alternative-botpress-wordpress", label: "Alternative à Botpress" },
  ],
  faqLabel: "les questions fréquentes",
  downloadLabel: "le zip",
};

export const comparatifEn: ComparatifCopy = {
  h1: "Talker and live chat — differences",
  lead: "Talker is a WordPress plugin: you install it with a zip file. It is not a live chat staffed by a person. This page lines up facts against Intercom, Crisp, Tidio, and the AI Engine plugin. It does not rank the products.",
  columns: {
    talker: "Talker",
    live: "Live chat (Intercom, Crisp, Tidio)",
    engine: "AI Engine",
  },
  rows: [
    {
      criterion: "Install",
      talker: "A zip file in WordPress, then activation.",
      live: "Intercom, Crisp, and Tidio are live chats. You add them to a site so a team can answer in a window. That is not the Talker zip.",
      engine: "AI Engine is a WordPress plugin (Meow Apps). It is not Talker.",
    },
    {
      criterion: "Who answers on the public site",
      talker: "Not a human. Nobody answers live behind the public bubble.",
      live: "Someone on the team can answer in the chat.",
      engine: "Not a live-chat team. The plugin connects a model.",
    },
    {
      criterion: "Files and a document base",
      talker: "No file upload. No document base (RAG).",
      live: "Not stated here.",
      engine:
        "AI Engine can index content you connect (embeddings). Talker does not.",
    },
    {
      criterion: "Where the answers come from",
      talker:
        "A read of the site’s public pages, then a dedicated trade prompt. You do not write that prompt by hand.",
      live: "The answer can be a person’s, in the window.",
      engine: "Depends on the model and the content connected to the plugin.",
    },
    {
      criterion: "Conversations you receive",
      talker:
        "By email, every 4 hours, the raw conversations stacked. If there were none, no email.",
      live: "The exchange happens in the live chat.",
      engine: "Not stated here. Talker sends the raw conversations by email.",
    },
    {
      criterion: "Talker prices",
      talker:
        "Starter — €0, 100 conversations per month per site, free, no card, no time limit. Pro — €29 / month billed annually (€35 month to month), 1 site. Pro 3 — €49 / month annually for 3 sites. Pro Max — €99 / month annually for 10 sites.",
      live: "Prices not stated.",
      engine: "Prices not stated.",
    },
  ],
  also: "See also",
  alsoLinks: [
    { href: "/tarifs", label: "Pricing" },
    { href: "/alternative-tidio-wordpress", label: "Alternative to Tidio" },
    { href: "/alternative-crisp-wordpress", label: "Alternative to Crisp" },
    { href: "/alternative-chatbase-wordpress", label: "Alternative to Chatbase" },
    { href: "/alternative-tawk-to-wordpress", label: "Alternative to tawk.to" },
    { href: "/alternative-smartsupp-wordpress", label: "Alternative to Smartsupp" },
    { href: "/alternative-livechat-wordpress", label: "Alternative to LiveChat" },
    { href: "/alternative-botpress-wordpress", label: "Alternative to Botpress" },
  ],
  faqLabel: "the FAQ",
  downloadLabel: "the zip",
};
