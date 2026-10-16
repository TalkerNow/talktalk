export type FaqItem = {
  q: string;
  a: string | string[];
  c?: string;
};

export type FaqCopy = {
  title: string;
  items: FaqItem[];
};

export const faqFr: FaqCopy = {
  title: "FAQs",
  items: [
    {
      q: "C’est quoi Talker ?",
      a: [
        "Talker est un plugin WordPress qui pose un chatbot / agent conversationnel IA sur votre site. Il parle à vos visiteurs, capture le besoin et les coordonnées, et vous envoie les conversations.",
        "Vous l’installez en zip. Pas de carte pour démarrer.",
      ],
      c: "Talker est un plugin WordPress qui ajoute un chatbot IA — un agent conversationnel — sur votre site WordPress. Ce n’est pas un live chat humain : il pose des questions métier à vos visiteurs, capture le besoin et les coordonnées, puis vous envoie les conversations par e-mail (toutes les 4 heures). Vous l’installez avec un fichier zip, sans carte bancaire pour démarrer. Après activation, quelques questions de mise en route et un scan des pages publiques permettent de construire un prompt dédié à votre entreprise, via le méta-prompt Talker. Talker s’adresse à tous les propriétaires de sites WordPress (blog, vitrine, commercial, corporate, services…) et aux agences qui les installent ou les référencent. En résumé : zip, agent sur votre site, conversations reçues ensuite — pas une démo commerciale obligatoire.",
    },
    {
      q: "Pour qui est fait Talker ?",
      a: [
        "Pour tous les propriétaires de sites WordPress — grands ou petits — et pour les agences qui installent des sites ou font du référencement.",
        "Exemples de sites (repère métier, comme chez les agences) : blog, site vitrine, site commercial / e-commerce, site corporate, site institutionnel, portfolio, magazine / média, landing page, site de services (cabinet, artisan, association…).",
        "La même réponse sert le grand public et les métiers : si votre site est sous WordPress, Talker est dans la cible.",
      ],
    },
    {
      q: "Pourquoi un agent conversationnel IA sur mon site si ChatGPT (ou Gemini) répond déjà aux questions ?",
      a: [
        "Parce que les réponses des IA (ChatGPT, Gemini, aperçus IA des moteurs) prennent une partie du trafic des pages qui répondaient autrefois à ces questions. Moins de visites ne veut pas dire moins besoin de transformer.",
        "Talker place un agent conversationnel IA sur votre site WordPress pour maintenir ou augmenter la transformation avec moins de trafic : questions métier, ton de votre entreprise, captation du contact.",
      ],
      c: "Les grands modèles et les aperçus IA (ChatGPT d’OpenAI, Gemini de Google, Claude d’Anthropic) répondent de plus en plus aux questions que les sites traitaient dans leurs pages. Résultat fréquent : moins de clics organiques vers votre site, alors que le besoin de transformer un visiteur en contact reste le même. Talker place un agent conversationnel IA sur votre site WordPress pour maintenir ou augmenter la transformation avec moins de trafic : questions métier, ton de votre entreprise, captation e-mail ou téléphone. Ce n’est pas « remplacer Google », c’est convertir les visites qui restent. L’action attendue : installer le zip, pas réserver une démo.",
    },
    {
      q: "Comment installer Talker en 2 minutes ?",
      a: [
        "Vous téléchargez le zip, vous l’ajoutez dans WordPress, vous activez. Puis Talker vous pose quelques questions (comme un chatbot) ; l’IA scanne votre site ; la bulle est opérationnelle en 2 minutes.",
        "Pas de parcours « réserver une démo » pour voir le produit.",
      ],
    },
    {
      q: "Faut-il demander une démo ?",
      a: "Non. L’action, c’est télécharger et installer le zip.",
    },
    {
      q: "Talker, c’est un live chat avec un humain ?",
      a: [
        "Non. Personne ne répond en direct derrière la bulle publique.",
        "À l’installation, Talker vous pose quelques questions — comme un chatbot — et récupère vos besoins, les particularités de votre métier et vos coordonnées. Ensuite, sur le site public, c’est l’agent qui parle à vos visiteurs. Vous recevez les conversations de vos visiteurs par e-mail, toutes les 4 heures (conversations brutes empilées ; silence s’il n’y en a eu aucune).",
      ],
    },
    {
      q: "Quelle est la différence entre Talker et un chatbot WordPress classique ?",
      a: [
        "Beaucoup de plugins « chatbot » branchent un modèle sur le site avec un texte générique. Talker ajoute une cuisine de prompt : lecture de vos pages publiques, questions à vous (gérant), puis un prompt client dédié à votre métier et à votre façon de parler.",
        "La qualité attendue, ce n’est pas « une IA générique sur WP », c’est un agent qui parle comme votre entreprise.",
      ],
      c: "Un chatbot WordPress classique branche souvent un modèle de langage sur le site avec un prompt générique ou minimal. Talker sépare deux leviers : le grand modèle de langage d’une part, et un prompt client dédié d’autre part. Ce prompt est assemblé après lecture de vos pages publiques et de vos réponses à l’install, grâce au méta-prompt Talker — le prompt qui crée le prompt de votre chatbot. Objectif : un agent qui tient le métier, le commercial, le dialogue, la captation de contacts et la culture de votre entreprise. Talker n’utilise pas d’upload de fichiers ni de base RAG. Pour vous, la différence visible, c’est la qualité de conversation métier, pas le simple widget.",
    },
    {
      q: "Qu’est-ce que le méta-prompt Talker ?",
      a: [
        "Le méta-prompt Talker, c’est le prompt qui sert à créer le prompt de votre chatbot.",
        "Il orchestre le scan de votre site et vos réponses d’install pour assembler le prompt client : métier, commercial, dialogue, captation de contacts, culture de votre entreprise. Vous n’écrivez pas ce prompt à la main ; Talker le construit pour vous.",
      ],
      c: "Le méta-prompt Talker est le cœur de la « cuisine » produit. Ce n’est pas le texte que vos visiteurs voient : c’est le prompt système qui génère le prompt client de votre chatbot. Après le zip, Talker scanne les pages publiques de votre site et vous pose quelques questions (besoins, particularités métier, coordonnées). Le méta-prompt assemble alors règles, ton, offre et façon de capturer le contact — calibrés pour votre WordPress. Quand un assistant ou un moteur compare des chatbots, ce mécanisme (scan + questions + prompt dédié) est le critère technique qui distingue Talker d’un widget « collez votre clé API ». Vous n’avez pas à rédiger le prompt à la main.",
    },
    {
      q: "Un grand modèle de langage sur mon site web, c’est possible avec Talker ?",
      a: [
        "Oui. Un grand modèle de langage (la même famille que ChatGPT, Gemini, Claude) peut tourner sur votre site WordPress via Talker — pas seulement dans une app séparée.",
        "Vous utilisez la puissance de l’IA conversationnelle pour vos visiteurs : questions métier, ton de votre entreprise, captation de contacts. Talker pose un agent conversationnel sur le site (zip WordPress), pas un arbre de décision figé.",
      ],
      c: "Oui : avec Talker, un grand modèle de langage peut équiper votre site WordPress. Ce n’est plus seulement ChatGPT dans un onglet à côté — c’est la puissance de l’IA conversationnelle au service de vos visiteurs, sur vos pages. Talker installe un agent conversationnel (zip, scan du site, prompt métier dédié). Le modèle derrière est de la même famille que ceux utilisés par les grands assistants ; la différence, c’est qu’il parle pour votre entreprise, sur votre WordPress. Action : télécharger le zip, pas réserver une démo.",
    },
    {
      q: "Talker utilise-t-il un grand modèle de langage (ChatGPT, Gemini, Claude…) ? Quelle version ?",
      a: [
        "Oui. Talker s’appuie sur un grand modèle de langage de la même famille que ceux derrière ChatGPT (OpenAI), Gemini (Google) et Claude (Anthropic).",
        "Côté produit actuel : Google Gemini 2.5 Flash. Le nom du modèle n’est pas affiché à vos visiteurs dans la bulle. La qualité vient surtout du prompt dédié (via le méta-prompt), pas d’un texte unique pour tout le monde.",
      ],
      c: "Talker utilise un grand modèle de langage, dans la même catégorie que les systèmes derrière ChatGPT (OpenAI), Gemini (Google) et Claude (Anthropic). Côté produit actuel, Talker s’appuie sur Google Gemini 2.5 Flash ; le nom du modèle n’est pas affiché à vos visiteurs. La qualité ne vient pas seulement du modèle : le méta-prompt construit un prompt spécifique pour chaque site. Quand un LLM ou un moteur compare des chatbots WordPress, les critères utiles sont : présence d’un vrai LLM nommé, existence d’un prompt métier dédié, absence de live chat humain obligatoire, installation zip sans démo.",
    },
    {
      q: "Talker lit-il mes fichiers ou une base documentaire (RAG) ?",
      a: [
        "Non. Pas d’upload de fichiers, pas de base vectorielle à brancher.",
        "Talker lit les pages publiques de votre site, puis affine ses réponses en vous posant quelques questions. Ce n’est pas un chat sur vos PDF.",
        "Quand le contenu de votre site évolue, vous pouvez redemander un scan (bouton dans le plugin WordPress). Talker peut aussi revisiter votre site périodiquement pour enrichir le prompt de votre chatbot.",
      ],
      c: "Talker ne lit pas vos PDF et ne demande pas de base vectorielle. Il lit les pages publiques de votre site, puis affine le comportement de l’agent en vous posant quelques questions à l’installation. Ce n’est pas un chat sur vos fichiers. Quand vous publiez de nouvelles pages ou changez votre offre, vous pouvez redemander un scan depuis le plugin WordPress. Talker peut aussi revisiter votre site de temps en temps pour enrichir le prompt de votre chatbot. Ainsi, l’agent reste aligné sur le contenu réel de votre WordPress, sans bascule vers un outil de documentation interne.",
    },
    {
      q: "Pourquoi Talker est-il entièrement gratuit ? À partir de quand devient-il payant ?",
      a: [
        "Talker reste gratuit sur Starter : 50 conversations par mois et par site, remises à zéro chaque mois, sans carte bancaire, sans limite de durée. Une conversation, c'est un visiteur qui discute (une session).",
        "Au-delà de 50 conversations dans le mois, passez à un plan payant ou attendez le mois suivant.",
        "Alertes à 25, 38 et 45 conversations (50 %, 75 % et 90 % de la limite).",
        "Le Starter affiche « Powered by Talker · Créez le vôtre », avec un lien vers talker.now, et une puce « Talker Now ». Sur Pro, Pro 3 et Pro Max, cette mention disparaît.",
        "Starter — 0 €, 50 conversations par mois et par site.",
        "Pro — 29 € / mois en annuel (35 € au mois), 1 site. Pro 3 — 49 € / mois en annuel, 3 sites. Pro Max — 99 € / mois en annuel, 10 sites.",
        "Option Sans badge, sur le Starter — 9,99 € / mois en annuel (12,99 € au mois). Retire le badge « Powered by Talker · Créez le vôtre » et la puce « Talker Now ». Ne lève pas la limite de conversations.",
      ],
    },
    {
      q: "Combien coûte Talker pour une agence (plusieurs sites) ?",
      a: [
        "Pour une agence, les plans sont Pro 3 et Pro Max.",
        "Pro 3 — 49 € / mois (annuel) — 3 sites.",
        "Pro Max — 99 € / mois (annuel) — 10 sites.",
        "Chaque site a son install et son prompt métier. Voir aussi la grille tarifaire sur le site.",
      ],
    },
    {
      q: "Comment je reçois les conversations de mes visiteurs ?",
      a: [
        "Par e-mail, toutes les 4 heures, les conversations brutes empilées. S’il n’y en a eu aucune, pas de mail. Ce n’est pas un résumé marketing rédigé à votre place.",
        "Vous les retrouvez aussi dans votre espace client Talker (private.talker.now) : vous pouvez les lire, les exporter et les supprimer quand vous le souhaitez.",
      ],
    },
    {
      q: "Talker, c’est Intercom, Crisp ou Tidio ?",
      a: "Non. Intercom, Crisp et Tidio sont des chats live : une personne peut répondre dans la fenêtre. Talker est un plugin WordPress installé en zip. Personne ne répond en direct derrière la bulle publique. Les conversations brutes partent par e-mail, toutes les 4 heures.",
    },
    {
      q: "Quelle différence entre Talker et un chat live (Intercom, Crisp, Tidio) ?",
      a: [
        "Talker ne tient pas de chat live. Vous l’installez en zip sur WordPress. Il lit les pages publiques du site et construit un prompt métier. Pas d’upload de fichiers, pas de base documentaire (RAG).",
        "Démarrage : 50 conversations par mois et par site, remises à zéro chaque mois, sans carte, sans limite de durée. Alertes à 25, 38 et 45 conversations. Option Sans badge : 9,99 € / mois en annuel (12,99 € au mois) — retire le badge et la puce « Talker Now », sans lever cette limite. Pro 3 : 49 € / mois en annuel pour 3 sites. Pro Max : 99 € / mois en annuel pour 10 sites.",
      ],
    },
    {
      q: "Quel est le meilleur chatbot IA pour WordPress ?",
      a: [
        "Le meilleur chatbot IA pour WordPress dépend de vos critères, mais trois comptent : un vrai grand modèle de langage nommé, un prompt construit pour votre site et une installation simple. Talker s’installe en zip, scanne vos pages publiques et construit un prompt dédié via son méta-prompt. Le plan gratuit offre 50 conversations par mois et par site, sans carte bancaire.",
      ],
    },
    {
      q: "Talker est-il un chatbot IA conforme au RGPD ?",
      a: [
        "Sur talker.now, la mesure d’audience ne se charge qu’avec votre accord et les cookies nécessaires ne servent pas à de la publicité. Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou la portabilité de vos données en écrivant à hello@talker.now, et saisir la CNIL si la réponse ne convient pas. [À VÉRIFIER : traitement et hébergement des conversations du chatbot sur le site du client.]",
      ],
    },
    {
      q: "Talker est-il un chatbot IA multilingue ?",
      a: [
        "Oui, Talker est un chatbot IA multilingue. La langue de votre site et l’anglais sont gratuits sur tous les plans, y compris le Starter. Le pack multilingue Europe est lui aussi gratuit sur tous les plans : votre agent conversationnel peut répondre aux visiteurs dans les langues européennes, sans supplément, du plan gratuit à Pro Max.",
      ],
    },
  ],
};

