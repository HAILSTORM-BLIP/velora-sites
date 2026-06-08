# Velora Sites

A shared repository for the websites built in this workspace.

## Sites

| Site | Source | Stack | GitHub Pages path |
| --- | --- | --- | --- |
| Mechanical Portfolio | `app/`, `components/`, `public/` | Next.js static export, React, Tailwind CSS, Three.js, GSAP | `https://hailstorm-blip.github.io/velora-sites/` |
| Flavored Cafe | `cafe/` | Vite, React, GSAP, Three.js | `https://hailstorm-blip.github.io/velora-sites/cafe/` |

## Local Development

Portfolio site:

```bash
npm install
npm run dev
```

Cafe site:

```bash
cd cafe
npm install
npm run dev
```

## Static Builds

Portfolio site:

```bash
npm run build
```

Cafe site:

```bash
cd cafe
npm run build
```

## Deployments

GitHub Pages is configured in `.github/workflows/deploy.yml` and publishes both sites after pushes to `main`.

Existing hosting metadata found in this workspace:

- Vercel project: `jishan.builds`
- Vercel project ID: `prj_1bfU2SzohsfZiNqa1avliHb9eX8W`
- Vercel team/org ID: `team_OEEIvahD6g1Sg7AAs9Vm50rB`
- Netlify site ID: `d75203ab-5385-4026-9078-c7be54b33a3a`

The root site can also be deployed to Vercel or Netlify as a static Next.js export. The cafe site can be deployed independently from `cafe/` with `npm run build` and `dist/` as the publish directory.
