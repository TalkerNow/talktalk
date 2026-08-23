import type { DemoStep } from "@/lib/content/demo";
import type { Messages } from "./fr";

export const en = {
  langLabel: "Language",
  nav: {
    features: "Features",
    howItWorks: "How it works",
    pricing: "Pricing",
    contact: "Contact",
    signIn: "Sign in",
    createAgent: "Create my agent for free",
    menu: "Menu",
  },
  hero: {
    eyebrow: "AIs siphon traffic from your site. Talker gets it back.",
    titleBefore: "The AI chatbot that",
    titleAfter: "for you",
    phrases: [
      "describes your services",
      "gives your prices",
      "gives your availability",
      "captures the number",
      "captures the email",
      "asks for Google reviews",
    ],
    subtitle:
      "An AI chatbot that knows your trade, captures your prospects' phone number or email, answers prices without you lifting a finger, sorts requests from existing clients, and collects your Google reviews. Installed in 10 minutes, no code.",
    createAgent: "Create my agent for free",
    seeDemo: "See a demo",
    wordpress: "Available on WordPress — official extension on the store",
    stats: [
      { value: "+50%", label: "more leads on your site" },
      { value: "−80%", label: "time spent answering the same questions" },
      { value: "3x", label: "more Google reviews collected" },
      { value: "24/7", label: "availability, zero missed appointments" },
    ],
  },
  context: {
    title: "Your visitors stopped clicking.",
    titleMuted: "They ask.",
    body: "Search engines and generative AIs answer directly, without sending people back to your site. A static brochure site loses traffic it will never see again.",
    salmon:
      "A site that answers, engages, and captures demand on the spot is the only way to turn a visit into a contact.",
    leaflet: "A static site is a leaflet.",
    partner: "Your site with Talker becomes a salesperson, a secretary, a partner.",
  },
  features: {
    eyebrow: "What it does",
    title: "What you need.",
    titleMuted: "Nothing more.",
    items: [
      {
        number: "01",
        title: "An agent that knows your trade",
        description:
          "Trained on your activity, services and prices, using your site's wording. Whether you are a lawyer, a museum, a construction company or a consulting and services firm, it answers with the right vocabulary, not generic AI replies.",
        visual: "ai",
      },
      {
        number: "02",
        title: "It captures details, not just questions",
        description:
          "Phone number or email collected before the conversation ends. Hot lead sent straight through, existing client routed to the right team. Nothing dies in a form nobody fills.",
        visual: "collab",
      },
      {
        number: "03",
        title: "Support before your support",
        description:
          "Talker tells a prospect from a client in one sentence. Outage, pricing question, extra service: it qualifies the request and sends you a ready file. Your client does not tell the story twice.",
        visual: "security",
      },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "3 steps. 5 minutes.",
    titleMuted: "Your site goes AI.",
    createAgent: "Create my agent for free",
    assistant: "The firm's assistant",
    close: "Close",
    placeholder: "Ask your question...",
    steps: [
      {
        number: "1",
        title: "Install the plugin and choose your template",
        description: "Enter your email and phone number to receive alerts.",
      },
      {
        number: "2",
        title: "Talker reads your site",
        description: "It learns your trade, your hours, your services.",
      },
      {
        number: "3",
        title: "Activate: it's live and operational",
        description:
          "Start collecting your leads and requests by email or SMS on your phone.",
      },
    ],
    conversation: [
      { from: "user" as const, text: "Which area do you cover?" },
      {
        from: "bot" as const,
        text: "The whole Île-de-France region. Looking for an appointment?",
      },
      { from: "user" as const, text: "What are your rates?" },
      {
        from: "bot" as const,
        text: "It depends on the need. I'll put you in touch with [Nom], your number?",
      },
      { from: "user" as const, text: "I want a quote" },
      { from: "bot" as const, text: "Perfect, I'll pass on your request. Your email?" },
    ],
  },
  infra: {
    eyebrow: "Every morning",
    title: "Your visitors'",
    titleLine2: "conversations",
    titleMuted: "every morning in your inbox",
    p1: "What are your visitors saying? What are they asking?",
    p2: "Evolve your offer from visitor feedback.",
    p3: "Stay close to demand and how it shifts, in the age of the AI revolution.",
    inboxTitle: "Inbox",
    favorites: "Favorites",
    inbox: "Inbox",
    folders: ["Received", "Sent", "Drafts"],
    selectedFrom: "Talker",
    selectedSubject: "Talker report — Weekend leak",
    selectedTime: "07:18",
    objet: "Subject: Talker conversation report",
    to: "To you@your-site.com",
    date: "23 Aug 2026 at 07:18",
    reportTitle: "Talker report",
    reportMeta: "23 Aug 2026 · 07:18 — 07:19",
    transcriptBadge: "Conversation transcript",
    conversation: "Conversation",
    client: "Client",
    yesterday: "Yesterday",
    transcript: [
      { who: "client" as const, time: "07:18", text: "Do you work weekends?" },
      {
        who: "talker" as const,
        time: "07:18",
        text: "Yes, 25% surcharge on Saturday. What do you need?",
      },
      { who: "client" as const, time: "07:19", text: "Urgent water leak." },
      {
        who: "talker" as const,
        time: "07:19",
        text: "I'll put you in touch. Your number?",
      },
    ],
    dummies: [
      { from: "Calendar", subject: "Reminder: 10am", time: "06:44" },
      { from: "Documents", subject: "August invoice", time: "Yesterday" },
      { from: "Notification", subject: "Read receipt", time: "Yesterday" },
    ],
  },
  metrics: {
    eyebrow: "Indicators",
    title: "your dashboard,",
    titleMuted: "Live",
    live: "Live",
    items: [
      { value: 847, suffix: "", label: "Conversations handled this month" },
      { value: 92, suffix: "%", label: "Reply rate before the prospect leaves" },
      { value: 6, suffix: " sec", label: "Average response time" },
      { value: 312, suffix: "", label: "Details collected this month" },
    ],
  },
  integrations: {
    eyebrow: "Integrations",
    title: "Works with WordPress,",
    titleMuted: "without changing your site.",
    body: "An extension to install from the WordPress store. Works with most themes and page builders (Elementor, Divi, etc.).",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "A clear price.",
    titleMuted: "No surprises.",
    lead: "Try for free, upgrade when you're ready. No hidden fees.",
    monthly: "Monthly",
    annual: "Annual",
    toggle: "Toggle annual billing",
    perMonth: "/month",
    popular: "Most chosen",
    shopify:
      "Shopify and WooCommerce — €59 for one site. From 10 sites: €29 per site.",
    plans: [
      {
        key: "starter",
        name: "Starter",
        title: "Starter",
        description: "Try with no commitment",
        cta: "Create my agent for free",
        features: [
          "1 Talker",
          "100 conversations/month",
          "1 channel (website)",
          "Support by email",
        ],
      },
      {
        key: "pro",
        name: "Pro",
        title: "Pro",
        description: "For SMBs that want to convert",
        cta: "Install",
        features: [
          "1 Talker",
          "Unlimited conversations",
          "All channels (site, WhatsApp, Instagram, Facebook, SMS)",
          "Automatic phone / email capture",
          "SMS alerts (or right away)",
          "Google review collection",
          "White label",
        ],
      },
      {
        key: "agency3",
        name: "Agency · 3",
        title: "Agencies and companies",
        description: "3 sites",
        cta: "Install",
        features: ["3 Talker", "Everything in Pro", "White label"],
      },
      {
        key: "agency10",
        name: "Agency · 10",
        title: "Agencies and companies",
        description: "10 sites",
        cta: "Install",
        features: [
          "10 Talker",
          "Everything in Pro",
          "One agent per site and location",
          "Multi-account dashboard",
          "White label",
        ],
      },
    ],
  },
  cta: {
    line1: "Talker answers.",
    line2: "Talker sells.",
    line3: "for you.",
    createAgent: "Create my agent for free",
    noCard: "No credit card",
  },
  footer: {
    blurb:
      "The conversational agent that answers, captures and sells in place of your front desk. Installed in 5 minutes, live 24/7.",
    copyright: "© 2026 Talker. All rights reserved.",
    systems: "All systems operational",
    columns: [
      {
        title: "Product",
        links: [
          { name: "Features", href: "#features" },
          { name: "How it works", href: "#how-it-works" },
          { name: "Pricing", href: "#pricing" },
          { name: "Integrations", href: "#integrations" },
          { name: "Use cases", href: "#cas-usage" },
        ],
      },
      {
        title: "Resources",
        links: [
          { name: "Help center", href: "#" },
          { name: "Install guide", href: "#" },
          { name: "Script templates", href: "#" },
          { name: "Service status", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { name: "About", href: "#" },
          { name: "Blog", href: "#" },
          { name: "Careers", href: "#" },
          { name: "Contact", href: "/contact" },
          { name: "Become a partner", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { name: "Privacy", href: "#" },
          { name: "Terms", href: "#" },
          { name: "Legal notice", href: "#" },
          { name: "GDPR", href: "#" },
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    titleMuted: "We reply.",
    lead1: "You install. Talker talks. The requests come in.",
    lead2: "Not a ticket. A conversation.",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    message: "Message",
    send: "Send",
    success: "Sent. We'll write to that address.",
  },
  bubble: {
    open: "Open Talker",
    close: "Close",
    closeTalker: "Close Talker",
    assistant: "The firm's assistant",
    placeholder: "Ask your question...",
    send: "Send",
    writing: "Talker is typing",
    chips: [
      { label: "What are your hours?", intent: "horaires" as const },
      { label: "Ask a question", intent: "question" as const },
      { label: "Book an appointment", intent: "rdv" as const },
    ],
  },
  notFound: {
    title: "This page does not exist.",
    back: "Back to talker.now",
  },
  demoSteps: {
    start: {
      id: "start",
      bot: "Hello. I'm the firm's assistant. I can give you the hours, book an appointment, or pass on a question.",
      chips: [
        {
          label: "What are your hours?",
          userText: "What are your hours?",
          next: "horaires",
        },
        { label: "Ask a question", userText: "I have a question.", next: "question" },
        { label: "Book an appointment", userText: "Book an appointment", next: "rdv" },
      ],
    },
    horaires: {
      id: "horaires",
      bot: "We see clients Monday to Friday, 9 am – 6 pm, and every other Saturday morning. Would you like a slot?",
      chips: [
        { label: "Book an appointment", userText: "Book an appointment", next: "rdv" },
        { label: "Another question", userText: "Another question", next: "question" },
      ],
    },
    rdv: {
      id: "rdv",
      bot: "Tell me a time that works. On a live site, Talker would check availability in the calendar — this is a demo.",
      chips: [
        { label: "Tomorrow morning", userText: "Tomorrow morning", next: "email" },
        { label: "Later this week", userText: "Later this week", next: "email" },
        { label: "A question", userText: "A question", next: "question" },
      ],
    },
    question: {
      id: "question",
      bot: "I'm listening. I'll log your request and the firm will get back to you.",
      chips: [
        { label: "A first appointment", userText: "A first appointment", next: "rdv" },
        { label: "A phone callback", userText: "A phone callback", next: "email" },
      ],
    },
    email: {
      id: "email",
      bot: "Leave an email. In real life the visitor leaves it — the firm receives it, not an anonymous queue.",
      askEmail: true,
      placeholder: "email@firm.com",
    },
    done: {
      id: "done",
      bot: "Sent. The firm will write to that address.",
    },
    later: {
      id: "later",
      bot: "All right. The bubble reopens this thread whenever you want.",
    },
  } satisfies Record<string, DemoStep>,
} satisfies Messages;
