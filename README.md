# Tauseef Iqbal — Portfolio

Next.js 14 (App Router) + Tailwind CSS, with a lazy-loaded React Three Fiber hero. Dark and light themes.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Before deploying, check with:

```bash
npm run lint
npm run build
```

## Editing content

All text is in two files, so you don't need to touch any layout code:

- **Name, role, links, about, stats, experience, skills:** `lib/content.ts`
- **Projects:** `lib/projects.ts`. Set `featured: true` for a large card. The first featured project gets the wide card. Add a `live` URL to show a "Live demo" link.
- **Colours:** CSS variables at the top of `app/globals.css` (dark and light).
- **Social preview image:** `app/opengraph-image.png` (1200×630).

## Screenshots and CV

- Project screenshots go in `public/projects/`. Set `image` in `lib/projects.ts`. Next.js resizes and converts them to AVIF/WebP automatically.
- The CV lives at `public/Tauseef_Iqbal_ML_Engineer_CV.pdf`.

## Structure

```
app/          layout (SEO, fonts, theme), page, robots, sitemap, OG image, icon
components/
  layout/     Nav (with mobile menu), ThemeToggle, Footer
  sections/   Hero, About, Projects, Skills, Experience, Contact
  ui/         Button, Tag, Section, Reveal, ProjectCard, ProjectRow, Icons
  three/      RetrievalField (3D), StaticField (SVG fallback), HeroVisual (picks one)
lib/          content.ts, projects.ts
```

The 3D hero only loads on screens 768px and wider, after the page is idle. It is skipped for visitors who prefer reduced motion and pauses when it is scrolled off screen. Everyone else sees the SVG fallback.

## Deploy (Vercel)

1. Push the branch to GitHub. Vercel builds a preview URL for it automatically.
2. Once the preview looks right, merge into `main` to deploy to production.
3. Optional: in Vercel → Settings → Environment Variables, set `NEXT_PUBLIC_SITE_URL` to your real domain (e.g. `https://yourdomain.com`). It is used for canonical and social-share URLs. Without it, the Vercel production URL is used.
