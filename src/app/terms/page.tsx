import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// SEO + social card metadata for the Terms of Service page.
export const metadata: Metadata = {
  title: "Terms of Service | Magic Coils",
  description:
    "Terms governing your purchase and use of magiccoils.net and Magic Coils products.",
  alternates: { canonical: "https://magiccoils.net/terms" },
  openGraph: {
    title: "Terms of Service | Magic Coils",
    description:
      "Terms governing your purchase and use of magiccoils.net and Magic Coils products.",
    url: "https://magiccoils.net/terms",
    type: "article",
  },
};

/**
 * Same pattern as /privacy: reads `content/terms.md` and renders it
 * inside the standard Navbar / Footer shell with `prose` styling from
 * the Tailwind typography plugin.
 */
export default function TermsPage() {
  const filePath = path.join(process.cwd(), "content", "terms.md");
  const markdown = fs.readFileSync(filePath, "utf-8");

  return (
    <main className="min-h-screen flex flex-col w-full">
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24 prose prose-neutral">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
      <Footer />
    </main>
  );
}
