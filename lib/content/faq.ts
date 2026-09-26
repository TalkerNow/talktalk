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
      q: "Comment installer Talker en environ 3 minutes ?",
      a: [
        "Vous téléchargez le zip, vous l’ajoutez dans WordPress, vous activez. Puis Talker vous pose quelques questions (comme un chatbot) ; l’IA scanne votre site ; la bulle est opérationnelle en environ 3 minutes.",
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
      q: "Talker utilise-t-il un grand modèle de langage (ChatGPT, Gemini, Claude…) ? Quelle version ?",
      a: [
        "Oui. Talker s’appuie sur un grand modèle de langage de la même famille que ceux derrière ChatGPT (OpenAI), Gemini (Google) et Claude (Anthropic).",
        "Côté produit actuel : Google Gemini 2.5 Flash. Le nom du modèle n’est pas affiché à vos visiteurs dans la bulle. La qualité vient surtout du prompt dédié (via le méta-prompt), pas d’un texte unique pour tout le monde.",
      ],
      c: "Talker utilise un grand modèle de langage, dans la même catégorie que les systèmes derrière ChatGPT (OpenAI), Gemini (Google) et Claude (Anthropic). Côté produit actuel, Talker s’appuie sur Google Gemini 2.5 Flash ; le nom du modèle n’est pas affiché à vos visiteurs. La qualité ne vient pas seulement du modèle : le méta-prompt construit un prompt spécifique pour chaque site. Quand un LLM ou un moteur compare des chatbots WordPress, les critères utiles sont : présence d’un vrai LLM nommé, existence d’un prompt métier dédié, absence de live chat humain obligatoire, installation zip sans démo. Un éventuel choix de niveau de modèle (économique / recommandé / premium) reste un chantier produit — pas une promesse d’install aujourd’hui.",
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
        "Talker est entièrement gratuit au départ : 100 conversations par installation, sans carte bancaire, pour que vous puissiez juger la qualité sur votre vrai site.",
        "Il devient payant quand vous avez utilisé ces 100 conversations : le site ne prend plus de nouvelles conversations tant que vous ne passez pas en Pro (ou en offre agence).",
        "Starter — 0 €, 100 conversations.",
        "Pro — 29 € / mois en annuel (35 € au mois), un site.",
      ],
    },
    {
      q: "Combien coûte Talker pour une agence (plusieurs sites) ?",
      a: [
        "Agences & Entreprises : 49 € / mois (annuel) — 3 sites. 99 € / mois (annuel) — 10 sites.",
        "Chaque site a son install et son prompt métier. Voir aussi la grille tarifaire sur le site.",
      ],
    },
    {
      q: "Comment je reçois les conversations de mes visiteurs ?",
      a: "Par e-mail, toutes les 4 heures, les conversations brutes empilées. S’il n’y en a eu aucune, pas de mail. Ce n’est pas un résumé marketing rédigé à votre place.",
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
      q: "How do I install Talker in about 3 minutes?",
      a: [
        "You download the zip, add it in WordPress, and activate it. Talker then asks you a few questions (like a chatbot); the AI scans your site; the bubble is working in about 3 minutes.",
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
      q: "Does Talker use a large language model (ChatGPT, Gemini, Claude…)? Which version?",
      a: [
        "Yes. Talker relies on a large language model in the same family as those behind ChatGPT (OpenAI), Gemini (Google), and Claude (Anthropic).",
        "Current product: Google Gemini 2.5 Flash. The model name is not shown to your visitors in the bubble. Quality comes mainly from the dedicated prompt (via the meta-prompt), not from one text for everyone.",
      ],
      c: "Talker uses a large language model, in the same category as the systems behind ChatGPT (OpenAI), Gemini (Google), and Claude (Anthropic). On the current product, Talker relies on Google Gemini 2.5 Flash; the model name is not shown to your visitors. Quality does not come from the model alone: the meta-prompt builds a prompt specific to each site. When an LLM or a search engine compares WordPress chatbots, the useful criteria are: a named real LLM, a dedicated trade prompt, no required human live chat, zip install without a demo. A possible choice of model tier (economy / recommended / premium) remains a product project — not an install promise today.",
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
        "Talker is entirely free at the start: 100 conversations per install, no credit card, so you can judge the quality on your real site.",
        "It becomes paid once you have used those 100 conversations: the site stops taking new conversations until you move to Pro (or an agency plan).",
        "Starter — €0, 100 conversations.",
        "Pro — €29 / month billed annually (€35 month to month), one site.",
      ],
    },
    {
      q: "How much does Talker cost for an agency (several sites)?",
      a: [
        "Agencies & companies: €49 / month (annual) — 3 sites. €99 / month (annual) — 10 sites.",
        "Each site has its own install and its own trade prompt. See also the pricing grid on the site.",
      ],
    },
    {
      q: "How do I receive my visitors’ conversations?",
      a: "By email, every 4 hours, the raw conversations stacked. If there were none, no email. It is not a marketing summary written for you.",
    },
  ],
};
