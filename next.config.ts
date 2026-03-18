import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use project directory as root to avoid lockfile warning when multiple lockfiles exist
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
