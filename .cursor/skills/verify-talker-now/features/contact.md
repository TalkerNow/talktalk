# Contact

`/contact` is a named form that posts JSON to `/api/contact`. Success replaces the form with a confirmation sentence. Nothing is stored beyond the server log line `[contact]`.

## Sub-features

- `contact-open` shows Nom, Société, Email, Téléphone, Message.
- `contact-required` blocks send without name, email, and message (browser `required` plus API 400).
- `contact-success` shows `C’est transmis. On vous écrit à cette adresse.` after a valid submit.

## How to get to it (user POV)

- Choose `Contact` in the header from `/` or `/installer`.
- Open `/contact` directly.
- Footer column Entreprise → `Contact` (same `/contact`).

## Driving it with drive.sh

Preconditions:

- Doctor is green.
- `/contact?lang=fr`.

- **Open form.** Run `.cursor/skills/verify-talker-now/helpers/drive.sh contact`. Heading includes `Contact` / `On vous répond.` Fields `#name` `#email` `#message` are present.
- **Submit.** Fill `#name` `Vérif Agent`, `#email` `verify@talker.now`, `#message` with a short sentence (company and phone optional). Choose `Envoyer`. The form is gone and the success sentence is visible.
- **Optional API check.** `POST /api/contact` with `{name,email,message}` returns `{ok:true}`. Missing fields return 400. This does not replace the form proof.
- **Proof.** `evidence/contact/01-form.png` and `02-success.png`. The success file must show the confirmation sentence, not the empty form.

## Gotchas

- The apostrophe in the success copy is `’` (U+2019), matching `lib/i18n/fr.ts`.
- `submitWaitlist` / `Rejoindre la liste` is not on this page.
- Duplicate `#email` exists only if some other tree is mounted; on `/contact` the contact form is the one in `ContactForm`.
- A 200 from `POST /api/contact` without using the form is not the user path.
