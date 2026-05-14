import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Hair Routine | Magic Coils Quiz",
  description:
    "Take the Magic Coils Hair Quiz to get a personalized product routine for your texture, goals, and styling preferences.",
  alternates: { canonical: "https://magiccoils.net/quiz" },
  openGraph: {
    title: "Find Your Hair Routine | Magic Coils Quiz",
    description:
      "Answer a few questions and get your personalized Magic Coils routine.",
    url: "https://magiccoils.net/quiz",
    type: "article",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
