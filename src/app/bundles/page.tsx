import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import BundleShowcase from "@/components/BundleShowcase";

export const metadata = {
  title: "Magic Bundles — Save Up to $51 | Magic Coils",
  description: "Curated 4A–4C hair systems designed to work together. Save 34% on every bundle. Built by stylist Antwun Wilson. Crowned in Magic.",
};

const BUNDLES = [
  {
    slug: "bundle-2-strand-twist",
    name: "The Magic Coils 2 Strand Twist",
    description: "Curated 4A–4C hair systems designed to work together.",
    price: 50.00,
    image: "https://magiccoils.net/images/bundle-2-strand-twist-new.png",
  },
  {
    slug: "bundle-magic-press",
    name: "The Magic Press",
    description: "Pro 33.8oz sizes. The kit your stylist uses, in your shower.",
    price: 100.00,
    image: "https://magiccoils.net/images/bundle-magic-press-new.png",
  }
];

export default function BundlesPage() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-background overflow-hidden">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            BUNDLES.map((bundle) => ({
              "@context": "https://schema.org",
              "@type": "Product",
              name: bundle.name,
              image: bundle.image,
              description: bundle.description,
              brand: {
                "@type": "Brand",
                name: "Magic Coils",
              },
              offers: {
                "@type": "Offer",
                url: `https://magiccoils.net/bundles`,
                priceCurrency: "USD",
                price: bundle.price,
                availability: "https://schema.org/InStock",
              },
            }))
          ),
        }}
      />
      <Navbar />
      <PageTransition>
        <BundleShowcase />
      </PageTransition>
      <Footer />
    </main>
  );
}