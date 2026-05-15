"use client";

import { getJudgeMeProductId, isJudgeMeEnabled } from "@/lib/judgeme";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function JudgeMePreviewBadge({ product }: Props) {
  if (!isJudgeMeEnabled) {
    return null;
  }

  return (
    <div
      className="jdgm-widget jdgm-preview-badge mb-3 min-h-5"
      data-id={getJudgeMeProductId(product)}
      data-template="product"
      aria-label={`Google-style product review badge for ${product.name}`}
    />
  );
}
