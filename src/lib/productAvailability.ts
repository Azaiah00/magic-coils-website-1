import type { Product, ProductVariant } from "@/data/products";

export type StorefrontVariantAvailability = {
  id: string;
  title: string;
  sizeLabel: string | null;
  price: number;
  currencyCode: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
};

export type StorefrontProductAvailability = {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  variants: StorefrontVariantAvailability[];
};

export type AvailabilityMap = Record<string, StorefrontProductAvailability | null>;

function normalize(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function findStorefrontVariant(
  variant: ProductVariant,
  liveVariants: StorefrontVariantAvailability[]
): StorefrontVariantAvailability | undefined {
  if (variant.shopifyVariantId) {
    const byId = liveVariants.find((live) => live.id === variant.shopifyVariantId);
    if (byId) return byId;
  }

  const wanted = normalize(variant.sizeLabel);
  return liveVariants.find(
    (live) => normalize(live.sizeLabel) === wanted || normalize(live.title) === wanted
  );
}

/** Merge server-fetched Shopify inventory and prices into the local presentation data. */
export function applyStorefrontAvailability(
  product: Product,
  live: StorefrontProductAvailability | null | undefined
): Product {
  if (!live) return product;

  if (!product.variants?.length) {
    const onlyVariant = live.variants.length === 1 ? live.variants[0] : undefined;
    return {
      ...product,
      price: onlyVariant?.price ?? product.price,
      available: product.availabilityLocked ? product.available : live.availableForSale,
      shopifyHandle: live.handle,
    };
  }

  const variants = product.variants.map((variant) => {
    const liveVariant = findStorefrontVariant(variant, live.variants);
    if (!liveVariant) return variant;
    return {
      ...variant,
      price: liveVariant.price,
      available: liveVariant.availableForSale,
      shopifyVariantId: liveVariant.id,
    };
  });

  return {
    ...product,
    price: Math.min(...variants.map((variant) => variant.price)),
    available: product.availabilityLocked
      ? product.available
      : variants.some((variant) => variant.available !== false),
    shopifyHandle: live.handle,
    variants,
  };
}

export function applyAvailabilityMap(product: Product, map: AvailabilityMap): Product {
  if (!product.shopifyHandle) return product;
  return applyStorefrontAvailability(product, map[product.shopifyHandle]);
}
