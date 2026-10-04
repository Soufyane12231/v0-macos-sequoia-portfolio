# Portfolio — Soufyane Elaouni

Site one-page, bilingue (FR/EN), de **[Soufyane Elaouni](https://elaounisoufyane.space/)**,
élève ingénieur en dernière année de Mécatronique à l'ENSA Tétouan, spécialisé en
**automatisme industriel** et **systèmes embarqués**.

Le site est pensé pour un recruteur qui ouvre un lien et décide en dix secondes :
une seule page, des faits vérifiables, aucune donnée inventée.

## Stack

| | |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) — App Router, React 19 |
| Langage | TypeScript `strict` (les erreurs TS font échouer le build) |
| Styles | Tailwind CSS 4 + un fichier de tokens, `app/globals.css` |
| Icônes | SVG inline écrits à la main — **aucun emoji, aucun package d'icônes** |
| Animations | CSS keyframes + un `IntersectionObserver` partagé |

Il n'y a **ni bibliothèque de composants, ni moteur d'animation tiers, ni route
secondaire**. Le rebuild a retiré le bureau `/os` et avec lui ~44 dépendances ; ce
qui reste est le strict nécessaire pour rendre la page.

## Démarrage

```bash
corepack pnpm install
corepack pnpm run dev        # http://localhost:3000
```

Vérifications avant commit :

```bash
corepack pnpm run typecheck  # tsc --noEmit
corepack pnpm run build
```

## Routes

| Route | Rendu | Rôle |
| --- | --- | --- |
| `/` | statique | la page unique |
| `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/opengraph-image` | statique | SEO et partage social |
| `/cv/elaouni-soufyane-cv.pdf` | dynamique | redirection 308 vers le CV canonique |
| `/elaouni-soufyane-cv.pdf` | statique (`public/`) | le CV, seule source de vérité |

Il n'y a **aucun mot de passe** et **aucun chargement bloquant** : le HTML statique
contient déjà tout le parcours professionnel, lisible sans JavaScript.

## Structure

```
app/
  layout.tsx        métadonnées FR/EN, polices, viewport, <html lang> dynamique
  page.tsx          la page + JSON-LD schema.org/Person
  globals.css       tokens de palette, primitives d'animation, overrides .on-sand
  robots.ts sitemap.ts manifest.ts opengraph-image.tsx
  cv/…/route.ts     redirection 308 du chemin historique du CV
components/
  portfolio/language-provider.tsx   bascule FR/EN, persistée dans localStorage
  onepage/
    one-page.tsx     assemblage des 7 sections
    chrome.tsx       header, navigation, sélecteur de langue, retour en haut
    command-palette.tsx  palette « Aller à » (Ctrl/Cmd-K)
    modal.tsx        primitive de dialogue unique (focus trap, Échap, restitution)
    motion.tsx       useCountUp, RevealObserver, LangProvider
    schematics.tsx   schémas SVG dessinés à la main (bus CAN, duel, matrice…)
    section.tsx      shell commune : index, eyebrow, <h2>, backdrop
    sections/        hero, en-bref, experience, projects, skills, parcours, contact
lib/
  portfolio-data.ts  source de vérité du contenu, bilingue
public/
  elaouni-soufyane-cv.pdf
```

## Règle de contenu

Tout le texte visible vient de `lib/portfolio-data.ts` et doit correspondre au CV.
Les données sont bilingues : le français par défaut (le CV est en français),
l'anglais via l'interrupteur ou `localStorage`.

Sont **interdits**, parce qu'ils ont été retirés faute d'être vérifiables :

- pourcentages de compétence, notes en étoiles, jauges, « niveau » ;
- témoignages clients, logos d'entreprises, métriques d'interface inventées ;
- dates, entreprises, technologies ou clients qui ne figurent pas dans le CV ;
- toute formulation d'ingénieur diplômé (c'est « **élève ingénieur** ») ;
- la date de fin de l'actuel stage, qui n'est pas connue.

L'anti-redondance est structurelle, pas seulement éditoriale : les liens
(LinkedIn, GitHub, e-mail, téléphone, site) n'apparaissent **que** dans Contact, les
quatre chiffres (19 s, 9 ECU, 80+, 2) **seulement** dans « En bref », le statut de
stage **seulement** dans le hero, et les compétences **seulement** dans
« Compétences ». Le CV est proposé dans le header et dans Contact, et nulle part
ailleurs.

## Palette et accessibilité

Les tokens vivent en haut de `app/globals.css`, avec le ratio de contraste mesuré
en commentaire. Base pétrole/teal sombre, accents sable chaud, une seule surface
claire.

Deux règles méritent d'être lues avant d'y toucher :

- **`.on-sand` est porteur de sens, pas décoratif.** C'est lui qui peint le panneau
  sable « En bref ». Toutes les couleurs de texte sombres de ce panneau ont été
  choisies *par rapport* à ce fond ; sans la règle de fond, la section hérite du
  pétrole du `body` et chaque texte sombre devient invisible.
- **`focus-sand` n'a de sens que dans `.on-sand`.** Sur fond sombre, l'anneau de
  focus est `--signal`.

L'accessibilité n'est pas théorique : chaque lien d'ancrage est en HTML réel, les
dialogues piègent le focus et le restituent, `prefers-reduced-motion` désactive
toutes les animations *et* leurs équivalents statiques sont déjà dans le HTML, et les
157 textes de la page ont été vérifiés au pixel contre le fond réellement peint
(WCAG AA).

## Déploiement

Le dépôt est connecté à Vercel : chaque push sur `main` déclenche un déploiement sur
<https://elaounisoufyane.space/>. `vercel.json` impose `pnpm install --frozen-lockfile`,
donc **`pnpm-lock.yaml` doit être commité avec toute modification de `package.json`**.