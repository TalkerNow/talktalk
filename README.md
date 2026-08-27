# talker.now

Site marketing de **Talker**. Shell visuel = template Optimus (copy dummy). Header = lockup Talker. Brief : [`AGENTS.md`](./AGENTS.md).

## Lancer en local

```bash
npm install
cp .env.example .env.local   # optionnel — les valeurs publiques sont déjà en dur
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production
npm run start    # après le build
```

Stack : Next.js App Router, TypeScript, Tailwind CSS.

## Contenu

La copie de la page d’accueil vit dans `lib/content/landing.ts` (mêmes champs qu’un futur document Sanity `landingPage`).

Sanity est branché en **lecture publique uniquement** :

- projet `0l81z2o2`, dataset `production`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` (pas de jeton)
- `lib/content/load.ts` interroge Sanity ; s’il n’y a pas encore de document, ou si l’appel échoue, la page utilise le fichier local

Pour basculer le texte vers le CMS plus tard : publier un singleton `landingPage` avec les champs de `lib/content/types.ts` (schéma de référence dans `lib/sanity/landingPage.schema.ts`). Ajouter un Studio à part — pas dans ce premier envoi.

## Liste d’attente

Le bloc contact envoie email + URL de site vers une Server Action (`lib/actions/waitlist.ts`). Les demandes sont validées et journalisées. Brancher ensuite Sanity (écriture avec un vrai jeton) ou un e-mail. Ne pas inventer de secret.

## Déploiement

Le projet Vercel `talktalk` (équipe Talker) se déploie depuis `main` sur GitHub `TalkerNow/talktalk`.
