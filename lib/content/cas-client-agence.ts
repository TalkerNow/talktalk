export const CAS_CLIENT_AGENCE_PATH = "/cas-client-agence";

export const CAS_CLIENT_BANNER =
  "Modèle — non publié. Les champs entre crochets attendent un vrai client.";

export const CAS_CLIENT_H1 =
  "[Nom de l'agence] installe Talker sur les sites de ses clients";

export const casClientBrief = [
  { label: "Agence", value: "[Nom de l'agence]" },
  { label: "Ville / pays", value: "[Ville, pays]" },
  { label: "Sites équipés", value: "[Nombre de sites]" },
  { label: "Métiers des clients", value: "[Métiers]" },
  { label: "Depuis", value: "[Date de la première installation]" },
  { label: "Plan Talker", value: "[3 ou 10 sites]" },
] as const;

export const casClientSections = [
  {
    title: "Avant",
    paragraphs: [
      "[Comment les sites de leurs clients géraient les demandes : formulaire, téléphone, chat non tenu.]",
      "« [Citation de l'agence] »",
    ],
  },
  {
    title: "Pourquoi Talker",
    paragraphs: [
      "[Raisons données par l'agence. Par exemple, si elles le disent : marque blanche, installation zip, pas de chat à tenir.]",
    ],
  },
  {
    title: "Mise en place",
    paragraphs: [
      "Temps d'installation par site : [temps constaté].",
      "Ce que l'agence a eu à faire : [à compléter].",
      "Ce que le gérant a eu à faire : [à compléter].",
    ],
  },
  {
    title: "Ce qui a changé",
    paragraphs: [
      "[Uniquement des chiffres fournis par l'agence, avec la période et la façon de compter. Forme attendue, sans chiffre tant qu'il n'est pas fourni : « conversations reçues entre le [date] et le [date] ».]",
    ],
  },
  {
    title: "Une conversation réelle",
    paragraphs: [
      "[Extrait ou capture anonymisée, avec l'accord du client final.]",
    ],
  },
] as const;

export const casClientQuote = {
  who: "[Prénom Nom, rôle]",
  text: "[Texte validé par écrit]",
} as const;

export const casClientCta =
  "Vous êtes une agence ? Installez Talker sur un premier site : 100 conversations offertes, sans carte.";

export const casClientAsk = [
  "Nom de l'agence, logo, site, ville/pays, nombre de personnes.",
  "Accord écrit pour publier (nom, logo, citation, chiffres, captures).",
  "Nombre de sites clients équipés de Talker, métiers concernés, date de la première installation.",
  "Plan Talker utilisé (3 ou 10 sites).",
  "Ce qui existait avant sur ces sites (formulaire, chat, rien) et le problème à régler.",
  "Pourquoi ils ont choisi Talker (leurs mots).",
  "Temps d'installation constaté par site.",
  "Chiffres réels, avec période et source : conversations reçues, contacts captés (téléphone/e-mail), part hors horaires, demandes transformées en rendez-vous ou devis si le client final le sait.",
  "Une ou deux conversations réelles anonymisées, avec l'accord du client final.",
  "Une citation signée (prénom, nom, rôle) et une photo si possible.",
  "Ce qui les a gênés ou ce qu'ils voudraient de plus (pour rester crédible).",
] as const;
