import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Magic Coils",
  description:
    "Answers about Magic Coils products, ingredients, shipping, returns, the stylist program, and wholesale.",
  alternates: { canonical: "https://magiccoils.net/faq" },
  openGraph: {
    title: "FAQ | Magic Coils",
    description: "Answers about Magic Coils products, ingredients, and policies.",
    url: "https://magiccoils.net/faq",
    type: "article",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
