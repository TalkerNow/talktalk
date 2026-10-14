---
name: verify-talker-now
description: Drive the talker.now marketing site (Next.js web UI) as a visitor — launch an isolated dev instance, doctor it, click through landing/demo/contact/installer, and capture screenshots. Use when proving UI behavior, checking a landing or chat-demo change, or verifying the WordPress zip download still works.
---

# Verify talker.now

The thing a visitor actually uses is the **marketing site**: a Next.js App Router UI on `/`, `/contact`, and `/installer`, plus a demo chat bubble. The WordPress plugin under `wp-plugin/` is not this surface — prove the zip download from `/installer`, not WP-Admin.

There is no Playwright/Cypress suite in the app. Drive Chrome through the helpers in this skill. Cursor browser tools are fine if they follow the same selectors and write evidence to the same directory.

## Launch

From the repo root:

```bash
.cursor/skills/verify-talker-now/helpers/launch.sh
```

That script:

1. Refuses if a previous verification pid in `$TALKER_VERIFY_DIR` (default `/tmp/talker-verify`) is still alive.
2. Refuses if `$TALKER_VERIFY_PORT` (default `3317`) is already bound — it will not hijack someone's `npm run dev` on `:3000`.
3. Runs `npm install` in the app if `node_modules/next` is missing.
4. Builds `public/talker-now.zip` with `scripts/build-plugin-zip.sh` so `/talker-now.zip` is a real file.
5. Starts `npx next dev --hostname 127.0.0.1 --port 3317` in its own session, logs to `/tmp/talker-verify/next.log`.
6. Waits until `GET /` returns 200.

Ready when curl succeeds and the script prints `Ready: http://127.0.0.1:3317`.

Override isolation with `TALKER_VERIFY_PORT`, `TALKER_VERIFY_HOST`, `TALKER_VERIFY_DIR`. Sanity env vars are optional (public project `0l81z2o2`); the page falls back to `lib/content/landing.ts` if Sanity is empty. No auth.

Teardown: `.cursor/skills/verify-talker-now/helpers/cleanup.sh` (kills the pid this run wrote, not every `next` on the machine).

Never drive a server you did not start. If `:3000` is already up for a human, leave it alone and keep using `3317`.

## Doctor

```bash
.cursor/skills/verify-talker-now/helpers/doctor.sh
```

Pass only if all of these hold:

- Pid in `/tmp/talker-verify/next.pid` is alive.
- `GET /` is 200 and the HTML mentions `talker`.
- `GET /contact`, `/installer`, `/talker-now.zip`, `/robots.txt`, `/sitemap.xml` are 200.
- `/talker-now.zip` `Content-Type` looks like a zip / octet-stream.

Run doctor first whenever the page looks off, after a crash, or before attaching a browser.

## Drive

Default locale is **French** (`lib/i18n/fr.ts`). Persist/query key is `talker-lang` / `?lang=fr|en`. Start recipes with `/?lang=fr` so a leftover `localStorage` does not flip the copy.

```bash
.cursor/skills/verify-talker-now/helpers/drive.sh home
.cursor/skills/verify-talker-now/helpers/drive.sh demo-chat
.cursor/skills/verify-talker-now/helpers/drive.sh contact
.cursor/skills/verify-talker-now/helpers/drive.sh installer
.cursor/skills/verify-talker-now/helpers/drive.sh locale
```

`drive.sh` installs `playwright-core` under `helpers/` (verification scaffolding) and uses system Chrome (`CHROME_PATH`, default `/usr/local/bin/google-chrome`).

Stable handles (prefer these over CSS):

| Control | Handle |
| --- | --- |
| Wordmark | accessible name `talker.now` |
| Nav (desktop) | links `Fonctionnalités` `#features`, `Comment ça marche` `#how-it-works`, `Tarifs` `#pricing`, `Contact` `/contact`, `Télécharger` `/installer` |
| Mobile menu | button `Menu` (viewport `< md`) |
| Hero primary CTA | link `Créer mon agent gratuitement` → `/installer` |
| Hero demo | button `Voir une démo` — this **opens** the dialog |
| Bubble | button `Ouvrir Talker` — this **pins chips**, it does not open the panel |
| Invite chips | `Talker Now`, `Poser une question`, `Prendre rendez-vous` |
| Chat dialog | `role=dialog` name `Talker` |
| Close chat | button `Fermer Talker` (visible label `Fermer`); Escape also closes |
| Chat QCM | chips such as `Quels sont vos horaires ?` |
| Compose | `#talker-compose`, submit `Envoyer` |
| Language (desktop) | button `Langue`, then listbox options `English` / `Français` |
| Contact fields | `#name` `#company` `#email` `#phone` `#message`, submit `Envoyer` |
| Installer download | link `Télécharger le zip` `href=/talker-now.zip` |
| Pricing | `#pricing`, button `Basculer facturation annuelle`, switch `Choisir le nombre de sites` |

Bot replies in the demo lag ~1800ms. Wait for the next bot text, not a fixed sleep.

The waitlist form in `components/sections/contact.tsx` (`Rejoindre la liste`) is **not mounted** on current routes. Do not treat it as a user path.

## Evidence

Write under `.cursor/skills/verify-talker-now/evidence/<feature>/`. Cleanup must not delete this tree.

Each proof needs:

- The action (click, fill, download) and the resulting screen or file, not only the last screenshot. The driver writes viewport screenshots (not full-page) plus `*.aria.txt` and `*.meta.json`.
- App identity visible: wordmark `talker.now` and the French (or switched English) copy.
- For contact: the success sentence `C’est transmis. On vous écrit à cette adresse.` after using the form (not a raw POST unless you are also proving `/api/contact` as a side check). The server only `console.log`s — there is no DB row to read.
- For installer: the downloaded file named `talker-now.zip` plus a 200 on `/talker-now.zip`.
- Record feature id and URL in the `.meta.json` the driver writes.

Do not stub `/api/contact` or the zip. Do not call Talker context setters from the console.

## Cleanup

```bash
.cursor/skills/verify-talker-now/helpers/cleanup.sh
```

Kills the session pid from `next.pid`, then removes `/tmp/talker-verify`. Leaves `evidence/` and `public/talker-now.zip` (product file, not scratch).

If a drive fails, still run cleanup so port 3317 is not stranded.

## Helpers

All scripts are executable. From repo root:

| Script | What |
| --- | --- |
| `helpers/launch.sh` | isolated `next dev` |
| `helpers/doctor.sh` | pid + routes |
| `helpers/drive.sh <feature>` | Chrome recipe |
| `helpers/cleanup.sh` | stop this instance |

`helpers/drive.mjs` is the Playwright implementation `drive.sh` execs. `helpers/package.json` is only for `playwright-core`; do not merge it into the app's dependencies.

## Feature map

Index: [features/README.md](features/README.md). Drive every listed entry point for a feature, not a convenient substitute.
