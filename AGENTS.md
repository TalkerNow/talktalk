# talker.now — brief agent

## Produit
Vitrine marketing **talker.now**. Pas le plugin WordPress. Chatbot WP pour TPE/PME de 5–30 personnes, déjà sur WordPress, sans personne pour tenir un live chat.

## Marque
talker.now. Accent rust `#C43F17`. Tokens complets : `public/brand/`. Voler les **gestes** de fin.ai (launcher, questions, rail, fenêtres) — jamais leurs textes, visuels ou claims. Talker n’est pas un agent CX entreprise.

Header site (Jeff) : **une ligne** — `symbole.svg` à **gauche** (même hauteur que le mot, centré sur l’œil de « talker ») + `talker` ink `#111111` bold + `.now` gris `#6B6B73` regular. **Pas rust.** Ne pas utiliser `logo-principal.svg` dans le header (c’est le lockup Drive : rust `.now` + bulle en exposant après). Sigle launcher / favicon : `symbole.svg` / `symbole-plein.svg`. **Interdit** : archive radio-ondes entre les mots. Ne pas redessiner les SVG.

## Chat / démo
Le bot **pose** les questions (QCM / pastilles). Pas une barre « ask anything ». « Voir la démo » et le logo ouvrent **le même widget**. Desktop : launcher flottant bas-centre. Mobile : sigle seul, pas de wordmark.

## Interdit
Pas de faux KPI, pas de témoignages inventés, pas d’avis Google (v2 seulement), pas de graphiques type benchmark. Jamais « nos clients » — seulement exemples / situations. Tarif Pro 29 € **pas figé** : ne pas l’afficher comme tarif.

## Copy
Aujourd’hui : `lib/content/landing.ts` (mêmes champs qu’un futur `landingPage` Sanity). Plus tard : Sanity `projectId` `0l81z2o2`, dataset `production`, lecture publique. **Les textes se changent dans Sanity (ou ce fichier), pas en demandant à l’agent de réécrire chaque phrase.**

## Comment travailler
Jeff parle en **résultat + captures**. Un aller-retour visuel, pas du line-by-line. Ne pas refactorer tout le site pour une retouche.

## Mouvement
- Parallax **oui mais pas partout**. Une section, puis plus loin une autre. Jamais hero + toutes les raisons + footer. Si ça fait « bidon », enlever.
- Pas de scrollytelling type Fin « 22 raisons » sur toute la page.
- **Un seul** bloc « section fixe, highlight qui descend » : colonne de puces (ou texte) **sticky** à gauche ; le scroll continue ; la surbrillance / couleur passe d’une puce à la suivante. Ex. « comment ça marche » / « ce que fait le bot ». Pas trois blocs comme ça.

## Charte (Drive `charte graphique.html` v1 — ne pas inventer d’autres hex)
- Page `#F4F3EE` · surface `#FFFFFF` · sunken `#EDEBE3` · bord `#DCD9CE`
- Texte `#111111` · muted `#52525B` · subtle `#6B6B73`
- Rust `#C43F17` · hover `#A8350F` · active `#8C2B0C` · accent-bg `#FAEDE7` · accent-border `#E3B49F` · on-accent `#FFFFFF`
- Success `#1F7A4D` / `#E8F4EC` · warning `#8A6100` / `#FBF2DC` · danger `#B4113A` / `#FCEAEE` · info `#1B5FA8` / `#E9F1F9`
- Display **Poppins**, body **Inter**, mono **JetBrains Mono**. Le serif Fin actuel se remplace à la **prochaine passe look**.
- Pastilles statut : fonds teintés, **pas de gros cadres**. Jouer ok / warn / danger / info / accent soft.

## Direction look (prochain chat — ne pas tout réécrire ici)
- Pas le blob / forme abstraite à droite du hero.
- À la place : un chatbot en action (conversation simulée → email + téléphone).
- Parallax **sparing** (voir Mouvement). Petites vignettes qui bougent, pas un manège.
- Questions qui apparaissent comme sur fin.ai (pastilles, le bot mène).
- Appliquer les tokens + Poppins/Inter à cette passe-là.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
