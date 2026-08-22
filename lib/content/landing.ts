import type { LandingContent } from "./types";

export const landingContent: LandingContent = {
  banner: "Beta ouverte — 1 000 conversations incluses, sans paiement.",
  heroTitle: "La machine à convertir pour WordPress.",
  heroBody:
    "Il installe, il colle l’adresse de son site, et le bot fonctionne. Personne ne tient le chat.",
  primaryCta: "Voir la démo",
  secondaryCta: "Rejoindre la beta",
  nav: {
    produit: "Produit",
    prix: "Prix",
    beta: "Beta",
    contact: "Contact",
  },
  productMenu: [
    {
      title: "Le plugin WordPress",
      subtitle: "S’installe, puis le bot tourne tout seul.",
      href: "#produit",
    },
    {
      title: "Le prompt",
      subtitle: "C’est le produit. Pas de base à nourrir.",
      href: "#raison-04",
    },
    {
      title: "Les questions",
      subtitle: "Le bot mène. Le visiteur choisit.",
      href: "#raison-05",
    },
    {
      title: "Le contact",
      subtitle: "Ce qu’il faut pour rappeler, sans tenir la ligne.",
      href: "#raison-06",
    },
  ],
  whoTitle: "Pour qui",
  whoBody:
    "TPE et PME de 5 à 30 personnes, déjà sur WordPress, sans personne pour tenir un live chat.",
  howTitle: "Comment ça s’installe",
  howBody:
    "Le client ne voit rien et ne règle rien. Il installe, il colle l’adresse de son site, et le bot fonctionne.",
  howSteps: [
    {
      title: "Installer le plugin",
      body: "Un plugin WordPress. Pas un centre de contact, pas une usine à former.",
    },
    {
      title: "Coller l’adresse du site",
      body: "L’URL suffit pour que Talker se mette au travail.",
    },
    {
      title: "Le bot fonctionne",
      body: "Il pose les questions, prend le contact. Personne derrière l’écran.",
    },
  ],
  reasonsEyebrow: "7 raisons d’installer Talker",
  reasons: [
    {
      id: "raison-01",
      number: "01",
      title: "Fait pour les équipes de 5 à 30",
      body: "Talker est un petit plugin WordPress pour une TPE ou une PME. Pas un agent d’entreprise, pas un outil à former une armée de conseillers.",
    },
    {
      id: "raison-02",
      number: "02",
      title: "Personne ne tient le chat",
      body: "Le live chat demande quelqu’un. Talker n’en a pas besoin. Le bot mène l’échange pendant que l’équipe fait autre chose.",
    },
    {
      id: "raison-03",
      number: "03",
      title: "Installer, coller, c’est tout",
      body: "Le client ne voit rien et ne règle rien. Il installe, il colle l’adresse de son site, et le bot fonctionne.",
    },
    {
      id: "raison-04",
      number: "04",
      title: "Le prompt est le produit",
      body: "Pas de RAG. Pas de base documentaire à nourrir, ni d’index à surveiller. Le script fait le travail.",
    },
    {
      id: "raison-05",
      number: "05",
      title: "Le bot pose les questions",
      body: "Ce n’est pas une boîte vide « posez votre question ». Talker enchaîne des choix. Le visiteur répond, le fil avance.",
    },
    {
      id: "raison-06",
      number: "06",
      title: "Le contact reste",
      body: "Email, téléphone, ce qu’il faut pour rappeler. Talker capture le contact à la fin de l’échange — pas une conversation fantôme.",
    },
    {
      id: "raison-07",
      number: "07",
      title: "Une beta sans surprise",
      body: "1 000 conversations incluses, gratuites. La date de bascule sera écrite ici dès qu’elle est arrêtée, au moins trente jours avant tout tarif.",
    },
  ],
  situationsTitle: "Talker, en situation",
  situationsBody:
    "Des exemples de sites, pas des clients. Trois métiers où personne n’est derrière le chat.",
  situations: [
    {
      id: "resto",
      label: "Situation 01",
      title: "Restaurant de quartier",
      siteName: "La Table du Port",
      siteKind: "resto",
      botLine: "Vous cherchez une table pour ce soir ?",
      chips: ["Ce soir", "Demain", "Un autre jour"],
    },
    {
      id: "plombier",
      label: "Situation 02",
      title: "Entreprise de plomberie",
      siteName: "Atelier Fonte",
      siteKind: "plombier",
      botLine: "C’est une urgence, ou un devis ?",
      chips: ["Urgence", "Devis", "Entretien"],
    },
    {
      id: "cabinet",
      label: "Situation 03",
      title: "Cabinet libéral",
      siteName: "Cabinet Rivet",
      siteKind: "cabinet",
      botLine: "Vous prenez un premier rendez-vous ?",
      chips: ["Premier rendez-vous", "Déjà patient", "Une question"],
    },
  ],
  betaTitle: "La beta, clairement",
  betaBody:
    "Talker est en beta. 1 000 conversations sont incluses, sans paiement. Nous n’inventons pas un tarif pour faire sérieux.",
  betaPoints: [
    {
      title: "1 000 conversations",
      body: "Incluses dans la beta, pour voir Talker sur un vrai site WordPress.",
    },
    {
      title: "Gratuit",
      body: "Aucun règlement pendant la beta. Le client installe, il n’achète pas.",
    },
    {
      title: "Date de bascule",
      body: "Elle n’est pas encore figée. Dès qu’elle le sera, elle sera écrite ici, au moins trente jours avant toute offre payante. Pas de prélèvement surprise.",
    },
  ],
  priceTitle: "Après la beta",
  priceBody:
    "Une offre Pro sera proposée. Le tarif n’est pas encore confirmé — nous l’écrirons ici quand il le sera, pas avant.",
  contactTitle: "Laisser une adresse",
  contactBody:
    "Email et adresse du site suffisent pour la liste d’attente. Un identifiant WordPress.org sera demandé plus tard, à l’installation.",
  contactNote:
    "Un identifiant WordPress.org sera demandé plus tard, à l’installation. Pas d’autre champ pour l’instant.",
  footerLine: "Talker — un plugin WordPress pour les petites équipes.",
};
