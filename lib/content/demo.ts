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
  placeholder?: string;
};

export const demoSteps: Record<string, DemoStep> = {
  start: {
    id: "start",
    bot: "Bonjour. Je suis l'assistant du cabinet. Je peux vous donner les horaires, prendre un rendez-vous, ou transmettre une question.",
    chips: [
      {
        label: "Quels sont vos horaires ?",
        userText: "Quels sont vos horaires ?",
        next: "horaires",
      },
      {
        label: "Poser une question",
        userText: "J'ai une question.",
        next: "question",
      },
      {
        label: "Prendre rendez-vous",
        userText: "Prendre rendez-vous",
        next: "rdv",
      },
    ],
  },
  horaires: {
    id: "horaires",
    bot: "Nous recevons du lundi au vendredi, 9 h – 18 h, et un samedi sur deux le matin. Souhaitez-vous un créneau ?",
    chips: [
      {
        label: "Prendre rendez-vous",
        userText: "Prendre rendez-vous",
        next: "rdv",
      },
      {
        label: "Une autre question",
        userText: "Une autre question",
        next: "question",
      },
    ],
  },
  rdv: {
    id: "rdv",
    bot: "Dites-moi un moment qui vous arrange. Sur un vrai site, Talker irait chercher les disponibilités dans l'agenda — ici, c'est une démo.",
    chips: [
      { label: "Demain matin", userText: "Demain matin", next: "email" },
      {
        label: "En fin de semaine",
        userText: "En fin de semaine",
        next: "email",
      },
      { label: "Une question", userText: "Une question", next: "question" },
    ],
  },
  question: {
    id: "question",
    bot: "Je vous écoute. J'enregistre votre demande et le cabinet vous répond.",
    chips: [
      {
        label: "Un premier rendez-vous",
        userText: "Un premier rendez-vous",
        next: "rdv",
      },
      {
        label: "Un rappel téléphone",
        userText: "Un rappel téléphone",
        next: "email",
      },
    ],
  },
  email: {
    id: "email",
    bot: "Laissez un email. En vrai, c'est le visiteur qui le laisse — le cabinet le reçoit, pas une file anonyme.",
    askEmail: true,
    placeholder: "email@cabinet.fr",
  },
  done: {
    id: "done",
    bot: "C'est transmis. Le cabinet vous écrit à cette adresse.",
  },
  later: {
    id: "later",
    bot: "Très bien. La bulle rouvre ce fil quand vous voulez.",
  },
};
