import type { DemoStep } from "@/lib/content/demo";

export const fr = {
  langLabel: "Langue",
  nav: {
    features: "Fonctionnalités",
    howItWorks: "Comment ça marche",
    pricing: "Tarifs",
    contact: "Contact",
    signIn: "Connexion",
    createAgent: "Créer mon agent gratuitement",
    menu: "Menu",
  },
  hero: {
    eyebrow: "Les IA aspirent le trafic de votre site. Talker le récupère.",
    titleBefore: "Le chatbot IA qui",
    titleAfter: "à votre place",
    phrases: [
      "décrit vos prestations",
      "donne vos tarifs",
      "donne vos disponibilités",
      "capte le numéro",
      "capte l'email",
      "demande des avis Google",
    ],
    subtitle:
      "Un chatbot IA qui connaît votre métier, capte le numéro ou l'email de vos prospects, répond aux tarifs sans que vous leviez le petit doigt, trie les demandes de vos clients existants, et récupère vos avis Google. Installé en 10 minutes, sans code.",
    createAgent: "Créer mon agent gratuitement",
    seeDemo: "Voir une démo",
    wordpress: "Disponible sur WordPress — extension officielle sur le store",
    stats: [
      { value: "+50%", label: "de leads sur votre site" },
      { value: "-80%", label: "de temps passé à répondre aux mêmes questions" },
      { value: "3x", label: "plus d'avis Google collectés" },
      { value: "24/7", label: "disponibilité, zéro rendez-vous manqué" },
    ],
  },
  context: {
    title: "Vos visiteurs ne cliquent plus.",
    titleMuted: "Ils demandent.",
    body: "Les moteurs de recherche et les IA génératives répondent directement, sans renvoyer vers votre site. Un site vitrine statique perd un trafic qu'il ne reverra jamais.",
    salmon:
      "Un site qui répond, qui engage, qui capte la demande sur place, c'est la seule manière de transformer une visite en contact.",
    leaflet: "Le site statique est un dépliant.",
    partner: "Votre site avec Talker devient un vendeur, une secrétaire, un partenaire.",
  },
  features: {
    eyebrow: "Fonctionnalités",
    title: "Ce qu'il faut.",
    titleMuted: "Rien de plus.",
    items: [
      {
        number: "01",
        title: "Un agent qui connaît votre métier",
        description:
          "Formé sur votre activité, vos services et vos tarifs, et reprenant la syntaxe rédactionnelle de votre site. Que vous soyez un avocat, un musée, une entreprise du bâtiment ou une société de conseil et de services, il répond avec le bon vocabulaire, pas avec des réponses génériques de type IA.",
        visual: "ai",
      },
      {
        number: "02",
        title: "Capture les coordonnées, pas juste les questions",
        description:
          "Numéro de téléphone ou email récupéré avant la fin de la conversation. Prospect chaud transmis direct, client existant redirigé vers le bon service. Rien ne se perd dans un formulaire jamais rempli.",
        visual: "collab",
      },
      {
        number: "03",
        title: "Un support avant votre support",
        description:
          "Talker distingue un prospect d'un client en une phrase. Panne, question tarifaire, service additionnel : il qualifie la demande et vous transmet un dossier prêt à traiter. Votre client ne raconte plus son problème deux fois.",
        visual: "security",
      },
    ],
  },
  how: {
    eyebrow: "Comment ça marche",
    title: "3 étapes. 5 minutes.",
    titleMuted: "Votre site passe à l'IA.",
    createAgent: "Créer mon agent gratuitement",
    assistant: "L'assistant du cabinet",
    close: "Fermer",
    placeholder: "Posez votre question...",
    steps: [
      {
        number: "1",
        title: "Installez le plugin et choisissez votre template",
        description:
          "Renseignez votre email et votre numéro de téléphone pour recevoir les alertes.",
      },
      {
        number: "2",
        title: "Talker lit votre site",
        description: "Il apprend votre métier, vos horaires, vos prestations.",
      },
      {
        number: "3",
        title: "Activez : c'est en ligne et opérationnel",
        description:
          "Commencez à récolter vos leads et vos demandes directement par email ou par SMS sur votre téléphone.",
      },
    ],
    conversation: [
      { from: "user" as const, text: "Vous intervenez sur quel secteur ?" },
      {
        from: "bot" as const,
        text: "Toute la région Île-de-France. Vous cherchez un rendez-vous ?",
      },
      { from: "user" as const, text: "Quels sont vos tarifs ?" },
      {
        from: "bot" as const,
        text: "Ça dépend du besoin. Je vous mets en relation avec [Nom], votre numéro ?",
      },
      { from: "user" as const, text: "Je veux un devis" },
      { from: "bot" as const, text: "Parfait, je transmets votre demande. Votre email ?" },
    ],
  },
  infra: {
    eyebrow: "Chaque matin",
    title: "Les conversations",
    titleLine2: "de vos visiteurs",
    titleMuted: "chaque matin dans votre boîte mail",
    p1: "Que disent vos visiteurs ? Qu'est-ce qu'ils demandent ?",
    p2: "Faites évoluer votre offre selon les remontées des visiteurs.",
    p3: "Collez à la demande et à l'évolution des demandes, à l'heure de la révolution IA.",
    inboxTitle: "Boîte de réception",
    favorites: "Favoris",
    inbox: "Boîte de réception",
    folders: ["Réception", "Envoyés", "Brouillons"],
    selectedFrom: "Talker",
    selectedSubject: "Rapport Talker — Fuite week-end",
    selectedTime: "07:18",
    objet: "Objet : compte-rendu conversation Talker",
    to: "À vous@votre-site.fr",
    date: "23 août 2026 à 07:18",
    reportTitle: "Rapport Talker",
    reportMeta: "23 août 2026 · 07:18 — 07:19",
    transcriptBadge: "Transcription de l'échange",
    conversation: "Conversation",
    client: "Client",
    yesterday: "Hier",
    transcript: [
      { who: "client" as const, time: "07:18", text: "Vous intervenez le week-end ?" },
      {
        who: "talker" as const,
        time: "07:18",
        text: "Oui, majoration de 25% le samedi. Quel est votre besoin ?",
      },
      { who: "client" as const, time: "07:19", text: "Fuite d'eau urgente." },
      {
        who: "talker" as const,
        time: "07:19",
        text: "Je vous mets en contact. Votre numéro ?",
      },
    ],
    dummies: [
      { from: "Agenda", subject: "Rappel : 10h", time: "06:44" },
      { from: "Documents", subject: "Facture août", time: "Hier" },
      { from: "Notification", subject: "Confirmation de lecture", time: "Hier" },
    ],
  },
  metrics: {
    eyebrow: "Indicateurs",
    title: "votre tableau de bord,",
    titleMuted: "en direct",
    live: "Live",
    items: [
      { value: 847, suffix: "", label: "Conversations traitées ce mois-ci" },
      { value: 92, suffix: "%", label: "Taux de réponse avant abandon du prospect" },
      { value: 6, suffix: " sec", label: "Temps de réponse moyen" },
      { value: 312, suffix: "", label: "Coordonnées collectées ce mois-ci" },
    ],
  },
  integrations: {
    eyebrow: "Intégrations",
    title: "Compatible avec WordPress,",
    titleMuted: "sans rien changer à votre site.",
    body: "Une extension à installer depuis le store WordPress. Fonctionne avec la plupart des thèmes et constructeurs de pages (Elementor, Divi, etc.).",
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Un tarif clair.",
    titleMuted: "Pas de surprise.",
    lead: "Testez gratuitement, passez à la vitesse supérieure quand vous êtes prêt. Aucun frais caché.",
    monthly: "Mensuel",
    annual: "Annuel",
    toggle: "Basculer facturation annuelle",
    perMonth: "/mois",
    popular: "Le plus choisi",
    shopify:
      "Shopify et WooCommerce — 59 € pour un site. À partir de 10 sites : 29 € par site.",
    plans: [
      {
        key: "starter",
        name: "Starter",
        title: "Starter",
        description: "Pour tester sans engagement",
        cta: "Créer mon agent gratuitement",
        features: [
          "1 Talker",
          "100 conversations/mois",
          "1 canal (site web)",
          "Support par email",
        ],
      },
      {
        key: "pro",
        name: "Pro",
        title: "Pro",
        description: "Pour les TPE et PME qui veulent convertir",
        cta: "Installer",
        features: [
          "1 Talker",
          "Conversations illimitées",
          "Tous les canaux (site, WhatsApp, Instagram, Facebook, SMS)",
          "Capture automatique téléphone / email",
          "Alertes par SMS (ou tout de suite)",
          "Collecte d'avis Google",
          "Marque blanche",
        ],
      },
      {
        key: "agency3",
        name: "Agence · 3",
        title: "Agences et entreprises",
        description: "3 sites",
        cta: "Installer",
        features: ["3 Talker", "Tout Pro inclus", "Marque blanche"],
      },
      {
        key: "agency10",
        name: "Agence · 10",
        title: "Agences et entreprises",
        description: "10 sites",
        cta: "Installer",
        features: [
          "10 Talker",
          "Tout Pro inclus",
          "Un agent par site et par établissement",
          "Tableau de bord multi-comptes",
          "Marque blanche",
        ],
      },
    ],
  },
  cta: {
    line1: "Talker répond.",
    line2: "Talker vend.",
    line3: "à votre place.",
    createAgent: "Créer mon agent gratuitement",
    noCard: "Sans carte bancaire",
  },
  footer: {
    blurb:
      "L'agent conversationnel qui répond, capte et vend à la place de votre standard. Installé en 5 minutes, actif 24h/24.",
    copyright: "© 2026 Talker. Tous droits réservés.",
    systems: "Tous les systèmes opérationnels",
    columns: [
      {
        title: "Produit",
        links: [
          { name: "Fonctionnalités", href: "#features" },
          { name: "Comment ça marche", href: "#how-it-works" },
          { name: "Tarifs", href: "#pricing" },
          { name: "Intégrations", href: "#integrations" },
          { name: "Cas d'usage", href: "#cas-usage" },
        ],
      },
      {
        title: "Ressources",
        links: [
          { name: "Centre d'aide", href: "#" },
          { name: "Guide d'installation", href: "#" },
          { name: "Modèles de scripts", href: "#" },
          { name: "Statut du service", href: "#" },
        ],
      },
      {
        title: "Entreprise",
        links: [
          { name: "À propos", href: "#" },
          { name: "Blog", href: "#" },
          { name: "Recrutement", href: "#" },
          { name: "Contact", href: "/contact" },
          { name: "Devenir partenaire", href: "#" },
        ],
      },
      {
        title: "Légal",
        links: [
          { name: "Confidentialité", href: "#" },
          { name: "CGU/CGV", href: "#" },
          { name: "Mentions légales", href: "#" },
          { name: "RGPD", href: "#" },
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    titleMuted: "On vous répond.",
    lead1: "Vous installez. Talker parle. Les demandes arrivent.",
    lead2: "Pas un ticket. Une conversation.",
    name: "Nom",
    company: "Société",
    email: "Email",
    phone: "Téléphone",
    message: "Message",
    send: "Envoyer",
    success: "C’est transmis. On vous écrit à cette adresse.",
  },
  bubble: {
    open: "Ouvrir Talker",
    close: "Fermer",
    closeTalker: "Fermer Talker",
    assistant: "L'assistant du cabinet",
    placeholder: "Posez votre question...",
    send: "Envoyer",
    writing: "Talker écrit",
    chips: [
      { label: "Quels sont vos horaires ?", intent: "horaires" as const },
      { label: "Poser une question", intent: "question" as const },
      { label: "Prendre rendez-vous", intent: "rdv" as const },
    ],
  },
  notFound: {
    title: "Cette page n’existe pas.",
    back: "Retour à talker.now",
  },
  demoSteps: {
    start: {
      id: "start",
      bot: "Bonjour. Je suis l'assistant du cabinet. Je peux vous donner les horaires, prendre un rendez-vous, ou transmettre une question.",
      chips: [
        {
          label: "Quels sont vos horaires ?",
          userText: "Quels sont vos horaires ?",
          next: "horaires",
        },
        { label: "Poser une question", userText: "J'ai une question.", next: "question" },
        { label: "Prendre rendez-vous", userText: "Prendre rendez-vous", next: "rdv" },
      ],
    },
    horaires: {
      id: "horaires",
      bot: "Nous recevons du lundi au vendredi, 9 h – 18 h, et un samedi sur deux le matin. Souhaitez-vous un créneau ?",
      chips: [
        { label: "Prendre rendez-vous", userText: "Prendre rendez-vous", next: "rdv" },
        { label: "Une autre question", userText: "Une autre question", next: "question" },
      ],
    },
    rdv: {
      id: "rdv",
      bot: "Dites-moi un moment qui vous arrange. Sur un vrai site, Talker irait chercher les disponibilités dans l'agenda — ici, c'est une démo.",
      chips: [
        { label: "Demain matin", userText: "Demain matin", next: "email" },
        { label: "En fin de semaine", userText: "En fin de semaine", next: "email" },
        { label: "Une question", userText: "Une question", next: "question" },
      ],
    },
    question: {
      id: "question",
      bot: "Je vous écoute. J'enregistre votre demande et le cabinet vous répond.",
      chips: [
        { label: "Un premier rendez-vous", userText: "Un premier rendez-vous", next: "rdv" },
        { label: "Un rappel téléphone", userText: "Un rappel téléphone", next: "email" },
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
  } satisfies Record<string, DemoStep>,
};

export type Messages = typeof fr;
