export const METHODE_META = {
  title: "Talker — la méthode pour répondre aux visiteurs sur WordPress",
  description:
    "Comment Talker lit le site, traite objections et métier, et envoie les conversations. Sources citées, pas de chiffres inventés.",
  h1: "La méthode Talker",
  subhead:
    "Plugin WordPress : zip, activer, les visiteurs ont une réponse — sans live chat.",
} as const;

export const METHODE_SOURCES = {
  hubspot:
    "https://blog.hubspot.com/marketing/how-chatbot-generated-more-qualified-leads",
  drift:
    "https://www.prnewswire.com/news-releases/marketers-get-candid-about-customer-engagement-in-drift-state-of-conversational-marketing-report-301404547.html",
  gartner:
    "https://www.gartner.com/en/newsroom/press-releases/2023-06-15-gartner-survey-reveals-only-8-percent-of-customers-used-a-chatbot-during-their-most-recent-customer-service-interaction",
  salesforce:
    "https://www.salesforce.com/news/stories/customer-service-statistics-2024/",
  observatoire:
    "https://www.escda.fr/docs/Observatoire_des_Services_Clients_BVA_Xsight_ESCDA_2023.pdf",
  zendesk: "https://www.zendesk.com/newsroom/press-releases/cx-trends-2024/",
  bitkom:
    "https://www.bitkom.org/sites/main/files/2024-09/bitkom-studie-digital-office-index-2024.pdf",
  intercom:
    "https://www.intercom.com/blog/state-of-ai-in-customer-service-2023-report/",
} as const;

export type MethodeLink = {
  href: string;
  text: string;
  internal?: boolean;
};

export type MethodeInline = string | MethodeLink;

export type MethodeBlock =
  | { type: "p"; parts: MethodeInline[] }
  | { type: "h3"; title: string }
  | { type: "ul"; items: MethodeInline[][] }
  | { type: "callout"; title: string; items: string[] };

export type MethodeFaqItem = { q: string; a: string };

export type MethodeCopy = {
  eyebrow: string;
  h1: string;
  subhead: string;
  intro: MethodeInline[][];
  sections: {
    id: string;
    h2: string;
    blocks: MethodeBlock[];
  }[];
  faqTitle: string;
  faq: MethodeFaqItem[];
};

export function isMethodeLink(part: MethodeInline): part is MethodeLink {
  return typeof part === "object";
}

const S = METHODE_SOURCES;

