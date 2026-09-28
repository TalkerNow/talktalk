export type ConsentCopy = {
  title: string;
  body: string;
  accept: string;
  refuse: string;
  preferences: string;
  save: string;
  back: string;
  close: string;
  manage: string;
  necessary: string;
  necessaryHelp: string;
  analytics: string;
  analyticsHelp: string;
  privacy: string;
  legal: string;
  alwaysOn: string;
};

export const consentFr: ConsentCopy = {
  title: "Cookies",
  body: "Talker.now ne charge la mesure d’audience que si vous l’acceptez. Les cookies nécessaires restent actifs pour le fonctionnement du site.",
  accept: "Tout accepter",
  refuse: "Tout refuser",
  preferences: "Préférences",
  save: "Enregistrer",
  back: "Retour",
  close: "Fermer",
  manage: "Cookies",
  necessary: "Nécessaires",
  necessaryHelp:
    "Accès au site, langue, et mémorisation de ce choix. Toujours actifs.",
  analytics: "Mesure d’audience",
  analyticsHelp:
    "Google Analytics 4 (G-ZCPSJ5XXD7). Si vous refusez, aucun script Google n’est chargé.",
  privacy: "Confidentialité",
  legal: "Mentions légales",
  alwaysOn: "Toujours actif",
};

export const consentEn: ConsentCopy = {
  title: "Cookies",
  body: "Talker.now loads audience measurement only if you accept. Necessary cookies stay on so the site can run.",
  accept: "Accept all",
  refuse: "Refuse all",
  preferences: "Preferences",
  save: "Save",
  back: "Back",
  close: "Close",
  manage: "Cookies",
  necessary: "Necessary",
  necessaryHelp: "Site access, language, and remembering this choice. Always on.",
  analytics: "Audience measurement",
  analyticsHelp:
    "Google Analytics 4 (G-ZCPSJ5XXD7). If you refuse, no Google script is loaded.",
  privacy: "Privacy",
  legal: "Legal notice",
  alwaysOn: "Always on",
};
