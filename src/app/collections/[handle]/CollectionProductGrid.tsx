"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  formatListingPrice,
  getProductListingImage,
  isProductAvailable,
  productToCartLine,
  type Product,
} from "@/data/products";
import { useAvailableProducts } from "@/hooks/useAvailableProducts";

export default function CollectionProductGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const liveProducts = useAvailableProducts(products);

  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {liveProducts.map((product) => {
        const available = isProductAvailable(product);

        return (
          <article key={product.id} className="group flex flex-col">
            <Link
              href={`/product/${product.id}`}
              className="relative mb-6 aspect-[4/5] overflow-hidden border border-primary/10 bg-surface"
            >
              <Image
                src={getProductListingImage(product)}
                alt={product.name}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </Link>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {product.subtitle}
            </p>
            <h2 className="mb-2 font-serif text-2xl leading-tight text-primary">
              <Link href={`/product/${product.id}`} className="transition-colors hover:text-accent">
                {product.name}
              </Link>
            </h2>
            <p className="mb-5 font-medium text-primary/75">{formatListingPrice(product)}</p>

            {!available ? (
              <Link
                href={`/product/${product.id}`}
                className="mt-auto border border-primary/20 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-primary/65"
              >
                View availability
              </Link>
            ) : product.variants?.length ? (
              <Link
                href={`/product/${product.id}`}
                className="mt-auto bg-primary px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent hover:text-primary"
              >
                Choose size
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => addItem(productToCartLine(product, 1))}
                className="mt-auto bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-accent hover:text-primary"
              >
                Add to cart
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}
