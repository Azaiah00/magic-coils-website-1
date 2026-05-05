import { Metadata } from "next";
import WelcomeClient from "./WelcomeClient";

// Absolute URL so OG scrapers (iMessage, Slack, Facebook, etc.) never hit localhost.
// Root layout sets metadataBase = https://magiccoils.net, but we pin it here too
// so the welcome share card is always intact.
const OG_IMAGE = "https://magiccoils.net/images/promo-card.png";

export const metadata: Metadata = {
  title: "Unlock 10% Off | Magic Coils",
  description: "Drop your email and we'll send your 10% off code instantly. Crowned in Magic.",
  openGraph: {
    title: "Unlock 10% Off | Magic Coils",
    description: "Drop your email and we'll send your 10% off code instantly. Crowned in Magic.",
    url: "https://magiccoils.net/welcome",
    siteName: "Magic Coils",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Magic Coils 10% Off",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock 10% Off | Magic Coils",
    description: "Drop your email and we'll send your 10% off code instantly. Crowned in Magic.",
    images: [OG_IMAGE],
  },
};

export default function WelcomePage() {
  return <WelcomeClient />;
}
