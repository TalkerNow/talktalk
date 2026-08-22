# talker.now — brief agent

## Produit
Vitrine marketing **talker.now**. Pas le plugin WordPress. Chatbot WP pour TPE/PME de 5–30 personnes, déjà sur WordPress, sans personne pour tenir un live chat.

## Marque
talker.now. Accent rust `#C43F17`. Voler les **gestes** de fin.ai (launcher, questions, rail numéroté, fenêtres empilées) — jamais leurs textes, visuels ou claims. Talker n’est pas un agent CX entreprise.

## Chat / démo
Le bot **pose** les questions (QCM / pastilles). Pas une barre « ask anything ». « Voir la démo » et le logo ouvrent **le même widget**. Desktop : launcher flottant bas-centre. Mobile : sigle seul, pas de wordmark.

## Interdit
Pas de faux KPI, pas de témoignages inventés, pas d’avis Google (v2 seulement), pas de graphiques type benchmark. Jamais « nos clients » — seulement exemples / situations. Tarif Pro 29 € **pas figé** : ne pas l’afficher comme tarif.

## Copy
Aujourd’hui : `lib/content/landing.ts` (mêmes champs qu’un futur `landingPage` Sanity). Plus tard : Sanity `projectId` `0l81z2o2`, dataset `production`, lecture publique. **Les textes se changent dans Sanity (ou ce fichier), pas en demandant à l’agent de réécrire chaque phrase.**

## Comment travailler
Jeff parle en **résultat + captures**. Un aller-retour visuel, pas du line-by-line. Ne pas refactorer tout le site pour une retouche.

## Direction look (prochain chat — ne pas coder maintenant)
- Pas le blob / forme abstraite à droite du hero.
- À la place : un chatbot en action (conversation simulée → email + téléphone).
- Parallax moderne au scroll, petites vignettes qui bougent.
- Questions qui apparaissent comme sur fin.ai (pastilles, le bot mène).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
