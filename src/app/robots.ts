import type { MetadataRoute } from "next";

/**
 * Next.js automatically serves this as /robots.txt at build time.
 *
 * We allow every crawler to read the public site, and explicitly
 * disallow internal API routes and Next.js build artifacts so they
 * never end up indexed. The sitemap URL is included so search engines
 * can discover product pages without us submitting each manually.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block internal-only paths from being indexed.
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://magiccoils.net/sitemap.xml",
    host: "https://magiccoils.net",
  };
}
