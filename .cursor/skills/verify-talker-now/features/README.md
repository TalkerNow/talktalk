# talker.now verification map

This directory is the maintained source for verifying the user-facing marketing site. Read the index before driving, then use the matching feature file.

## Baseline preconditions

- Launch with `.cursor/skills/verify-talker-now/helpers/launch.sh` so the app is at `http://127.0.0.1:3317`, not a shared `:3000`.
- Run `.cursor/skills/verify-talker-now/helpers/doctor.sh` and require 200s on `/`, `/contact`, `/installer`, `/talker-now.zip`.
- Force French unless the recipe is locale: open `/?lang=fr` (storage key `talker-lang`).
- Desktop recipes assume viewport ≥ 768px so the header shows nav links and the language control, not only `Menu`.
- Never drive an instance this run did not start.

## Driving conventions

- Start every recipe from the baseline unless its preconditions say otherwise.
- Prefer accessible names, `#id`s, and route paths over CSS class or pixel clicks.
- Treat quoted labels as literal French (or English in the locale feature).
- Run browser actions through `helpers/drive.sh <feature>` or the same Playwright/Cursor steps.
- Contact submit only logs on the server. Do not look for a Sanity document.
- Restore nothing on disk except leaving `evidence/` intact. The zip in `public/` is the real plugin archive.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes a full-page screenshot and the body text dump the driver writes as `*.aria.txt`.
- Download proof includes the saved `talker-now.zip`.
- Record the feature id and URL in `*.meta.json`.
- Report an unreachable path with the command and the unmet precondition. Do not mark a skipped entry point as verified via another path.

## Feature entry contract

Each feature file starts with an H1 and one paragraph, then exactly four H2s: `Sub-features`, `How to get to it (user POV)`, `Driving it with drive.sh`, `Gotchas`.

## Features

- [Home landing](./home.md) — wordmark, nav, hero, section anchors.
- [Demo chat](./demo-chat.md) — bubble, chips, QCM, close.
- [Contact](./contact.md) — `/contact` form and success copy.
- [Installer zip](./installer.md) — `/installer` download of `talker-now.zip`.
- [Language](./locale.md) — French default and English switch.
