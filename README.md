# Tauseef Iqbal — Portfolio

A 3D, animated portfolio built with Next.js 14, Tailwind, React Three Fiber, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Add your project screenshots

Drop images into `public/projects/` using these exact filenames (referenced in `lib/projects.ts`):

- `nexus.png`
- `codesage.png`
- `lexmind-ai.png`
- `faceless-video.png`
- `promotion-optimization.png`
- `ai-property-assistant.png`

Until an image is added, that project card automatically shows a styled placeholder — nothing breaks.

Recommended: 1600×1100px screenshots (or any 16:11-ish ratio), PNG or JPG, under ~500KB each (compress with squoosh.app or tinypng.com so the site stays fast).

## Add your resume

Put your resume PDF at `public/Tauseef_Iqbal_ML_Engineer_CV.pdf` — the "resume ↗" button in the nav links there already.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new, import the repo.
3. Framework preset: Next.js (auto-detected). No env vars needed.
4. Deploy. Done — you'll get a `*.vercel.app` URL, and can attach a custom domain later in Project Settings → Domains.

## Editing content

- **Projects:** `lib/projects.ts`
- **Bio / stats:** `components/About.tsx`
- **Work history:** `components/Experience.tsx`
- **Skills:** `components/Skills.tsx`
- **Contact links:** `components/Contact.tsx`
- **Colors / fonts:** `tailwind.config.ts` and `app/layout.tsx`

## Notes

- The particle field in the hero (`components/EmbeddingField.tsx`) is a literal nod to vector-embedding search — the highlighted amber points and connective lines are a stand-in for nearest-neighbor retrieval, which is the actual subject of your RAG projects. Feel free to tweak `COUNT` (particle density) if it feels heavy on low-end devices.
- Reduced-motion is respected (`prefers-reduced-motion`), and all interactive elements have visible focus states for accessibility.