export const methodeFr: MethodeCopy = {
  eyebrow: "Méthode",
  h1: METHODE_META.h1,
  subhead: METHODE_META.subhead,
  intro: [
    [
      "Talker est un plugin WordPress. Il lit les pages publiques du site, qualifie le visiteur, et envoie les conversations par mail.",
    ],
    [
      "Cette page décrit la méthode — ce que Talker lit, comment il qualifie, quand il doit se taire, et ce que disent les études. Chaque chiffre a un lien vers une source primaire. Rien n’est inventé.",
    ],
  ],
  sections: [
    {
      id: "trafic",
      h2: "Comment l’agent convertit avec moins de trafic ?",
      blocks: [
        {
          type: "p",
          parts: [
            "Les réponses des IA (ChatGPT, Gemini, aperçus IA des moteurs) prennent une partie du trafic des pages qui répondaient autrefois à ces questions. Moins de visites ne veut pas dire moins besoin de transformer.",
          ],
        },
        {
          type: "p",
          parts: [
            "Talker place un agent conversationnel — un agent IA — sur votre site WordPress pour maintenir ou augmenter la transformation avec moins de trafic : questions métier, ton de votre entreprise, captation du contact. Ce n’est pas « remplacer Google », c’est convertir les visites qui restent. Le détail est dans la ",
            { href: "/faq", text: "FAQ", internal: true },
            ".",
          ],
        },
      ],
    },
    {
      id: "zip",
      h2: "Du zip à la conversation",
      blocks: [
        {
          type: "p",
          parts: [
            "Le second geste de la méthode : de l’installation à l’agent en ligne. Pas de démo à réserver.",
          ],
        },
        {
          type: "ul",
          items: [
            ["Télécharger le zip."],
            [
              "L’ajouter dans WordPress : Extensions, puis Ajouter. Voir ",
              { href: "/installer", text: "l’installation", internal: true },
              ".",
            ],
            [
              "Talker scanne les pages publiques, puis pose quelques questions / réponses (métier, besoins, coordonnées).",
            ],
            ["L’agent est en ligne et parle aux visiteurs."],
          ],
        },
      ],
    },
    {
      id: "site",
      h2: "1. Site : ce que Talker lit (et ce qu’il ne lit pas)",
      blocks: [
        {
          type: "p",
          parts: [
            "À l’activation, Talker parcourt les pages publiques du WordPress : accueil, prestations, horaires, zone d’intervention, contact. C’est ce crawl qui cadre le métier. Il n’y a pas de téléversement de fichiers, pas de base documentaire à nourrir.",
          ],
        },
        {
          type: "p",
          parts: [
            "Le geste reste court : zip, activer, la bulle est sur le site. Voir ",
            { href: "/installer", text: "l’installation", internal: true },
            ".",
          ],
        },
        { type: "h3", title: "Ce que ce n’est pas" },
        {
          type: "ul",
          items: [
            [
              "Un live chat à tenir. Personne n’est derrière l’écran.",
            ],
            [
              "Un RAG fichier : pas de dump PDF, pas d’index à surveiller.",
            ],
            [
              "Un tableau de bord fantaisiste qui affiche des taux inventés.",
            ],
          ],
        },
      ],
    },
    {
      id: "conversion",
      h2: "2. Conversion : qualifier, pas « convertir à 82 % »",
      blocks: [
        {
          type: "p",
          parts: [
            "La méthode n’est pas « convertir à 82 % ». Elle est plus courte : engager, qualifier, prendre un contact, remettre le fil à un humain par mail.",
          ],
        },
        {
          type: "p",
          parts: [
            "HubSpot, dans une expérience ",
            {
              href: S.hubspot,
              text: "Made@HubSpot",
            },
            ", a comparé un bot à leur live chat : ",
            { href: S.hubspot, text: "75 % d’engagement en plus" },
            ", et plus de ",
            {
              href: S.hubspot,
              text: "55 % des visiteurs ont répondu aux questions de qualification",
            },
            ". Le titre de l’article (« 182 % more qualified leads ») va plus loin que le corps de l’expérience — on le cite avec cette réserve.",
          ],
        },
        {
          type: "p",
          parts: [
            "Drift et Heinz (2021) écrivent que ",
            {
              href: S.drift,
              text: "82 % des marketeurs trouvent le marketing conversationnel IA « très utile »",
            },
            ". Ce n’est pas un taux de conversion.",
          ],
        },
        { type: "h3", title: "Ce qu’on ne reprend pas" },
        {
          type: "ul",
          items: [
            ["Les pourcentages de conversion Chatbase sans source primaire."],
            ["Le ROI interne Tidio à 1 275 %."],
            [
              "Un « taux de conversion WordPress du secteur » inventé.",
            ],
          ],
        },
      ],
    },
    {
      id: "objections",
      h2: "3. Objections : quand le bot doit (et ne doit pas) répondre",
      blocks: [
        {
          type: "p",
          parts: [
            "Gartner (2023) : seulement ",
            {
              href: S.gartner,
              text: "8 % des clients ont utilisé un chatbot",
            },
            " lors de leur dernière interaction de service ; ",
            { href: S.gartner, text: "25 % le réutiliseraient" },
            ". La résolution varie fortement selon le type de problème (",
            { href: S.gartner, text: "58 % contre 17 %" },
            ").",
          ],
        },
        {
          type: "p",
          parts: [
            "Salesforce, State of Service 2024 : ",
            {
              href: S.salesforce,
              text: "72 % des clients ne réutilisent pas le chatbot d’une entreprise après une seule mauvaise expérience",
            },
            ".",
          ],
        },
        {
          type: "p",
          parts: [
            "En France, l’",
            {
              href: S.observatoire,
              text: "Observatoire des services clients ESCDA / BVA (2023)",
            },
            " : satisfaction chatbot ",
            { href: S.observatoire, text: "52 %" },
            " contre ",
            { href: S.observatoire, text: "79 % pour le live chat" },
            " ; confiance ",
            { href: S.observatoire, text: "48 %" },
            " ; environ ",
            {
              href: S.observatoire,
              text: "4 visiteurs sur 10 basculent vers un autre canal après un échec",
            },
            ".",
          ],
        },
        {
          type: "p",
          parts: [
            "Talker n’est pas un live chat. Les conversations brutes partent par mail. Une mauvaise réponse brûle la réutilisation — d’où le crawl métier et la culture définie avec le gérant, pas une phrase générique.",
          ],
        },
      ],
    },
    {
      id: "metier",
      h2: "4. Métier : questions qui collent au site",
      blocks: [
        {
          type: "p",
          parts: [
            "Le crawl pose le cadre. Le gérant valide par QCM. Un prompt de culture — ton, interdits, ce qu’on dit de l’entreprise — complète ce que le site ne dit pas.",
          ],
        },
        {
          type: "p",
          parts: [
            "Les études TEI Forrester ou IBM sur l’IA d’entreprise ne sont pas la preuve d’un ROI pour une TPE de 5 à 30 personnes. On ne les reprend pas ici comme si elles s’appliquaient.",
          ],
        },
        {
          type: "p",
          parts: [
            "Les indicateurs honnêtes, plus tard : volume, taux de contact, escalades. Quand Talker aura ses chiffres, ils seront labellisés comme données Talker — pas comme une moyenne du secteur.",
          ],
        },
      ],
    },
    {
      id: "prestations",
      h2: "5. Prestations : ce que le visiteur peut demander",
      blocks: [
        {
          type: "p",
          parts: [
            "Talker cartographie ce que le visiteur peut demander : prestations, horaires, zone, contact — à partir des pages du site, pas d’un catalogue inventé.",
          ],
        },
        {
          type: "p",
          parts: [
            "Le détail produit, l’installation et les questions fréquentes sont sur ",
            { href: "/produit", text: "Produit", internal: true },
            ", ",
            { href: "/installer", text: "Installer", internal: true },
            " et ",
            { href: "/faq", text: "FAQ", internal: true },
            ".",
          ],
        },
      ],
    },
    {
      id: "autorite",
      h2: "6. Autorité : ce que disent les études",
      blocks: [
        {
          type: "p",
          parts: [
            "Deux lectures tiennent ensemble. La friction d’abord : ",
            { href: S.gartner, text: "Gartner" },
            " et l’",
            { href: S.observatoire, text: "Observatoire" },
            " montrent un usage encore faible et une satisfaction inférieure au live chat. L’envers, parmi ceux qui utilisent déjà l’IA : ",
            {
              href: S.zendesk,
              text: "Zendesk CX Trends 2024 — 83 % des responsables CX qui utilisent l’IA générative déclarent un ROI positif",
            },
            " ; ",
            {
              href: S.salesforce,
              text: "Salesforce — 93 % des professionnels du service dans les organisations équipées d’IA disent gagner du temps",
            },
            ".",
          ],
        },
        {
          type: "p",
          parts: [
            "Bitkom (Allemagne, 2024) : ",
            {
              href: S.bitkom,
              text: "35 % des entreprises utilisent des chatbots pour des réponses automatiques",
            },
            ".",
          ],
        },
        {
          type: "p",
          parts: [
            "Le ",
            {
              href: S.intercom,
              text: "State of AI in Customer Service 2023 d’Intercom",
            },
            " décrit le même écart : l’IA aide les équipes qui l’emploient — ce n’est pas une magie de conversion.",
          ],
        },
        {
          type: "h3",
          title: "Hygiène de citation (sans dénigrement)",
        },
        {
          type: "p",
          parts: [
            "Beaucoup de pages empilent des mega-stats sans lien primaire. Talker fait l’inverse : chaque chiffre de cette page pointe vers la source nommée. On ne reprend pas un pourcentage concurrent s’il n’a pas de primaire.",
          ],
        },
        {
          type: "callout",
          title: "Position Talker",
          items: [
            "Plugin WordPress : zip, activer, la bulle est sur le site — personne ne tient un live chat.",
            "Talker lit les pages publiques. Pas de RAG fichier, pas de tableau de bord fantaisiste.",
            "La méthode : engager, qualifier, prendre un contact, envoyer le fil par mail.",
            "Une mauvaise réponse brûle la réutilisation — d’où le crawl métier et la culture définie avec le gérant.",
            "Chaque chiffre a un lien primaire. Les données Talker, quand elles existeront, seront labellisées comme telles.",
          ],
        },
      ],
    },
  ],
  faqTitle: "7. FAQ méthode",
  faq: [
    {
      q: "Talker lit-il tout le WordPress ?",
      a: "Non. Il lit les pages publiques — prestations, horaires, zone, contact. Pas vos fichiers internes, pas un dump PDF.",
    },
    {
      q: "Faut-il quelqu’un derrière le chat ?",
      a: "Non. Talker pose les questions, qualifie, et vous envoie la conversation par mail.",
    },
    {
      q: "Talker convertit-il à 82 % ?",
      a: "Non. Les 82 % de Drift / Heinz mesurent la valeur perçue du marketing conversationnel IA, pas un taux de conversion.",
    },
    {
      q: "Que se passe-t-il si une réponse est mauvaise ?",
      a: "Une mauvaise expérience brûle la réutilisation : 72 % des clients ne réutilisent pas un chatbot après un échec (Salesforce, State of Service 2024). D’où le crawl métier et la culture définie avec le gérant.",
    },
    {
      q: "Comment l’installer ?",
      a: "Zip Talker, téléverser dans WP-Admin, activer. La bulle apparaît. Le détail est sur la page Installer.",
    },
    {
      q: "Quels chiffres Talker publie-t-il ?",
      a: "Aucun KPI Talker inventé. Plus tard : volume, taux de contact, escalades — labellisés comme données Talker, pas comme une moyenne du secteur.",
    },
  ],
};

