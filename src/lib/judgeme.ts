import type { Product } from "@/data/products";

export const JUDGEME_SHOP_DOMAIN = "magic-coils-professional-hair-products.myshopify.com";

// Judge.me's public token is safe to expose, but it still needs to be copied
// from the Shopify Judge.me app after install. Until the Netlify env var is
// set, widgets stay hidden so the live site never shows broken placeholders.
export const JUDGEME_PUBLIC_TOKEN = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN ?? "";

export const isJudgeMeEnabled = JUDGEME_PUBLIC_TOKEN.length > 0;

export function getJudgeMeProductId(product: Pick<Product, "id" | "shopifyHandle">) {
  // Judge.me looks up Shopify products by handle in this headless setup.
  // The route id is shorter for a few products, so prefer the explicit
  // Shopify handle from products.ts and fall back only if it is missing.
  return product.shopifyHandle ?? product.id;
}
