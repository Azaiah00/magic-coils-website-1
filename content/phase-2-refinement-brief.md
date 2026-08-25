# Magic Coils Website — Phase 2 Refinement Brief

Status: **DEFERRED — do not implement or deploy with Phase 1**

## Strategic sequence

1. Publish the approved Phase 1 website after Shopify cleanup.
2. Let Antwun review the improved information architecture, Shopify inventory behavior, and content.
3. Build Phase 2 as a separate preview later this week.
4. Present the refinement only after internal visual, mobile, performance, accessibility, and conversion QA.
5. Publish Phase 2 only after explicit approval.

## Refinement objective

Elevate the existing site from polished and functional to a more distinctive luxury haircare experience without replacing the working product architecture, obscuring products, slowing mobile pages, or adding motion that distracts from shopping.

## Reference library for the Phase 2 research pass

- Refero Styles — visual direction, editorial layout, luxury spacing, and brand pattern research: https://styles.refero.design/
- shadcn/ui — accessible, restrained interaction patterns and consistent states: https://ui.shadcn.com/
- Motion Sites — page-transition and scroll-choreography references: https://motionsites.ai/
- Watermelon UI — polished component details and composition ideas: https://ui.watermelon.sh/
- Mobbin Web — current commerce onboarding, navigation, search, PDP, and conversion-flow patterns: https://mobbin.com/discover/apps/web/latest
- Aceternity UI — selective premium motion and spotlight treatments: https://ui.aceternity.com/components
- Casberry Particles — optional atmospheric particles or texture, only if lightweight and non-obstructive: https://particles.casberry.in/

## Rules for using the references

- Use the references for ideas, not direct visual copying.
- Preserve Magic Coils' navy, gold, cream, ornate-frame language, and supplied logo system.
- Keep product bottles and textured-hair imagery unobstructed.
- Use motion to clarify hierarchy and guide attention; never place continuous animation behind product copy or checkout actions.
- Favor one or two signature motion moments over effects on every section.
- Respect reduced-motion preferences.
- Avoid particle effects on product-detail, cart, checkout, or mobile navigation views.
- Keep the product and routine paths recognizable so Phase 1 analytics remain comparable.

## Proposed Phase 2 workstreams

### 1. Luxury art direction

- Refine typography hierarchy toward an editorial beauty look.
- Introduce more intentional negative space and tighter gold-accent discipline.
- Standardize corner radii, borders, shadows, and surface treatments.
- Create a reusable ornate divider/pattern system derived from the approved logo artwork.

### 2. Conversion refinement

- Improve the home-page route cards and product cards without changing their destinations.
- Strengthen size, stock, and primary-action hierarchy on product pages.
- Refine the sold-out state and back-in-stock path.
- Improve mobile sticky purchase actions where appropriate.
- Make consultation, distributor, and salon pathways visibly distinct from retail shopping.

### 3. Motion system

- One premium hero entrance sequence.
- Subtle reveal timing for routine cards and product photography.
- Clear hover/focus feedback for desktop without hiding information.
- Lightweight page transitions only if they pass performance QA.

### 4. Mobile-first polish

- Recheck thumb reach, menu density, content order, product media height, and sticky controls.
- Avoid full-screen decorative animation on mid-range phones.
- Keep all core actions usable at 320 px width and at 200% text zoom.

## Acceptance gates

- No broken routes, Shopify cart regressions, or inventory mismatches.
- No text or graphic overlays blocking product bottles or faces.
- WCAG-aware color contrast, keyboard navigation, focus states, and reduced motion.
- Stable responsive layouts across phone, tablet, and desktop.
- Images preserve aspect ratio and do not cause layout shift.
- Motion remains smooth and does not materially worsen Core Web Vitals.
- Separate preview URL and before/after review before production approval.