export const methodeEn: MethodeCopy = {
  eyebrow: "Method",
  h1: "The Talker method",
  subhead:
    "WordPress plugin: zip, activate, visitors get an answer — no live chat.",
  intro: [
    [
      "Talker is a WordPress plugin. It reads the public pages of the site, qualifies the visitor, and emails the conversations.",
    ],
    [
      "This page is the method — what Talker reads, how it qualifies, when it should stay quiet, and what the studies actually say. Every figure links to a primary source. Nothing is invented.",
    ],
  ],
  sections: [
    {
      id: "trafic",
      h2: "How does the agent convert with less traffic?",
      blocks: [
        {
          type: "p",
          parts: [
            "AI answers (ChatGPT, Gemini, search AI overviews) take some of the traffic that pages used to get for those questions. Fewer visits does not mean less need to turn a visit into a contact.",
          ],
        },
        {
          type: "p",
          parts: [
            "Talker places a conversational agent — an AI agent — on your WordPress site to keep or raise conversion with less traffic: trade questions, your company’s tone, contact capture. This is not “replacing Google”. It converts the visits that remain. Detail is in the ",
            { href: "/faq", text: "FAQ", internal: true },
            ".",
          ],
        },
      ],
    },
    {
      id: "zip",
      h2: "From the zip to the conversation",
      blocks: [
        {
          type: "p",
          parts: [
            "The second move of the method: from install to a live agent. No demo to book.",
          ],
        },
        {
          type: "ul",
          items: [
            ["Download the zip."],
            [
              "Add it in WordPress: Plugins, then Add New. See ",
              { href: "/installer", text: "installation", internal: true },
              ".",
            ],
            [
              "Talker scans the public pages, then asks a few questions and answers (trade, needs, contact details).",
            ],
            ["The agent is live and talks to visitors."],
          ],
        },
      ],
    },
    {
      id: "site",
      h2: "1. Site: what Talker reads (and what it does not)",
      blocks: [
        {
          type: "p",
          parts: [
            "On activation, Talker crawls the public WordPress pages: home, services, hours, coverage area, contact. That crawl frames the trade. There is no file upload, no knowledge base to feed.",
          ],
        },
        {
          type: "p",
          parts: [
            "The gesture stays short: zip, activate, the bubble is on the site. See ",
            { href: "/installer", text: "installation", internal: true },
            ".",
          ],
        },
        { type: "h3", title: "What this is not" },
        {
          type: "ul",
          items: [
            ["A live chat to staff. Nobody sits behind the screen."],
            ["File RAG: no PDF dump, no index to babysit."],
            ["A fantasy dashboard that prints invented rates."],
          ],
        },
      ],
    },
    {
      id: "conversion",
      h2: "2. Conversion: qualify, don’t “convert at 82%”",
      blocks: [
        {
          type: "p",
          parts: [
            "The method is not “convert at 82%”. It is shorter: engage, qualify, take a contact, hand the thread to a human by email.",
          ],
        },
        {
          type: "p",
          parts: [
            "HubSpot, in a ",
            { href: S.hubspot, text: "Made@HubSpot" },
            " experiment, compared a bot with their live chat: ",
            { href: S.hubspot, text: "75% more engagement" },
            ", and more than ",
            {
              href: S.hubspot,
              text: "55% of visitors answered the qualifying questions",
            },
            ". The article title (“182% more qualified leads”) goes further than the body of the experiment — we cite it with that caveat.",
          ],
        },
        {
          type: "p",
          parts: [
            "Drift and Heinz (2021) write that ",
            {
              href: S.drift,
              text: "82% of marketers find AI conversational marketing “very valuable”",
            },
            ". That is not a conversion rate.",
          ],
        },
        { type: "h3", title: "What we do not reuse" },
        {
          type: "ul",
          items: [
            ["Chatbase conversion percentages with no primary source."],
            ["Tidio’s internal 1,275% ROI."],
            ["An invented “WordPress industry conversion rate”."],
          ],
        },
      ],
    },
    {
      id: "objections",
      h2: "3. Objections: when the bot should (and should not) answer",
      blocks: [
        {
          type: "p",
          parts: [
            "Gartner (2023): only ",
            { href: S.gartner, text: "8% of customers used a chatbot" },
            " in their most recent service interaction; ",
            { href: S.gartner, text: "25% would use one again" },
            ". Resolution varies sharply by issue type (",
            { href: S.gartner, text: "58% versus 17%" },
            ").",
          ],
        },
        {
          type: "p",
          parts: [
            "Salesforce, State of Service 2024: ",
            {
              href: S.salesforce,
              text: "72% of customers will not reuse a company’s chatbot after one bad experience",
            },
            ".",
          ],
        },
        {
          type: "p",
          parts: [
            "In France, the ",
            {
              href: S.observatoire,
              text: "ESCDA / BVA Customer Service Observatory (2023)",
            },
            ": chatbot satisfaction ",
            { href: S.observatoire, text: "52%" },
            " versus ",
            { href: S.observatoire, text: "79% for live chat" },
            "; trust ",
            { href: S.observatoire, text: "48%" },
            "; about ",
            {
              href: S.observatoire,
              text: "4 in 10 switch to another channel after a failure",
            },
            ".",
          ],
        },
        {
          type: "p",
          parts: [
            "Talker is not live chat. Raw conversations go out by email. A bad answer burns reuse — which is why the trade crawl and the culture set with the owner matter more than a generic line.",
          ],
        },
      ],
    },
    {
      id: "metier",
      h2: "4. Trade: questions that stick to the site",
      blocks: [
        {
          type: "p",
          parts: [
            "The crawl sets the frame. The owner confirms it with a short QCM. A culture prompt — tone, bans, what we say about the firm — fills what the site does not say.",
          ],
        },
        {
          type: "p",
          parts: [
            "Forrester or IBM TEI studies on enterprise AI are not proof of ROI for a 5-to-30-person firm. We do not reuse them here as if they applied.",
          ],
        },
        {
          type: "p",
          parts: [
            "Honest metrics, later: volume, contact rate, escalations. When Talker has its own figures, they will be labelled Talker data — not a sector average.",
          ],
        },
      ],
    },
    {
      id: "prestations",
      h2: "5. Services: what the visitor can ask for",
      blocks: [
        {
          type: "p",
          parts: [
            "Talker maps what the visitor can ask: services, hours, area, contact — from the site pages, not from an invented catalogue.",
          ],
        },
        {
          type: "p",
          parts: [
            "Product detail, install, and frequent questions live on ",
            { href: "/produit", text: "Product", internal: true },
            ", ",
            { href: "/installer", text: "Install", internal: true },
            ", and ",
            { href: "/faq", text: "FAQ", internal: true },
            ".",
          ],
        },
      ],
    },
    {
      id: "autorite",
      h2: "6. Authority: what the studies say",
      blocks: [
        {
          type: "p",
          parts: [
            "Two readings hold at once. Friction first: ",
            { href: S.gartner, text: "Gartner" },
            " and the ",
            { href: S.observatoire, text: "Observatory" },
            " show still-low use and lower satisfaction than live chat. The other side, among those already using AI: ",
            {
              href: S.zendesk,
              text: "Zendesk CX Trends 2024 — 83% of CX leaders using generative AI report positive ROI",
            },
            "; ",
            {
              href: S.salesforce,
              text: "Salesforce — 93% of service professionals at AI-equipped organisations say it saves time",
            },
            ".",
          ],
        },
        {
          type: "p",
          parts: [
            "Bitkom (Germany, 2024): ",
            {
              href: S.bitkom,
              text: "35% of firms use chatbots for automatic answers",
            },
            ".",
          ],
        },
        {
          type: "p",
          parts: [
            "Intercom’s ",
            {
              href: S.intercom,
              text: "State of AI in Customer Service 2023",
            },
            " describes the same gap: AI helps the teams that use it — it is not conversion magic.",
          ],
        },
        { type: "h3", title: "Citation hygiene (no smear)" },
        {
          type: "p",
          parts: [
            "Many pages stack mega-stats with no primary link. Talker does the opposite: every figure on this page points to the named source. We do not reuse a competitor percentage without a primary.",
          ],
        },
        {
          type: "callout",
          title: "Talker position",
          items: [
            "WordPress plugin: zip, activate, the bubble is on the site — nobody staffs a live chat.",
            "Talker reads public pages. No file RAG, no fantasy dashboard.",
            "The method: engage, qualify, take a contact, email the thread.",
            "A bad answer burns reuse — which is why the trade crawl and the owner-set culture matter.",
            "Every figure has a primary link. Future Talker data will be labelled as Talker data.",
          ],
        },
      ],
    },
  ],
  faqTitle: "7. Method FAQ",
  faq: [
    {
      q: "Does Talker read the whole WordPress site?",
      a: "No. It reads public pages — services, hours, area, contact. Not your internal files, not a PDF dump.",
    },
    {
      q: "Does someone need to sit on the chat?",
      a: "No. Talker asks the questions, qualifies, and emails you the conversation.",
    },
    {
      q: "Does Talker convert at 82%?",
      a: "No. The 82% from Drift / Heinz measures how valuable marketers find AI conversational marketing, not a conversion rate.",
    },
    {
      q: "What if an answer is wrong?",
      a: "A bad experience burns reuse: 72% of customers will not reuse a chatbot after one failure (Salesforce, State of Service 2024). That is why the trade crawl and the owner-set culture exist.",
    },
    {
      q: "How do I install it?",
      a: "Zip Talker, upload it in WP-Admin, activate. The bubble appears. Detail is on the Install page.",
    },
    {
      q: "Which figures does Talker publish?",
      a: "No invented Talker KPI. Later: volume, contact rate, escalations — labelled as Talker data, not as a sector average.",
    },
  ],
};

export function buildMethodeJsonLd(
  siteUrl = "https://talker.now",
  siteName = "Talker",
  path = "/methode"
) {
  const origin = siteUrl.replace(/\/$/, "");
  const url = `${origin}${path}`;
  const publisher = {
    "@type": "Organization" as const,
    name: siteName,
    url: origin,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: METHODE_META.h1,
        name: METHODE_META.title,
        description: METHODE_META.description,
        inLanguage: "fr-FR",
        url,
        mainEntityOfPage: url,
        author: publisher,
        publisher,
        datePublished: "2026-09-13",
        dateModified: "2026-09-13",
      },
      {
        "@type": "FAQPage",
        url,
        mainEntity: methodeFr.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };
}
