import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { formatListingPrice } from "@/data/products";

type BlogRelatedProductsProps = {
  productIds: string[];
};

/**
 * Renders the "Products from this routine" grid at the bottom of each article.
 * Product IDs come from the article frontmatter relatedProducts array.
 */
export default function BlogRelatedProducts({
  productIds,
}: BlogRelatedProductsProps) {
  const related = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-primary/10">
      <h2 className="font-serif text-3xl text-primary mb-8">
        Products from this routine
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product) => (
          <Link
            key={product!.id}
            href={`/product/${product!.id}`}
            className="group flex flex-col"
          >
            <div className="relative aspect-square bg-white mb-4 overflow-hidden shadow-sm">
              <Image
                src={product!.image}
                alt={product!.name}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="font-serif text-lg text-primary group-hover:text-accent transition-colors">
              {product!.name}
            </h3>
            <p className="text-sm text-primary/60 mt-1">
              {formatListingPrice(product!)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
