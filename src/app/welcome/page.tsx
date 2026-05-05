import { Metadata } from "next";
import WelcomeClient from "./WelcomeClient";

export const metadata: Metadata = {
  title: "Unlock 10% Off | Magic Coils",
  description: "Drop your email and we'll send your 10% off code instantly. Crowned in Magic.",
  openGraph: {
    title: "Unlock 10% Off | Magic Coils",
    description: "Drop your email and we'll send your 10% off code instantly. Crowned in Magic.",
    images: [
      {
        url: "/images/promo-card.png",
        width: 1200,
        height: 630,
        alt: "Magic Coils 10% Off",
      },
    ],
  },
};

export default function WelcomePage() {
  return <WelcomeClient />;
}