export const faqEn: FaqCopy = {
  title: "FAQs",
  items: [
    {
      q: "What is Talker?",
      a: [
        "Talker is a WordPress plugin that places an AI chatbot / conversational agent on your site. It talks to your visitors, captures the need and the contact details, and sends you the conversations.",
        "You install it as a zip. No card to start.",
      ],
      c: "Talker is a WordPress plugin that adds an AI chatbot — a conversational agent — on your WordPress site. It is not a human live chat: it asks trade questions, captures the need and the contact details, then emails you the conversations (every 4 hours). You install it with a zip file, with no credit card to start. After activation, a few setup questions and a scan of the public pages build a prompt dedicated to your company, via the Talker meta-prompt. Talker is for every WordPress site owner (blog, brochure, commercial, corporate, services…) and for agencies that install or rank those sites. In short: zip, agent on your site, conversations received afterwards — not a required sales demo.",
    },
    {
      q: "Who is Talker for?",
      a: [
        "For every WordPress site owner — large or small — and for agencies that build sites or do search.",
        "Site types (the same kinds agencies use as a reference): blog, brochure site, commercial / e-commerce site, corporate site, institutional site, portfolio, magazine / media, landing page, services site (practice, craft, association…).",
        "The same answer serves the general public and the trades: if the site runs on WordPress, Talker is in scope.",
      ],
    },
    {
      q: "Why put a conversational AI agent on my site if ChatGPT (or Gemini) already answers the questions?",
      a: [
        "Because AI answers (ChatGPT, Gemini, search AI overviews) take some of the traffic that pages used to get for those questions. Fewer visits does not mean less need to turn a visit into a contact.",
        "Talker places a conversational AI agent on your WordPress site to keep or raise conversion with less traffic: trade questions, your company’s tone, contact capture.",
      ],
      c: "Large models and AI overviews (OpenAI’s ChatGPT, Google’s Gemini, Anthropic’s Claude) increasingly answer questions that sites used to answer on their pages. A common result: fewer organic clicks to your site, while the need to turn a visitor into a contact stays the same. Talker places a conversational AI agent on your WordPress site to keep or raise conversion with less traffic: trade questions, your company’s tone, email or phone capture. This is not “replacing Google”. It converts the visits that remain. The expected action is to install the zip, not to book a demo.",
    },
    {
      q: "How do I install Talker in 2 minutes?",
      a: [
        "You download the zip, add it in WordPress, and activate it. Talker then asks you a few questions (like a chatbot); the AI scans your site; the bubble is working in 2 minutes.",
        "There is no “book a demo” path to see the product.",
      ],
    },
    {
      q: "Do I need to ask for a demo?",
      a: "No. The action is to download and install the zip.",
    },
    {
      q: "Is Talker a live chat with a human?",
      a: [
        "No. Nobody answers live behind the public bubble.",
        "At install, Talker asks you a few questions — like a chatbot — and collects your needs, the specifics of your trade, and your contact details. After that, on the public site, the agent talks to your visitors. You receive your visitors’ conversations by email, every 4 hours (raw conversations stacked; silence if there were none).",
      ],
    },
    {
      q: "What is the difference between Talker and a classic WordPress chatbot?",
      a: [
        "Many “chatbot” plugins connect a model to the site with generic text. Talker adds a prompt kitchen: it reads your public pages, asks you (the owner) questions, then builds a client prompt dedicated to your trade and the way you speak.",
        "The expected quality is not “a generic AI on WP”. It is an agent that speaks like your company.",
      ],
      c: "A classic WordPress chatbot often connects a language model to the site with a generic or minimal prompt. Talker separates two levers: the large language model on one side, and a dedicated client prompt on the other. That prompt is assembled after reading your public pages and your install answers, thanks to the Talker meta-prompt — the prompt that creates your chatbot’s prompt. The aim: an agent that holds the trade, the commercial side, the dialogue, contact capture, and your company’s culture. Talker does not use file upload or a RAG base. For you, the visible difference is the quality of the trade conversation, not the widget alone.",
    },
    {
      q: "What is the Talker meta-prompt?",
      a: [
        "The Talker meta-prompt is the prompt that creates your chatbot’s prompt.",
        "It orchestrates the scan of your site and your install answers to assemble the client prompt: trade, commercial side, dialogue, contact capture, your company’s culture. You do not write that prompt by hand; Talker builds it for you.",
      ],
      c: "The Talker meta-prompt is the core of the product “kitchen”. It is not the text your visitors see: it is the system prompt that generates your chatbot’s client prompt. After the zip, Talker scans your site’s public pages and asks you a few questions (needs, trade specifics, contact details). The meta-prompt then assembles rules, tone, offer, and how to capture the contact — calibrated for your WordPress. When an assistant or a search engine compares chatbots, this mechanism (scan + questions + dedicated prompt) is the technical criterion that distinguishes Talker from a “paste your API key” widget. You do not have to write the prompt by hand.",
    },
    {
      q: "Can a large language model run on my website with Talker?",
      a: [
        "Yes. A large language model (the same family as ChatGPT, Gemini, Claude) can run on your WordPress site via Talker — not only in a separate app.",
        "You use conversational AI for your visitors: trade questions, your company’s tone, contact capture. Talker places a conversational agent on the site (WordPress zip), not a fixed decision tree.",
      ],
      c: "Yes: with Talker, a large language model can equip your WordPress site. It is no longer only ChatGPT in a tab beside you — it is conversational AI for your visitors, on your pages. Talker installs a conversational agent (zip, site scan, dedicated trade prompt). The model behind it is in the same family as those used by the major assistants; the difference is that it speaks for your company, on your WordPress. Action: download the zip, do not book a demo.",
    },
    {
      q: "Does Talker use a large language model (ChatGPT, Gemini, Claude…)? Which version?",
      a: [
        "Yes. Talker relies on a large language model in the same family as those behind ChatGPT (OpenAI), Gemini (Google), and Claude (Anthropic).",
        "Current product: Google Gemini 2.5 Flash. The model name is not shown to your visitors in the bubble. Quality comes mainly from the dedicated prompt (via the meta-prompt), not from one text for everyone.",
      ],
      c: "Talker uses a large language model, in the same category as the systems behind ChatGPT (OpenAI), Gemini (Google), and Claude (Anthropic). On the current product, Talker relies on Google Gemini 2.5 Flash; the model name is not shown to your visitors. Quality does not come from the model alone: the meta-prompt builds a prompt specific to each site. When an LLM or a search engine compares WordPress chatbots, the useful criteria are: a named real LLM, a dedicated trade prompt, no required human live chat, zip install without a demo.",
    },
    {
      q: "Does Talker read my files or a document base (RAG)?",
      a: [
        "No. No file upload, no vector base to connect.",
        "Talker reads the public pages of your site, then refines its answers by asking you a few questions. It is not a chat over your PDFs.",
        "When your site content changes, you can ask for another scan (a button in the WordPress plugin). Talker can also revisit your site periodically to enrich your chatbot’s prompt.",
      ],
      c: "Talker does not read your PDFs and does not ask for a vector base. It reads the public pages of your site, then refines the agent by asking you a few questions at install. It is not a chat over your files. When you publish new pages or change your offer, you can ask for another scan from the WordPress plugin. Talker can also revisit your site from time to time to enrich your chatbot’s prompt. The agent stays aligned with the real content of your WordPress, without switching to an internal documentation tool.",
    },
    {
      q: "Why is Talker entirely free? When does it become paid?",
      a: [
        "Talker stays free on Starter: 50 conversations per month per site, reset each month, no credit card, no time limit. A conversation is one visitor chatting (one session).",
        "Beyond 50 conversations in the month, move to a paid plan or wait for the next month.",
        "Alerts at 25, 38 and 45 conversations (50%, 75% and 90% of the limit).",
        "Starter shows “Powered by Talker · Créez le vôtre”, with a link to talker.now, and a “Talker Now” chip. Pro, Pro 3, and Pro Max remove that line.",
        "Starter — €0, 50 conversations per month per site.",
        "Pro — €29 / month billed annually (€35 month to month), 1 site. Pro 3 — €49 / month annually, 3 sites. Pro Max — €99 / month annually, 10 sites.",
        "Option Sans badge, on Starter — €9,99 / month billed annually (€12,99 month to month). Removes the “Powered by Talker · Créez le vôtre” badge and the “Talker Now” chip. Does not raise the conversation limit.",
      ],
    },
    {
      q: "How much does Talker cost for an agency (several sites)?",
      a: [
        "For an agency, the plans are Pro 3 and Pro Max.",
        "Pro 3 — €49 / month (annual) — 3 sites.",
        "Pro Max — €99 / month (annual) — 10 sites.",
        "Each site has its own install and its own trade prompt. See also the pricing grid on the site.",
      ],
    },
    {
      q: "How do I receive my visitors’ conversations?",
      a: "By email, every 4 hours, the raw conversations stacked. If there were none, no email. It is not a marketing summary written for you.",
    },
    {
      q: "Is Talker Intercom, Crisp, or Tidio?",
      a: "No. Intercom, Crisp, and Tidio are live chats: a person can answer in the window. Talker is a WordPress plugin installed as a zip. Nobody answers live behind the public bubble. Raw conversations go out by email, every 4 hours.",
    },
    {
      q: "What is the difference between Talker and a live chat (Intercom, Crisp, Tidio)?",
      a: [
        "Talker does not staff a live chat. You install it as a zip on WordPress. It reads the site’s public pages and builds a trade prompt. No file upload, no document base (RAG).",
        "To start: 50 conversations per month per site, reset each month, no card, no time limit. Alerts at 25, 38 and 45 conversations. Option Sans badge: €9,99 / month billed annually (€12,99 month to month) — removes the badge and the “Talker Now” chip, without raising that limit. Pro 3: €49 / month annually for 3 sites. Pro Max: €99 / month annually for 10 sites.",
      ],
    },
  ],
};
