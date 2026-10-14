# Demo chat

The on-site demo is a bot that asks questions with chips (QCM), not a free-form “ask anything” box. It lives on `/` and `/installer` via `TalkerLauncherBubble`.

## Sub-features

- `demo-open-hero` opens the panel from `Voir une démo`.
- `demo-open-chip` opens the panel from a bubble invite chip after pinning.
- `demo-qcm` advances with chips such as `Quels sont vos horaires ?`.
- `demo-close` dismisses the dialog with `Fermer Talker` or Escape.

## How to get to it (user POV)

- On `/` or `/installer`, choose `Voir une démo` in the hero (home only).
- Choose `Ouvrir Talker` (bottom-right bubble) to pin chips, then choose `Talker Now`, `Poser une question`, or `Prendre rendez-vous`.
- After open, answer with chips or type in `#talker-compose`.

## Driving it with drive.sh

Preconditions:

- Doctor is green.
- `/?lang=fr`.
- Desktop viewport so the bubble is 80px and chips have room.

- **Hero entry.** Choose `Voir une démo`. Run `.cursor/skills/verify-talker-now/helpers/drive.sh demo-chat` (or click that button). A `dialog` named `Talker` appears with the start bot line `Bonjour. Je suis l'assistant du cabinet.`
- **Chip answer.** Choose `Quels sont vos horaires ?`. After the typing indicator (`Talker écrit`), the bot text includes `Nous recevons du lundi au vendredi`.
- **Bubble entry (not covered by drive.sh demo-chat — do this extra pass when proving chips).** Choose `Ouvrir Talker`, then `Talker Now`. The same `dialog` named `Talker` opens already advanced toward the Talker-now intent.
- **Close.** Choose `Fermer Talker`. The dialog is gone. Escape must do the same.
- **Proof.** `evidence/demo-chat/01-opened.png` shows the dialog; `02-horaires.png` shows the horaires reply. Do not treat a screenshot of the closed bubble as proof the QCM ran.

## Gotchas

- `Ouvrir Talker` toggles chips. It does **not** open the dialog. `Voir une démo` does.
- Invite chips are `opacity-0` / `pointer-events-none` until hover, pin, or the attract pulse (~2.4s). Click `Ouvrir Talker` first if chips are not hittable.
- The next bot message is delayed 1800ms. Wait for the text (timeout ≥ 8s), not `networkidle`.
- `TalkerLauncher` (`aria-label` `Démo Talker`) is unused on current pages. The live bubble dialog is named `Talker`.
- Email step requires a value containing `@` before submit.
