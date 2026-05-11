# 1rmaxcalculator.com — Astro pilot

Migration of 1rmaxcalculator.com from Hostinger Horizons (CSR React SPA) to Astro (SSG with real HTML output).

**Why:** the Horizons-built site ships only `<div id="root"></div>` in the initial HTML response, which Googlebot's first-pass crawler can't read. This Astro version produces real server-rendered HTML for every route, with proper `<a href>` nav links, meta tags, and content visible without executing JavaScript.

## Stack

- [Astro](https://astro.build) v5 — static site generator
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — auto-generated sitemap.xml
- Deployed to [Cloudflare Pages](https://pages.cloudflare.com/) — auto-builds on `git push`

## Local development

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # serve built site at http://localhost:4321
```

## Project layout

```
src/
├── layouts/         # page shells (BaseLayout.astro)
├── components/      # Header, Footer, AdSlot, etc.
├── pages/           # one file per route, all server-rendered
│   ├── index.astro
│   ├── guides/
│   └── ...
└── styles/

public/              # static assets served as-is (ads.txt, robots.txt, favicon)
astro.config.mjs     # site URL, integrations
```

## Deployment

1. Push to `main` branch.
2. Cloudflare Pages picks up the push, runs `npm run build`, deploys `./dist`.
3. Live at `https://1rmaxcalculator.com` (after DNS cutover) and `https://1rmaxcalculator-com.pages.dev` (Cloudflare preview URL).

## SEO verification

After every deploy, confirm the raw HTML has real content (not just `<div id="root"></div>`):

```javascript
fetch('https://1rmaxcalculator.com/').then(r => r.text()).then(t => {
  const title = (t.match(/<title>([^<]*)<\/title>/) || [,''])[1];
  const anchors = (t.match(/<a\s[^>]*href/g) || []).length;
  const bodyLen = ((t.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [,''])[1] || '').trim().length;
  console.log(`Title: "${title}" | Anchors: ${anchors} | Body length: ${bodyLen}`);
});
```

Expected: real page title, anchor count >10, body length in the thousands.
