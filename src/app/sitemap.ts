import type { MetadataRoute } from "next";
import { products } from "@/data/products";

// Single source for absolute URLs in the sitemap. Keep in sync with
// metadataBase in src/app/layout.tsx so every entry resolves to production.
const BASE = "https://magiccoils.net";

/**
 * Next.js automatically serves this as /sitemap.xml at build time.
 *
 * Static routes are listed by hand below; dynamic product routes are
 * generated from src/data/products.ts so the sitemap stays in sync as
 * we add or remove products.
 *
 * `priority` is a relative hint to crawlers about which pages matter
 * most. We weight the home page, shop, and bundles highest; policy
 * pages lowest.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages. /links is intentionally excluded — it's a static HTML
  // rewrite, not a Next.js route, and isn't a page we want indexed.
  const staticPaths = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/bundles", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/quiz", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/directory", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/distributor", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/welcome", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/share-your-crown", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // One sitemap entry per product. Bundles get a slight bump because
  // they are higher-value landing pages for our ads.
  const productPaths = products.map((product) => ({
    url: `${BASE}/product/${product.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: product.category === "bundles" ? 0.95 : 0.85,
  }));

  return [
    ...staticPaths.map((p) => ({
      url: `${BASE}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...productPaths,
  ];
}
