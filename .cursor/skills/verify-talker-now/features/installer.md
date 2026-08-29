# Installer zip

`/installer` is how a visitor gets the WordPress plugin: a download link to `/talker-now.zip`, plus a decorative GSAP vignette. The vignette is not WP-Admin.

## Sub-features

- `installer-page` shows heading `Télécharger Talker` and the download link.
- `installer-download` serves `talker-now.zip` as a file, not HTML.
- `installer-vignette` is labeled with the long `aria-label` on the vignette root (animation only).

## How to get to it (user POV)

- Choose `Créer mon agent gratuitement` or `Télécharger` in the header.
- Open `/installer`.
- Use the hero note `Zip Talker.now — à téléverser dans WP-Admin` as orientation, then the same CTAs.

## Driving it with drive.sh

Preconditions:

- Launch already ran `scripts/build-plugin-zip.sh`. Doctor’s zip check passed.
- `/installer?lang=fr`.

- **Open page.** Run `.cursor/skills/verify-talker-now/helpers/drive.sh installer`. Heading `Télécharger Talker` and link `Télécharger le zip` with `href=/talker-now.zip`.
- **Download.** Choose that link. The browser download’s suggested name is `talker-now.zip`. Save it under `evidence/installer/`.
- **Vignette (observation).** The region named `Démo : une conversation, le téléchargement de talker-now.zip, puis l’installation dans WP-Admin.` is present. Do not click through its fake WP-Admin as if it were the product.
- **Proof.** `evidence/installer/01-page.png` plus the saved zip. `GET /talker-now.zip` remains 200.

## Gotchas

- `npm run dev` without the zip build yields a 404 on download. Launch must build the zip; do not skip that step.
- The vignette uses `data-v=*` internals. Those are not visitor handles. Use the download link.
- Proving the plugin inside WordPress is out of scope for this skill.
