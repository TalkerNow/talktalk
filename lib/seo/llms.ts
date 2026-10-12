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

> Agent conversationnel WordPress (plugin zip, installé en 2 min) pour sites d'activité + agences.

- [Accueil](${origin}/): vitrine Talker.
- [Produit](${origin}/produit): fonctionnalités de l'agent sur WordPress.
- [Méthode](${origin}/methode): du zip WordPress à la conversation sur le site.
- [Installer](${origin}/installer): téléchargement du plugin zip, à déposer dans WP-Admin.
- [FAQ](${origin}/faq): questions fréquentes.
- [Contact](${origin}/contact): écrire à l'équipe.

Tarifs publiés, ancre #pricing sur l’accueil. Starter : 0 €, 50 conversations par mois et par site, remises à zéro chaque mois. Alertes à 25, 38 et 45 conversations (50 %, 75 %, 90 %). Le badge du gratuit est « Powered by Talker · Créez le vôtre », lien vers talker.now. Option Sans badge, sur Starter seulement : 9,99 €/mois en paiement annuel, 12,99 €/mois en paiement mensuel. Elle retire ce badge et la puce « Talker Now », et ne lève pas la limite de conversations. Pro : 29 €/mois en annuel (35 € au mois), 1 site, marque blanche. Pro 3 : 49 €/mois en annuel (69 € au mois), 3 sites. Pro Max : 99 €/mois en annuel (119 € au mois), 10 sites.
`;
