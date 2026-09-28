export type LegalSection = {
  title: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
};

export type LegalPage = {
  title: string;
  notice: string;
  sections: LegalSection[];
};

export type SitePages = {
  recrutement: {
    title: string;
    lead: string;
    cta: string;
  };
  methode: {
    eyebrow: string;
    title: string;
    subhead: string;
    traficTitle: string;
    traficBody: string;
    traficFollow: string;
    faqLabel: string;
    zipTitle: string;
    zipLead: string;
    steps: string[];
    installLabel: string;
  };
  privacy: LegalPage;
  terms: LegalPage;
  mentions: LegalPage;
  gdpr: LegalPage;
};

export const pagesFr: SitePages = {
  recrutement: {
    title: "Recrutement",
    lead: "Aucun poste n’est ouvert. Talker est un produit zip : un agent conversationnel à déposer sur WordPress, pour les équipes qui n’ont personne pour tenir un live chat. Une candidature spontanée se lit à hello@talker.now.",
    cta: "Écrire à hello@talker.now",
  },
  methode: {
    eyebrow: "Méthode",
    title: "La méthode Talker",
    subhead:
      "Plugin WordPress : zip, activer, les visiteurs ont une réponse — sans live chat.",
    traficTitle: "Comment l’agent convertit avec moins de trafic ?",
    traficBody:
      "Les réponses des IA (ChatGPT, Gemini, aperçus IA des moteurs) prennent une partie du trafic des pages qui répondaient autrefois à ces questions. Moins de visites ne veut pas dire moins besoin de transformer.",
    traficFollow:
      "Talker place un agent conversationnel — un agent IA — sur votre site WordPress pour maintenir ou augmenter la transformation avec moins de trafic : questions métier, ton de votre entreprise, captation du contact. Ce n’est pas « remplacer Google », c’est convertir les visites qui restent. Le détail est dans la",
    faqLabel: "FAQ",
    zipTitle: "Du zip à la conversation",
    zipLead:
      "Le second geste de la méthode : de l’installation à l’agent en ligne. Pas de démo à réserver.",
    steps: [
      "Télécharger le zip.",
      "L’ajouter dans WordPress : Extensions, puis Ajouter.",
      "Talker scanne les pages publiques, puis pose quelques questions / réponses (métier, besoins, coordonnées).",
      "L’agent est en ligne et parle aux visiteurs.",
    ],
    installLabel: "Voir l’installation",
  },
  mentions: {
    title: "Mentions légales",
    notice:
      "Brouillon. La raison sociale, le SIRET, l’adresse du siège et le directeur de la publication ne sont pas publiés ici. Aucun numéro n’est inventé.",
    sections: [
      {
        title: "Éditeur",
        paragraphs: [
          "Le site talker.now présente Talker, un agent conversationnel pour WordPress.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "Pour joindre l’éditeur, écrire à hello@talker.now. C’est aussi l’adresse pour toute demande sur ces mentions.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Immatriculation",
        paragraphs: [
          "Forme juridique, capital, SIRET, RCS, adresse du siège et directeur de la publication seront ajoutés sur cette page dès qu’ils sont arrêtés. En attendant, ils ne sont pas remplacés par des valeurs fictives.",
        ],
      },
      {
        title: "Hébergement",
        paragraphs: [
          "Le site est hébergé par Vercel Inc. Les coordonnées de l’hébergeur sont publiées sur vercel.com.",
        ],
        links: [{ href: "https://vercel.com", label: "vercel.com" }],
      },
    ],
  },
  privacy: {
    title: "Confidentialité",
    notice:
      "Brouillon. L’identité légale du responsable sera celle des mentions légales dès qu’elle est publiée. Le contact reste hello@talker.now.",
    sections: [
      {
        title: "Responsable",
        paragraphs: [
          "Les questions sur vos données se posent à hello@talker.now. Le SIRET et l’adresse du siège ne sont pas encore sur les mentions légales.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Formulaire de contact",
        paragraphs: [
          "Le formulaire demande un nom, une société, un email, un téléphone et un message, pour pouvoir vous répondre. Ces champs sont journalisés par le serveur du site. Ils ne sont pas vendus.",
        ],
      },
      {
        title: "Cookies et stockage dans le navigateur",
        paragraphs: [
          "Nécessaires : un cookie d’accès (talker_site_gate) tant que le site n’est pas public ; un cookie et une entrée locale (talker_consent, 6 mois) pour mémoriser votre choix ; la langue (talker-lang) dans le navigateur.",
          "La démo de conversation garde le fil dans l’onglet (sessionStorage). Fermer l’onglet l’efface.",
        ],
      },
      {
        title: "Mesure d’audience",
        paragraphs: [
          "Si vous acceptez, le site charge Google Analytics 4, identifiant G-ZCPSJ5XXD7. Google reçoit alors des informations de visite (pages vues, appareil, localisation approximative).",
          "Si vous refusez, aucun script Google n’est ajouté et aucun ping n’est envoyé. Le lien Cookies en pied de page rouvre le choix.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          "Accès, rectification, effacement, opposition, limitation et portabilité : écrire à hello@talker.now. Vous pouvez aussi saisir la CNIL.",
        ],
        links: [
          { href: "mailto:hello@talker.now", label: "hello@talker.now" },
          { href: "https://www.cnil.fr", label: "cnil.fr" },
        ],
      },
    ],
  },
  terms: {
    title: "CGU / CGV",
    notice:
      "Brouillon. Ce texte décrit le site tel qu’il est en ligne. Il sera remplacé par des conditions définitives. Il n’ajoute pas d’engagement commercial.",
    sections: [
      {
        title: "Le site",
        paragraphs: [
          "talker.now est une vitrine. Vous pouvez la lire, écrire via le formulaire de contact, et télécharger le zip WordPress décrit sur la page d’installation.",
        ],
        links: [{ href: "/installer", label: "Télécharger" }],
      },
      {
        title: "Le zip",
        paragraphs: [
          "Le fichier s’active dans WordPress. Le geste est décrit sur la page d’installation. Cette vitrine ne demande pas de carte bancaire pour le téléchargement.",
        ],
      },
      {
        title: "Tarifs affichés",
        paragraphs: [
          "Les prix montrés sur la vitrine décrivent les offres. Ils peuvent changer. Aucun parcours de paiement n’est ouvert depuis ces pages.",
        ],
      },
      {
        title: "Contact",
        paragraphs: ["Une question sur ces conditions : hello@talker.now."],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
    ],
  },
  gdpr: {
    title: "RGPD",
    notice:
      "Brouillon opérationnel. Les droits ci-dessous s’exercent auprès de hello@talker.now.",
    sections: [
      {
        title: "Ce que le site fait",
        paragraphs: [
          "La mesure d’audience ne se charge qu’avec votre accord. Les cookies nécessaires (accès, mémorisation du choix, langue) ne servent pas à de la publicité.",
        ],
        links: [{ href: "/confidentialite", label: "Confidentialité" }],
      },
      {
        title: "Droits",
        paragraphs: [
          "Vous pouvez demander l’accès, la rectification, l’effacement, la limitation, la portabilité, et vous opposer à un traitement. Écrire à hello@talker.now en précisant la demande.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Retirer l’accord",
        paragraphs: [
          "Le lien Cookies en pied de page rouvre le bandeau. Refuser coupe la mesure d’audience pour la suite, sur ce navigateur.",
        ],
      },
      {
        title: "Réclamation",
        paragraphs: [
          "Si la réponse ne convient pas, la CNIL reçoit les réclamations.",
        ],
        links: [{ href: "https://www.cnil.fr", label: "cnil.fr" }],
      },
    ],
  },
};

export const pagesEn: SitePages = {
  recrutement: {
    title: "Careers",
    lead: "No open roles. Talker is a zip product: a conversational agent you drop on WordPress, for teams with nobody to staff a live chat. Spontaneous applications go to hello@talker.now.",
    cta: "Email hello@talker.now",
  },
  methode: {
    eyebrow: "Method",
    title: "The Talker method",
    subhead:
      "WordPress plugin: zip, activate, visitors get an answer — no live chat to staff.",
    traficTitle: "How does the agent convert with less traffic?",
    traficBody:
      "AI answers (ChatGPT, Gemini, search AI overviews) take some of the traffic that pages used to get for those questions. Fewer visits does not mean less need to turn a visit into a contact.",
    traficFollow:
      "Talker places a conversational agent — an AI agent — on your WordPress site to keep or raise conversion with less traffic: trade questions, your company’s tone, contact capture. This is not “replacing Google”. It converts the visits that remain. Detail is in the",
    faqLabel: "FAQ",
    zipTitle: "From the zip to the conversation",
    zipLead:
      "The second move of the method: from install to a live agent. No demo to book.",
    steps: [
      "Download the zip.",
      "Add it in WordPress: Plugins, then Add New.",
      "Talker scans the public pages, then asks a few questions and answers (trade, needs, contact details).",
      "The agent is live and talks to visitors.",
    ],
    installLabel: "See installation",
  },
  mentions: {
    title: "Legal notice",
    notice:
      "Draft. Legal name, company number, registered office, and publication director are not published here. No number is invented.",
    sections: [
      {
        title: "Publisher",
        paragraphs: [
          "talker.now presents Talker, a conversational agent for WordPress.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "Write to hello@talker.now. That is also the address for questions about this notice.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Registration",
        paragraphs: [
          "Legal form, share capital, company number, registered office, and publication director will be added here once they are settled. They are not replaced with placeholder numbers.",
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          "The site is hosted by Vercel Inc. The host’s details are on vercel.com.",
        ],
        links: [{ href: "https://vercel.com", label: "vercel.com" }],
      },
    ],
  },
  privacy: {
    title: "Privacy",
    notice:
      "Draft. The legal identity of the controller will match the legal notice once it is published. Contact remains hello@talker.now.",
    sections: [
      {
        title: "Controller",
        paragraphs: [
          "Questions about your data go to hello@talker.now. Company number and registered office are not on the legal notice yet.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Contact form",
        paragraphs: [
          "The form asks for a name, company, email, phone, and message so we can reply. Those fields are logged by the site server. They are not sold.",
        ],
      },
      {
        title: "Cookies and browser storage",
        paragraphs: [
          "Necessary: an access cookie (talker_site_gate) while the site is not public; a cookie and a local entry (talker_consent, 6 months) that remember your choice; language (talker-lang) in the browser.",
          "The conversation demo keeps the thread in the tab (sessionStorage). Closing the tab clears it.",
        ],
      },
      {
        title: "Audience measurement",
        paragraphs: [
          "If you accept, the site loads Google Analytics 4, measurement ID G-ZCPSJ5XXD7. Google then receives visit information (pages, device, approximate location).",
          "If you refuse, no Google script is added and no ping is sent. The Cookies link in the footer reopens the choice.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "Access, correction, deletion, objection, restriction, and portability: write to hello@talker.now. You can also contact the CNIL.",
        ],
        links: [
          { href: "mailto:hello@talker.now", label: "hello@talker.now" },
          { href: "https://www.cnil.fr", label: "cnil.fr" },
        ],
      },
    ],
  },
  terms: {
    title: "Terms",
    notice:
      "Draft. This text describes the site as it is online. It will be replaced by final terms. It does not add a commercial commitment.",
    sections: [
      {
        title: "The site",
        paragraphs: [
          "talker.now is a marketing site. You can read it, write through the contact form, and download the WordPress zip described on the install page.",
        ],
        links: [{ href: "/installer", label: "Download" }],
      },
      {
        title: "The zip",
        paragraphs: [
          "The file is activated in WordPress. The steps are on the install page. This site does not ask for a card to download it.",
        ],
      },
      {
        title: "Prices shown",
        paragraphs: [
          "Prices on the site describe the offers. They can change. No checkout is open from these pages.",
        ],
      },
      {
        title: "Contact",
        paragraphs: ["A question about these terms: hello@talker.now."],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
    ],
  },
  gdpr: {
    title: "GDPR",
    notice: "Working draft. The rights below are exercised at hello@talker.now.",
    sections: [
      {
        title: "What the site does",
        paragraphs: [
          "Audience measurement loads only with your consent. Necessary cookies (access, remembering the choice, language) are not used for advertising.",
        ],
        links: [{ href: "/confidentialite", label: "Privacy" }],
      },
      {
        title: "Rights",
        paragraphs: [
          "You can ask for access, correction, deletion, restriction, portability, and object to a processing. Write to hello@talker.now and say what you need.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Withdraw consent",
        paragraphs: [
          "The Cookies link in the footer reopens the banner. Refusing stops audience measurement afterwards, on this browser.",
        ],
      },
      {
        title: "Complaint",
        paragraphs: ["If the reply is not enough, the CNIL takes complaints."],
        links: [{ href: "https://www.cnil.fr", label: "cnil.fr" }],
      },
    ],
  },
};
