import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use project directory as root to avoid lockfile warning when multiple lockfiles exist
  turbopack: {
    root: process.cwd(),
  },
  // Allow product photos served from Shopify's CDN (used once we switch to
  // Shopify-hosted media). Local /images paths still work as before.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
};

export default nextConfig;
