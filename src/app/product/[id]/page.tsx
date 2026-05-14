import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ProductPageClient from "./ProductPageClient";
import { products } from "@/data/products";

type Params = { id: string };

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found | Magic Coils" };

  const url = `https://magiccoils.net/product/${product.id}`;
  const descShort = product.description.split("\n")[0].slice(0, 155).trim();

  return {
    title: `${product.name} | Magic Coils`,
    description: descShort,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | Crowned in Magic`,
      description: descShort,
      url,
      type: "website",
      images: [
        {
          url: `https://magiccoils.net${product.image}`,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Magic Coils`,
      description: descShort,
      images: [`https://magiccoils.net${product.image}`],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />

      <Script
        id={`product-schema-${product.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description.replace(/\n+/g, " "),
            image: `https://magiccoils.net${product.image}`,
            brand: { "@type": "Brand", name: "Magic Coils" },
            category: product.category,
            offers: product.variants?.length
              ? product.variants.map((v) => ({
                  "@type": "Offer",
                  url: `https://magiccoils.net/product/${product.id}`,
                  priceCurrency: "USD",
                  price: v.price.toFixed(2),
                  availability: "https://schema.org/InStock",
                  name: v.sizeLabel,
                }))
              : {
                  "@type": "Offer",
                  url: `https://magiccoils.net/product/${product.id}`,
                  priceCurrency: "USD",
                  price: product.price.toFixed(2),
                  availability: "https://schema.org/InStock",
                },
          }),
        }}
      />
      <Script
        id={`breadcrumb-schema-${product.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://magiccoils.net/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Shop",
                item: "https://magiccoils.net/shop",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: `https://magiccoils.net/product/${product.id}`,
              },
            ],
          }),
        }}
      />

      <PageTransition>
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <ol className="flex items-center gap-2 text-xs text-primary/60">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/shop" className="hover:text-accent">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-primary">{product.name}</li>
          </ol>
        </nav>

        <ProductPageClient product={product} />
      </PageTransition>
      <Footer />
    </main>
  );
}
