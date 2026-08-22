import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products | Magic Coils",
  description:
    "Shop the full Magic Coils line — eight argan + vitamin C + honey oil formulations and two routine systems for textured crowns. Free U.S. standard shipping on orders of $70 or more.",
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
