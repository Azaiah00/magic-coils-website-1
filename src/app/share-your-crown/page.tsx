import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// SEO + social card metadata for the UGC submission page.
export const metadata: Metadata = {
  title: "Share Your Crown | Magic Coils",
  description:
    "Tag your Magic Coils transformation. We feature real Crowned community moments on our Instagram, TikTok, and at magiccoils.net. Show us your magic.",
  alternates: { canonical: "https://magiccoils.net/share-your-crown" },
  openGraph: {
    title: "Share Your Crown | Magic Coils",
    description:
      "Tag your transformation and we'll feature you in our Crowned community gallery.",
    url: "https://magiccoils.net/share-your-crown",
    type: "article",
  },
};

/**
 * Landing page that funnels visitors to tag us on Instagram or
 * TikTok with our hashtags. Intentionally simple — no form yet, just
 * directions plus social CTAs. A future iteration can add a real
 * upload form.
 */
export default function ShareYourCrownPage() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <Navbar />

      {/* Hero — royal-blue background with the brand pattern overlay,
          matching the visual treatment used elsewhere on the site. */}
      <section className="relative bg-primary text-white">
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: 'url("/images/mc-pattern.png")',
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Show Us Your Magic
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
            Share Your{" "}
            <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
              Crown
            </span>
            .
          </h1>
          <p className="font-sans text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Every crown tells a story. Tag your Magic Coils transformation, your
            wash day, your stylist moment — we feature real Crowned community
            posts on our Instagram, TikTok, and the magiccoils.net gallery.
          </p>
        </div>
      </section>

      {/* Three-step "how to share" card row. */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-primary text-center mb-12">
            How to share
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-accent">1</span>
              </div>
              <h3 className="font-serif text-xl text-primary mb-3">
                Snap your moment
              </h3>
              <p className="font-sans text-sm text-primary/70 leading-relaxed">
                Wash day, twist out, silk press, finished look — whatever makes
                you feel crowned.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-accent">2</span>
              </div>
              <h3 className="font-serif text-xl text-primary mb-3">Tag us</h3>
              <p className="font-sans text-sm text-primary/70 leading-relaxed">
                Use <strong>@magiccoilsofficial</strong> and{" "}
                <strong>#crownedinmagic</strong> on Instagram or TikTok.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-accent">3</span>
              </div>
              <h3 className="font-serif text-xl text-primary mb-3">
                Get featured
              </h3>
              <p className="font-sans text-sm text-primary/70 leading-relaxed">
                We share community posts every week on our feed, in our emails,
                and on the site.
              </p>
            </div>
          </div>

          {/* Social CTAs + UGC license disclosure linking to Terms. */}
          <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/magiccoilsofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent transition-colors"
              >
                Tag us on Instagram
              </a>
              <a
                href="https://tiktok.com/@magiccoilsofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-primary text-primary px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-colors"
              >
                Tag us on TikTok
              </a>
            </div>
            <p className="text-xs text-primary/50 mt-6 max-w-md mx-auto">
              By tagging us, you grant Magic Coils permission to repost your
              content. See our{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>{" "}
              for details.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
