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
  apropos: {
    title: string;
    lead: string;
    sections: LegalSection[];
  };
  recrutement: {
    title: string;
    lead: string;
    sections: LegalSection[];
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
  apropos: {
    title: "À propos",
    lead: "Talker est un agent conversationnel, un chatbot IA, pour WordPress. Le produit est un zip à déposer sur un site déjà en ligne.",
    sections: [
      {
        title: "Éditeur",
        paragraphs: [
          "Le site talker.now présente Talker. Le véhicule prévu est une OÜ de droit estonien, en cours de constitution. Le siège prévu est en Estonie. Pour joindre l’éditeur : hello@talker.now.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Directeur de la publication",
        paragraphs: ["Jean-François Chauffeté."],
      },
      {
        title: "Identité légale",
        paragraphs: [
          "Pas de numéro de registre, pas de capital, pas d’adresse de rue : la société n’est pas encore créée. Le texte complet est sur les mentions légales.",
        ],
        links: [{ href: "/mentions-legales", label: "Mentions légales" }],
      },
      {
        title: "Hébergement",
        paragraphs: ["Le site est hébergé par Vercel Inc."],
        links: [
          { href: "/mentions-legales", label: "Mentions légales" },
          { href: "https://vercel.com", label: "vercel.com" },
        ],
      },
      {
        title: "Une conversation avec une IA",
        paragraphs: [
          "Talker est un agent conversationnel propulsé par l’IA, un chatbot pour WordPress. Le visiteur parle à un logiciel, pas à un salarié de Talker. Cette page le dit ; le rappel dans la fenêtre de chat viendra plus tard dans le produit.",
          "Une réponse peut être incomplète ou fausse. Ce n’est pas un avis juridique, médical, financier ou professionnel.",
          "Celui qui installe Talker choisit le contenu et les réglages. Il reste responsable de ce que les visiteurs voient, et de la suite avec un humain.",
          "Une question sur Talker, la société ou le produit : hello@talker.now.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
    ],
  },
  recrutement: {
    title: "Recrutement",
    lead: "Aucun poste n’est ouvert. Talker est un produit zip : un agent conversationnel à déposer sur WordPress. Une candidature spontanée se lit à hello@talker.now.",
    sections: [
      {
        title: "Pourquoi écrire quand même",
        paragraphs: [
          "Un poste fermé n’empêche pas un message court. Quand un besoin se présente, on relit d’abord les candidatures déjà reçues.",
        ],
      },
      {
        title: "Ce que l’on regarde",
        paragraphs: [
          "Des gens qui construisent : un plugin, une page, un parcours. Une pratique de WordPress ou du produit. Une écriture française claire.",
        ],
      },
      {
        title: "Comment écrire",
        paragraphs: [
          "Cinq lignes sur ce que vous faites, un CV, et un lien — site, dépôt ou texte. Pas de formulaire.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "À égalité",
        paragraphs: [
          "Chaque message est lu de la même façon, quel que soit le parcours.",
        ],
      },
    ],
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
      "OÜ estonienne en cours de constitution. Le numéro de registre, le capital et l’adresse de rue seront ajoutés ici dès que la société existe.",
    sections: [
      {
        title: "Éditeur",
        paragraphs: [
          "Le site talker.now présente Talker, un agent conversationnel pour WordPress.",
          "Le véhicule juridique prévu est une OÜ de droit estonien, en cours de constitution via Xolo Leap. L’e-Residency est en place. La société n’est pas encore créée. Le siège prévu est en Estonie.",
        ],
        links: [
          { href: "https://talker.now", label: "talker.now" },
          { href: "mailto:hello@talker.now", label: "hello@talker.now" },
        ],
      },
      {
        title: "Directeur de la publication",
        paragraphs: ["Jean-François Chauffeté."],
      },
      {
        title: "Contact",
        paragraphs: [
          "Pour joindre l’éditeur : hello@talker.now. C’est aussi l’adresse pour toute demande sur ces mentions.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Immatriculation",
        paragraphs: [
          "Pas de numéro de registre, pas de capital, pas de numéro de TVA, pas d’adresse de rue. Ils seront ajoutés sur cette page dès que l’OÜ existe. Aucune valeur fictive n’est mise à la place.",
        ],
      },
      {
        title: "Hébergement",
        paragraphs: [
          "Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.",
        ],
        links: [{ href: "https://vercel.com", label: "vercel.com" }],
      },
    ],
  },
  privacy: {
    title: "Confidentialité",
    notice:
      "Contact : hello@talker.now. L’identité du responsable est celle des mentions légales.",
    sections: [
      {
        title: "Responsable",
        paragraphs: [
          "Les questions sur vos données se posent à hello@talker.now. L’identité publiée est sur les mentions légales : OÜ estonienne en cours de constitution, directeur de la publication Jean-François Chauffeté. Le numéro de registre sera ajouté quand la société existera.",
        ],
        links: [
          { href: "mailto:hello@talker.now", label: "hello@talker.now" },
          { href: "/mentions-legales", label: "Mentions légales" },
        ],
      },
      {
        title: "Formulaire de contact",
        paragraphs: [
          "Le formulaire demande un nom, une société, un email, un téléphone et un message, pour pouvoir vous répondre. Ces champs sont journalisés par le serveur du site. Ils ne sont pas vendus.",
        ],
      },
      {
        title: "Cookies",
        paragraphs: [
          "Deux familles. Les cookies nécessaires au site sont posés sans bandeau. La mesure d’audience ne se charge qu’après un accord. Le lien Cookies en pied de page rouvre ce choix.",
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
  apropos: {
    title: "About",
    lead: "Talker is a conversational agent, an AI chatbot, for WordPress. The product is a zip you drop on a site that is already online.",
    sections: [
      {
        title: "Publisher",
        paragraphs: [
          "talker.now presents Talker. The planned vehicle is an Estonian private limited company (OÜ), still being formed. The planned registered office is in Estonia. To reach the publisher: hello@talker.now.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Publication director",
        paragraphs: ["Jean-François Chauffeté."],
      },
      {
        title: "Legal identity",
        paragraphs: [
          "No registry number, no share capital, no street address: the company does not exist yet. The full text is on the legal notice.",
        ],
        links: [{ href: "/mentions-legales", label: "Legal notice" }],
      },
      {
        title: "Hosting",
        paragraphs: ["The site is hosted by Vercel Inc."],
        links: [
          { href: "/mentions-legales", label: "Legal notice" },
          { href: "https://vercel.com", label: "vercel.com" },
        ],
      },
      {
        title: "A conversation with AI",
        paragraphs: [
          "Talker is an AI-powered conversational agent, a chatbot for WordPress. The visitor talks to software, not to an employee of Talker. This page says so; a reminder inside the chat window will come later in the product.",
          "An answer can be incomplete or wrong. It is not legal, medical, financial, or professional advice.",
          "Whoever installs Talker chooses the content and the settings. They remain responsible for what visitors see, and for any follow-up with a human.",
          "A question about Talker, the company or the product: hello@talker.now.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
    ],
  },
  recrutement: {
    title: "Careers",
    lead: "No open roles. Talker is a zip product: a conversational agent you drop on WordPress. Spontaneous applications go to hello@talker.now.",
    sections: [
      {
        title: "Why write anyway",
        paragraphs: [
          "A closed role does not block a short note. When a need shows up, we reread applications already received first.",
        ],
      },
      {
        title: "What we look at",
        paragraphs: [
          "People who build: a plugin, a page, a flow. WordPress or product practice. Clear French writing.",
        ],
      },
      {
        title: "How to apply",
        paragraphs: [
          "Five lines on what you do, a CV, and a link — a site, a repo, or a piece of writing. No form.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Equal opportunity",
        paragraphs: [
          "Every note is read the same way, whatever the path.",
        ],
      },
    ],
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
      "Estonian OÜ being formed. The registry number, share capital, and street address will be added here once the company exists.",
    sections: [
      {
        title: "Publisher",
        paragraphs: [
          "talker.now presents Talker, a conversational agent for WordPress.",
          "The planned legal vehicle is an Estonian private limited company (OÜ), being formed via Xolo Leap. e-Residency is in place. The company is not created yet. The planned registered office is in Estonia.",
        ],
        links: [
          { href: "https://talker.now", label: "talker.now" },
          { href: "mailto:hello@talker.now", label: "hello@talker.now" },
        ],
      },
      {
        title: "Publication director",
        paragraphs: ["Jean-François Chauffeté."],
      },
      {
        title: "Contact",
        paragraphs: [
          "To reach the publisher: hello@talker.now. That is also the address for questions about this notice.",
        ],
        links: [{ href: "mailto:hello@talker.now", label: "hello@talker.now" }],
      },
      {
        title: "Registration",
        paragraphs: [
          "No registry number, no share capital, no VAT number, no street address. They will be added on this page once the OÜ exists. No placeholder value is put in their place.",
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          "The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.",
        ],
        links: [{ href: "https://vercel.com", label: "vercel.com" }],
      },
    ],
  },
  privacy: {
    title: "Privacy",
    notice:
      "Contact: hello@talker.now. The controller’s published identity is the legal notice.",
    sections: [
      {
        title: "Controller",
        paragraphs: [
          "Questions about your data go to hello@talker.now. The published identity is on the legal notice: an Estonian OÜ being formed, publication director Jean-François Chauffeté. The registry number will be added when the company exists.",
        ],
        links: [
          { href: "mailto:hello@talker.now", label: "hello@talker.now" },
          { href: "/mentions-legales", label: "Legal notice" },
        ],
      },
      {
        title: "Contact form",
        paragraphs: [
          "The form asks for a name, company, email, phone, and message so we can reply. Those fields are logged by the site server. They are not sold.",
        ],
      },
      {
        title: "Cookies",
        paragraphs: [
          "Two kinds. Necessary cookies are set without a banner. Audience measurement loads only after you accept. The Cookies link in the footer reopens that choice.",
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
