import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import {
  getCollectionProducts,
  getStoreCollection,
  storeCollections,
} from "@/data/collections";
import CollectionProductGrid from "./CollectionProductGrid";

type Params = { handle: string };

export function generateStaticParams() {
  return storeCollections.map((collection) => ({ handle: collection.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = getStoreCollection(handle);
  if (!collection) return { title: "Collection Not Found | Magic Coils" };

  const url = `https://magiccoils.net/collections/${collection.handle}`;
  return {
    title: `${collection.title} | Magic Coils`,
    description: collection.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${collection.title} | Magic Coils`,
      description: collection.description,
      url,
      type: "website",
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const collection = getStoreCollection(handle);
  if (!collection) notFound();

  const collectionProducts = getCollectionProducts(collection);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-5 text-xs text-primary/60 md:px-8">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span aria-hidden="true" className="px-2">›</span>
          <Link href="/shop" className="hover:text-accent">Shop</Link>
          <span aria-hidden="true" className="px-2">›</span>
          <span className="text-primary">{collection.title}</span>
        </nav>

        <header className="border-y border-accent/20 bg-primary px-4 py-20 text-center text-white md:px-8 md:py-28">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-accent">
            {collection.eyebrow}
          </p>
          <h1 className="mx-auto max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
            {collection.title}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            {collection.description}
          </p>
        </header>

        <section className="container mx-auto px-4 py-16 md:px-8 md:py-24">
          <div className="mb-12 flex flex-col justify-between gap-4 border-b border-primary/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Shop the routine</p>
              <p className="mt-2 text-sm text-primary/60">
                {collectionProducts.length} {collectionProducts.length === 1 ? "product" : "products"}
              </p>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-primary underline decoration-accent underline-offset-4">
              View all products
            </Link>
          </div>

          <CollectionProductGrid products={collectionProducts} />
        </section>
      </PageTransition>
      <Footer />
    </main>
  );
}
