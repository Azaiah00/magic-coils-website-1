import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curl Talk — The Magic Coils Blog",
  description:
    "Tutorials, ingredient education, and textured-hair transformations from the Magic Coils team.",
  alternates: { canonical: "https://magiccoils.net/blog" },
  openGraph: {
    title: "Curl Talk — The Magic Coils Blog",
    description:
      "Education, tutorials, and transformations for healthy textured crowns.",
    url: "https://magiccoils.net/blog",
    type: "article",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
