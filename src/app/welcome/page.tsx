import { Metadata } from "next";
import WelcomeClient from "./WelcomeClient";

// Absolute URL so OG scrapers (iMessage, Slack, Facebook, etc.) never hit localhost.
// Root layout sets metadataBase = https://magiccoils.net, but we pin it here too
// so the welcome share card is always intact.
const OG_IMAGE = "https://magiccoils.net/images/promo-card.png";

export const metadata: Metadata = {
  title: "Join the Crowned Community | Magic Coils",
  description: "Get Magic Coils textured-hair routine education, product updates, and new-release news.",
  alternates: { canonical: "https://magiccoils.net/welcome" },
  openGraph: {
    title: "Join the Crowned Community | Magic Coils",
    description: "Get Magic Coils textured-hair routine education, product updates, and new-release news.",
    url: "https://magiccoils.net/welcome",
    siteName: "Magic Coils",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Join the Magic Coils Crowned Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Crowned Community | Magic Coils",
    description: "Get Magic Coils textured-hair routine education, product updates, and new-release news.",
    images: [OG_IMAGE],
  },
};

export default function WelcomePage() {
  return (
    <>
      <h1 className="sr-only">Join the Magic Coils Crowned Community</h1>
      <WelcomeClient />
    </>
  );
}
