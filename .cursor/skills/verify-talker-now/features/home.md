# Home landing

The home page is the marketing shell: Talker wordmark, French nav, hero with rotating phrase, and in-page sections. Primary conversion is the installer, not a signup modal.

## Sub-features

- `home-wordmark` shows `talker.now` in the header and links to `/`.
- `home-nav` exposes Fonctionnalités, Comment ça marche, Tarifs, Contact, Télécharger.
- `home-hero-cta` sends the visitor to `/installer` via `Créer mon agent gratuitement`.
- `home-sections` can be reached with `#features`, `#how-it-works`, `#pricing`.

## How to get to it (user POV)

- Open `/` (or `/?lang=fr`).
- Follow the header wordmark from `/contact` or `/installer`.
- Use the header links to jump to sections or `/contact`.

## Driving it with drive.sh

Preconditions:

- Doctor is green at `http://127.0.0.1:3317`.
- Viewport is at least 1440×900 so desktop nav is visible.
- `/?lang=fr` is in the URL.

- **Open home.** Run `.cursor/skills/verify-talker-now/helpers/drive.sh home` (or `page.goto` `/?lang=fr`). The accessible name `talker.now` is present and the body includes `Créer mon agent gratuitement` and `Fonctionnalités`.
- **Hero CTA.** Choose the hero/nav link `Créer mon agent gratuitement` (`a[href='/installer']`). The URL becomes `/installer` and the heading `Télécharger Talker` is visible.
- **Nav Contact.** From home, choose `Contact`. The URL is `/contact` and the heading includes `Contact`.
- **Section jump.** From home, choose `Tarifs`. The document includes `#pricing` and copy `Nos tarifs.`
- **Proof.** Keep `evidence/home/01-landing.png` (wordmark + hero) and `evidence/home/02-installer-from-hero.png` (installer heading). Both `.meta.json` files name feature `home`.

## Gotchas

- Several controls share the label `Créer mon agent gratuitement` (nav, hero, mobile). Assert `href=/installer`, not the first match in a mobile overlay.
- Below 768px the text links hide behind `Menu`. Widen the viewport or open `Menu` first.
- Hero phrases rotate every 2.5s. Do not assert one specific rotating phrase; assert `titleBefore` / CTA instead.
- `components/sections/*` is leftover shell and is not what `/` renders. Drive `components/landing/*` routes only.
