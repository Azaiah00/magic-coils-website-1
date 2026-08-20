import type { MetadataRoute } from "next";

/**
 * Next.js automatically serves this as /robots.txt at build time.
 *
 * We allow every crawler to read the public site, and explicitly
 * disallow internal API routes. Next.js build assets must remain
 * crawlable because search engines need the CSS and JavaScript to
 * render and evaluate the public storefront.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block internal-only API paths without blocking rendering assets.
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://magiccoils.net/sitemap.xml",
    host: "https://magiccoils.net",
  };
}
