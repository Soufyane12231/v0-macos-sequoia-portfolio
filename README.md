# SoufyaneOS — portfolio de Soufyane Elaouni

Portfolio de **[Soufyane Elaouni](https://elaounisoufyane.space/)**, élève ingénieur en dernière année de
Mécatronique à l'ENSA Tétouan, spécialisé en **automatisme industriel** et **systèmes embarqués**.

Le site a deux parcours :

| Route | Audience | Contenu |
| --- | --- | --- |
| `/` | Recruteurs, ATS, SEO | CV sémantique, lisible sans JavaScript, bilingue FR/EN, téléchargeable |
| `/os` | Visiteurs curieux | Bureau interactif SoufyaneOS : fenêtres, Dock, Spotlight, terminal |

Il n'y a **aucun mot de passe** et **aucun chargement bloquant** : la page d'accueil affiche immédiatement
l'intégralité du parcours professionnel.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React Server Components)
- React 19, TypeScript strict
- Tailwind CSS 4
- Framer Motion (animations de l'expérience `/os`)
- Zustand (état du bureau)
- Vercel Analytics

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
```

Vérifications avant commit :

```bash
npm run typecheck  # tsc --noEmit (les erreurs TS font échouer le build)
npm run build
```

## Structure

```
app/
  layout.tsx           métadonnées, polices, viewport, JSON-LD (app/page.tsx)
  page.tsx             page d'accueil « recruteur » + schema.org/Person
  os/page.tsx          route de l'expérience interactive (métadonnées, noindex)
  os/os-desktop.tsx    rendu client : le bureau choisit bureau/mobile selon le viewport
  robots.ts sitemap.ts manifest.ts opengraph-image.tsx
components/
  portfolio/           page recruteur + provider de langue FR/EN
  desktop/             barre de menus, Dock, terminal de bienvenue
  windows/             fenêtres (profil, projets, expérience, compétences…)
  mobile/              version mobile de l'expérience /os
  system/              Spotlight, menu contextuel, notifications
lib/
  portfolio-data.ts    source de vérité du contenu (bilingue)
  desktop-store.ts     état du bureau (Zustand)
public/cv/             CV PDF téléchargeable
```

## Règle de contenu

Tout le texte visible provient de `lib/portfolio-data.ts`, lui-même aligné sur le CV
(`public/cv/elaouni-soufyane-cv.pdf`). Les données sont bilingues : le français est la langue par défaut
(le CV est en français), l'anglais est accessible via l'interrupteur ou `localStorage`.

Ne pas ajouter de pourcentages de compétence, de notes en étoiles, de KPIs ou de disponibilités non
vérifiables : ce sont précisément les éléments qui ont été retirés lors de la refonte parce qu'ils n'étaient
pas vérifiables.

## Déploiement

Le dépôt est connecté à Vercel : chaque push sur `main` déclenche un déploiement sur
<https://elaounisoufyane.space/>.
