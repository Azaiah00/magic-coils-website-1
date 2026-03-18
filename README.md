# Magic Coils — E-commerce storefront

Next.js (App Router) + Tailwind CSS. Brand: **Crowned in Magic.**

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Netlify

1. Connect this repo: [magic-coils-website-1](https://github.com/Azaiah00/magic-coils-website-1).
2. **Build command:** `npm run build`
3. **Publish directory:** `.next` is not static — use **Next.js** runtime on Netlify:
   - Install the **Essential Next.js** plugin (or use Netlify’s Next.js preset).
   - Or set **Framework preset** to **Next.js** so Netlify runs `next build` and serves the app correctly.

4. **Node version:** 20.x (set in Netlify env or `.nvmrc` if needed).

## Environment

No secrets required for the current static/demo storefront. Add env vars later if you connect a real payment or CMS API.
