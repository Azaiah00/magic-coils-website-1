import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// SEO + social card metadata for the Privacy Policy page.
export const metadata: Metadata = {
  title: "Privacy Policy | Magic Coils",
  description:
    "How Magic Coils (Hair For You LLC) collects, uses, and protects your personal information.",
  alternates: { canonical: "https://magiccoils.net/privacy" },
  openGraph: {
    title: "Privacy Policy | Magic Coils",
    description:
      "How Magic Coils (Hair For You LLC) collects, uses, and protects your personal information.",
    url: "https://magiccoils.net/privacy",
    type: "article",
  },
};

/**
 * Renders the Privacy Policy by reading the markdown file at
 * `content/privacy.md`. Keeping the long-form legal copy in a
 * markdown file means non-developers can update wording later without
 * touching JSX.
 *
 * This is a server component, so the `fs` read happens at build time
 * (or per-request in dev) and we ship plain HTML to the client.
 */
export default function PrivacyPage() {
  const filePath = path.join(process.cwd(), "content", "privacy.md");
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
