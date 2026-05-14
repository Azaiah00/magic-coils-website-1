import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products | Magic Coils",
  description:
    "Shop the full Magic Coils line — eight argan + vitamin C + honey oil formulations and two bundle systems for textured crowns. Free shipping over $75.",
  alternates: { canonical: "https://magiccoils.net/shop" },
  openGraph: {
    title: "Shop All Products | Magic Coils",
    description:
      "Argan oil, vitamin C, honey oil — eight formulations and two bundles for textured hair.",
    url: "https://magiccoils.net/shop",
    type: "website",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
