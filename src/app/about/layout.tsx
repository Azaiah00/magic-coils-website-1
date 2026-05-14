import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Magic Coils",
  description:
    "Meet Magic Coils founder Antwun Wilson and learn how Hair For You LLC built a professional textured-hair brand rooted in crown care.",
  alternates: { canonical: "https://magiccoils.net/about" },
  openGraph: {
    title: "Our Story | Magic Coils",
    description:
      "The founder story, mission, and values behind Magic Coils professional haircare.",
    url: "https://magiccoils.net/about",
    type: "article",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
