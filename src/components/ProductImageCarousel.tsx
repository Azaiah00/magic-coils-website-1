"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductGalleryImages } from "@/data/products";

type ProductImageCarouselProps = {
  productName: string;
  images: string[];
};

/**
 * PDP image gallery — lifestyle hero first, legacy bottle shots after.
 * Arrows only appear when there is more than one image to browse.
 */
export default function ProductImageCarousel({
  productName,
  images,
}: ProductImageCarouselProps) {
  const gallery = images.length > 0 ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiple = gallery.length > 1;
  const activeImage = gallery[activeIndex] ?? gallery[0];

  const goToPrevious = () => {
    setActiveIndex((index) => (index === 0 ? gallery.length - 1 : index - 1));
  };

  const goToNext = () => {
    setActiveIndex((index) => (index === gallery.length - 1 ? 0 : index + 1));
  };

  if (!activeImage) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[4/5] bg-surface flex items-center justify-center shadow-inner overflow-hidden">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${productName} — image ${activeIndex + 1} of ${gallery.length}`}
          fill
          className="object-contain object-center p-6 md:p-10 transition-opacity duration-300"
          priority={activeIndex === 0}
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous product image"
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 text-primary shadow-md flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next product image"
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 text-primary shadow-md flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {gallery.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View product image ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-primary/25 hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Convenience wrapper when you already have a product object. */
export function ProductImageCarouselFromProduct({
  product,
}: {
  product: { name: string; image: string; listingImage?: string };
}) {
  return (
    <ProductImageCarousel
      productName={product.name}
      images={getProductGalleryImages(product)}
    />
  );
}
