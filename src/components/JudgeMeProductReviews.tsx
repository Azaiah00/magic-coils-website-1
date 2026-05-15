"use client";

import { getJudgeMeProductId, isJudgeMeEnabled } from "@/lib/judgeme";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function JudgeMeProductReviews({ product }: Props) {
  if (!isJudgeMeEnabled) {
    return null;
  }

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="jdgm-widget jdgm-review-widget"
          data-id={getJudgeMeProductId(product)}
          data-product-title={product.name}
        />
      </div>
    </section>
  );
}
