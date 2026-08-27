# talker.now — brief agent

## Produit
Vitrine marketing **talker.now**. Pas le plugin WordPress. Chatbot WP pour TPE/PME de 5–30 personnes, déjà sur WordPress, sans personne pour tenir un live chat.

## Shell visuel
Le site est le template **Optimus** (v0 / `public-templates/optimus`). Toute la copy anglaise Optimus est **dummy** — JFC la remplace plus tard. Ne pas inventer de copy Talker, de KPI, ni réécrire les headlines. Laisser « Optimus » dans le corps pour le find-and-replace.

## Header (seule exception marque)
**Une ligne** — `symbole.svg` à **gauche** (même hauteur que le mot) + `talker` ink `#111111` bold + `.now` gris `#6B6B73` regular. **Pas rust.** Ne pas utiliser `logo-principal.svg` dans le header. Favicon / sigle : `symbole-plein.svg` / `symbole.svg`. **Interdit** : archive radio-ondes. Ne pas redessiner les SVG. Fichiers : `public/brand/*`.

## Chat / démo (produit, plus tard)
Le bot **pose** les questions (QCM / pastilles). Pas une barre « ask anything ». Desktop : launcher bas-centre. Mobile : sigle seul.

## Interdit
Pas de faux KPI Talker, pas de témoignages inventés, pas d’avis Google (v2 seulement). Jamais « nos clients ». Tarif Pro 29 € **pas figé** — les prix Optimus restent dummy.

## Copy
Dummy Optimus dans les composants `components/landing/*`. Sanity `0l81z2o2` / `production` peut rester inutilisé. **Les textes se changent dans les fichiers (puis Sanity), pas en demandant à l’agent de réécrire chaque phrase.**

## Comment travailler
Jeff parle en **résultat + captures**. Un aller-retour visuel, pas du line-by-line. Ne pas refactorer tout le site pour une retouche.

## Mouvement
- Parallax **oui mais pas partout**. Une section, puis plus loin une autre. Si ça fait « bidon », enlever.
- Pas de scrollytelling type Fin « 22 raisons » sur toute la page.
- **Un seul** bloc sticky-highlight si on en ajoute. Pas trois.

## Charte (Drive `charte graphique.html` v1 — ne pas inventer d’autres hex)
- Page `#F4F3EE` · surface `#FFFFFF` · sunken `#EDEBE3` · bord `#DCD9CE`
- Texte `#111111` · muted `#52525B` · subtle `#6B6B73`
- Rust `#C43F17` · hover `#A8350F` · active `#8C2B0C` · accent-bg `#FAEDE7` · accent-border `#E3B49F` · on-accent `#FFFFFF`
- Success `#1F7A4D` / `#E8F4EC` · warning `#8A6100` / `#FBF2DC` · danger `#B4113A` / `#FCEAEE` · info `#1B5FA8` / `#E9F1F9`
- Display **Poppins**, body **Inter**, mono **JetBrains Mono** (le template Optimus utilise encore Instrument — à aligner plus tard).
- Pastilles statut : fonds teintés, **pas de gros cadres**.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
