// Same default as lib/site.ts `url`.
const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://talker.now").replace(
  /\/$/,
  "",
);

/**
 * Public /llms.txt body. Product facts only.
 * Live routes: /, /produit, /methode, /installer, /faq, /contact.
 * /tarifs is not a page (pricing is the #pricing anchor on /).
 */
export const llmsTxt = `# Talker

> Agent conversationnel WordPress (plugin zip ~3 min) pour sites d'activité + agences.

- [Accueil](${origin}/): vitrine Talker.
- [Produit](${origin}/produit): fonctionnalités de l'agent sur WordPress.
- [Méthode](${origin}/methode): du zip WordPress à la conversation sur le site.
- [Installer](${origin}/installer): téléchargement du plugin zip, à déposer dans WP-Admin.
- [FAQ](${origin}/faq): questions fréquentes.
- [Contact](${origin}/contact): écrire à l'équipe.
`;
