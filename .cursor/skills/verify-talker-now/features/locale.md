# Language

Copy is client-side French by default, with English in `lib/i18n/en.ts`. Switching writes `localStorage['talker-lang']` and `?lang=` on the URL, and sets `document.documentElement.lang`.

## Sub-features

- `locale-default-fr` shows `Fonctionnalités` and `Créer mon agent gratuitement` on a clean `?lang=fr`.
- `locale-en` shows `Features` and `Start for free` after choosing English.
- `locale-persist` keeps English if `talker-lang` is `en` on reload.

## How to get to it (user POV)

- Desktop header flag control (`Langue`) while the header is not in the scrolled compact state (language hides when `scrollY > 20`).
- Mobile: open `Menu`, then the flag group `Langue` with `English` / `Français`.
- Query `?lang=en` or `?lang=fr`.

## Driving it with drive.sh

Preconditions:

- Doctor is green.
- Desktop viewport, `scrollY` near 0 so `LanguageSwitcher variant=nav` is mounted.
- Start at `/?lang=fr`.

- **French baseline.** Run `.cursor/skills/verify-talker-now/helpers/drive.sh locale`. Nav includes `Fonctionnalités`.
- **Switch to English.** Hover/click `Langue`, choose option `English`. URL contains `lang=en`. Nav includes `Features`. Hero CTA is `Start for free`.
- **Proof.** `evidence/locale/01-fr.png` and `02-en.png` with distinct nav labels.

## Gotchas

- Compact scrolled header omits the language control. Scroll to top before switching on desktop.
- A previous agent run can leave `talker-lang=en`. Always set `?lang=fr` at the start of other features.
- Mobile uses `aria-pressed` flag buttons, not the listbox. Use `English` / `Français` names there.
- `html lang` in the server layout is `fr` until the client effect runs.
