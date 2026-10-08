// Same default as lib/site.ts `url`.
const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://talker.now").replace(
  /\/$/,
  "",
);

/**
 * Public /llms.txt body. Product facts only.
 * Live routes: /, /produit, /methode, /installer, /faq, /contact,
 * /tarifs, /comparatif-talker-live-chat, and the seven alternative pages.
 */
export const llmsTxt = `# Talker

> Agent conversationnel WordPress (plugin zip ~3 min) pour sites d'activité + agences.

- [Accueil](${origin}/): vitrine Talker.
- [Produit](${origin}/produit): fonctionnalités de l'agent sur WordPress.
- [Méthode](${origin}/methode): du zip WordPress à la conversation sur le site.
- [Installer](${origin}/installer): téléchargement du plugin zip, à déposer dans WP-Admin.
- [FAQ](${origin}/faq): questions fréquentes.
- [Contact](${origin}/contact): écrire à l'équipe.
- [Tarifs](${origin}/tarifs): 100 conversations par mois et par site, gratuites, sans carte, sans limite de durée ; « Propulsé par Talker » (lien vers talker.now) sur Starter, marque blanche dès Pro ; Pro 29 € (1 site), Pro 3 49 € (3 sites), Pro Max 99 € (10 sites), en annuel.
- [Alternative à Tidio pour WordPress](${origin}/alternative-tidio-wordpress): faits et tarifs Talker / Tidio (relevés le 08/10/2026).
- [Alternative à Crisp pour WordPress](${origin}/alternative-crisp-wordpress): faits et tarifs Talker / Crisp (relevés le 08/10/2026).
- [Alternative à Chatbase pour WordPress](${origin}/alternative-chatbase-wordpress): faits et tarifs Talker / Chatbase (relevés le 08/10/2026).
- [Alternative à tawk.to pour WordPress](${origin}/alternative-tawk-to-wordpress): faits et tarifs Talker / tawk.to (relevés le 08/10/2026).
- [Alternative à Smartsupp pour WordPress](${origin}/alternative-smartsupp-wordpress): faits et tarifs Talker / Smartsupp (relevés le 08/10/2026).
- [Alternative à LiveChat pour WordPress](${origin}/alternative-livechat-wordpress): faits et tarifs Talker / LiveChat (relevés le 08/10/2026).
- [Alternative à Botpress pour WordPress](${origin}/alternative-botpress-wordpress): faits et tarifs Talker / Botpress (relevés le 08/10/2026).
- [Talker et le chat live](${origin}/comparatif-talker-live-chat): différences avec un chat live humain.
`;
