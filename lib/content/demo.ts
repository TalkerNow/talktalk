export type DemoChip = {
  label: string;
  userText: string;
  next: string;
};

export type DemoStep = {
  id: string;
  bot: string;
  chips?: DemoChip[];
  askEmail?: boolean;
};

export const demoSteps: Record<string, DemoStep> = {
  start: {
    id: "start",
    bot: "Bonjour. Je suis Talker. Vous avez un site WordPress ?",
    chips: [
      { label: "Oui", userText: "Oui, un site WordPress.", next: "size" },
      { label: "Pas encore", userText: "Pas encore.", next: "not-yet" },
      { label: "Autre CMS", userText: "On n’est pas sur WordPress.", next: "other" },
    ],
  },
  size: {
    id: "size",
    bot: "Combien de personnes dans l’équipe ?",
    chips: [
      { label: "1 à 4", userText: "On est 1 à 4.", next: "small" },
      { label: "5 à 30", userText: "On est 5 à 30.", next: "staff" },
      { label: "Plus de 30", userText: "Plus de 30.", next: "large" },
    ],
  },
  "not-yet": {
    id: "not-yet",
    bot: "Quand le site sera en ligne, vous collez l’adresse et le bot tourne. En attendant, on peut vous prévenir pour la beta.",
    chips: [
      { label: "Prévenez-moi", userText: "Prévenez-moi pour la beta.", next: "email" },
      { label: "Plus tard", userText: "Plus tard.", next: "later" },
    ],
  },
  other: {
    id: "other",
    bot: "Talker est un plugin WordPress. Si vous n’êtes pas sur WP, ce n’est pas pour vous — et c’est volontaire.",
    chips: [{ label: "Compris", userText: "Compris.", next: "later" }],
  },
  small: {
    id: "small",
    bot: "Talker vise surtout les équipes de 5 à 30, quand plus personne n’a le temps de tenir une ligne. On peut quand même vous inscrire à la beta.",
    chips: [
      { label: "Inscrivez-moi", userText: "Inscrivez-moi à la beta.", next: "email" },
      { label: "Plus tard", userText: "Plus tard.", next: "later" },
    ],
  },
  large: {
    id: "large",
    bot: "Au-delà, d’autres outils existent. Talker reste un petit plugin pour une petite équipe.",
    chips: [{ label: "Compris", userText: "Compris.", next: "later" }],
  },
  staff: {
    id: "staff",
    bot: "Qui répond aux messages du site, aujourd’hui ?",
    chips: [
      { label: "Personne vraiment", userText: "Personne vraiment.", next: "offer" },
      { label: "Le gérant", userText: "Le gérant, quand il peut.", next: "offer" },
      {
        label: "Un salarié",
        userText: "Un salarié, quand il peut.",
        next: "offer",
      },
    ],
  },
  offer: {
    id: "offer",
    bot: "Talker pose les questions à votre place, prend le contact, et vous prévient. Personne n’a besoin de tenir le chat. On vous inscrit à la beta ?",
    chips: [
      { label: "Oui", userText: "Oui, inscrivez-moi.", next: "email" },
      { label: "Plus tard", userText: "Plus tard.", next: "later" },
    ],
  },
  email: {
    id: "email",
    bot: "Indiquez un email. Sur un vrai site, c’est le visiteur qui le laisse — ici, c’est vous.",
    askEmail: true,
  },
  later: {
    id: "later",
    bot: "Très bien. Le bouton « Voir la démo » rouvre ce fil. En bas de page, vous pouvez laisser un email pour la liste d’attente.",
  },
  done: {
    id: "done",
    bot: "C’est noté. En vrai, ce message irait au gérant — pas dans une file anonyme.",
  },
};
