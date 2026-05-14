import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Magic Coils Stylist | The Royal Court",
  description:
    "Find licensed stylists who use Magic Coils products and specialize in textured-hair services near you.",
  alternates: { canonical: "https://magiccoils.net/directory" },
  openGraph: {
    title: "Find a Magic Coils Stylist | The Royal Court",
    description:
      "Discover professional stylists in the Magic Coils Royal Court directory.",
    url: "https://magiccoils.net/directory",
    type: "article",
  },
};

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
