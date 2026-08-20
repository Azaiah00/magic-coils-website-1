import type { CartItem } from "@/context/CartContext";

/**
 * Optional sellable sizes for one PDP. Each variant gets its own cart line id
 * so two sizes of the same product do not merge incorrectly.
 */
export type ProductVariant = {
  id: string;
  sizeLabel: string;
  price: number;
  /** If set, checkout sends this Storefront GID as merchandiseId (skips fuzzy matching). */
  shopifyVariantId?: string;
};

export type Product = {
  id: string;
  name: string;
  /** Lowest SKU price — used for sorting and as a fallback when no variants exist. */
  price: number;
  subtitle: string;
  category: "shampoo" | "styling" | "treatments" | "bundles";
  /** Legacy bottle / packshot — shown in the PDP carousel after the hero image. */
  image: string;
  /** Lifestyle hero used on shop grids; falls back to `image` when omitted. */
  listingImage?: string;
  description: string;
  ingredients: string;
  howToUse: string;
  variants?: ProductVariant[];
  /**
   * Shopify product handle (auto-generated from the product title in Shopify admin,
   * e.g. "Peppermint Detox Shampoo" -> "peppermint-detox-shampoo"). Used by the
   * Storefront API to create a real cart at checkout. Update each product's handle
   * in Shopify -> Products -> product page -> "Edit website SEO" if needed.
   */
  shopifyHandle?: string;
};

/** Shop cards and cart thumbnails — prefers the new lifestyle hero when set. */
export function getProductListingImage(product: Product): string {
  return product.listingImage ?? product.image;
}

/** PDP carousel: hero first, then the original product photo (deduped). */
export function getProductGalleryImages(product: Pick<Product, "image" | "listingImage">): string[] {
  const hero = product.listingImage ?? product.image;
  return [...new Set([hero, product.image].filter(Boolean))];
}

/**
 * Price string for cards and shop grid: one price, or a range when sizes differ.
 */
export function formatListingPrice(product: Product): string {
  if (!product.variants?.length) {
    return `$${product.price.toFixed(2)}`;
  }
  const prices = product.variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) {
    return `$${min.toFixed(2)}`;
  }
  return `$${min.toFixed(2)} – $${max.toFixed(2)}`;
}

/**
 * Builds the object the cart expects. Quick-add uses the first variant (smallest listing order in our data).
 */
export function productToCartLine(
  product: Product,
  quantity: number,
  variantIndex = 0
): CartItem {
  const variant = product.variants?.[variantIndex];
  // shopifyHandle + sizeLabel travel with the line so /api/checkout can look up
  // the correct Shopify variant ID when the shopper starts checkout.
  if (variant) {
    return {
      id: variant.id,
      name: `${product.name} (${variant.sizeLabel})`,
      price: variant.price,
      quantity,
      image: getProductListingImage(product),
      shopifyHandle: product.shopifyHandle,
      sizeLabel: variant.sizeLabel,
      shopifyVariantId: variant.shopifyVariantId,
    };
  }
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity,
    image: getProductListingImage(product),
    shopifyHandle: product.shopifyHandle,
  };
}

/**
 * Store order is intentional: shop grid and home "Iconic Essentials" (first four) follow this array order.
 *
 * Product images use explicit filenames so PDPs never share the same file by mistake (e.g. peppermint vs custard).
 */
export const products: Product[] = [
  {
    id: "peppermint-shampoo",
    name: "Peppermint Detox Shampoo",
    price: 17.95,
    subtitle: "First lather · scalp & detox",
    category: "shampoo",
    image: "/images/peppermint-shampoo-new.png",
    listingImage: "/images/hero/peppermint-shampoo.png",
    shopifyHandle: "peppermint-detox-shampoo",
    description:
      "Start wash day with a fresh first lather. Peppermint Detox Shampoo is a clarifying cleanser for days when styling products and routine buildup leave hair ready for a reset. Peppermint oil and menthol create the formula's signature cooling sensation, while the cleanser works through wet hair and scalp.\n\nUse it as the cleansing step before Intense Hydration Shampoo and Moisture Rich Conditioner, or follow the routine recommended by your stylist. Because peppermint and menthol can feel intense on sensitive skin, review the complete ingredient list and patch test before full use. Crowned in Magic.",
    ingredients:
      "Water (Aqua), Mentha Piperita (Peppermint) Oil, Argan Oil, Aloe Vera Oil, Tea Tree Oil, Sodium Lauryl Sulfoacetate, Cocamidopropyl Betaine, Menthol.",
    howToUse:
      "Apply to wet hair and scalp. Massage gently into a lather, avoiding the eyes. Rinse thoroughly and follow with the next step in your wash-day routine.",
    variants: [
      { id: "peppermint-shampoo-845", sizeLabel: "8.45 oz", price: 17.95 },
      { id: "peppermint-shampoo-338", sizeLabel: "32 oz", price: 33.95 },
    ],
  },
  {
    id: "hydration-shampoo",
    name: "Intense Hydration Shampoo",
    price: 15.95,
    subtitle: "Moisture-rich cleanse",
    category: "shampoo",
    image: "/images/hydration-shampoo.png",
    listingImage: "/images/hero/hydration-shampoo.png",
    shopifyHandle: "intense-hydration-shampoo",
    description:
      "Intense Hydration Shampoo is the moisture-focused cleansing step in the Magic Coils wash-day routine. Use it after Peppermint Detox Shampoo for a two-cleanser routine or on its own when a clarifying first wash is not part of your plan.\n\nThe formula combines cleansing ingredients with argan oil, vitamin C, and honey oil. Work it through wet hair, rinse thoroughly, and follow with Moisture Rich Conditioner. Review the complete ingredient list before use and ask your stylist how often to cleanse based on your hair, scalp, color, or chemical services. Crowned in Magic.",
    ingredients:
      "Water (Aqua), Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Argan Oil, Vitamin C, Honey Oil, Glycol Distearate, Polyquaternium-10, Citric Acid.",
    howToUse:
      "Apply to wet hair, massage into a rich lather. Rinse thoroughly. For best results, follow with Moisture Rich Conditioner.",
    variants: [
      { id: "hydration-shampoo-845", sizeLabel: "8.45 oz", price: 15.95 },
      { id: "hydration-shampoo-338", sizeLabel: "32 oz", price: 26.95 },
    ],
  },
  {
    id: "moisture-conditioner",
    name: "Moisture Rich Conditioner",
    price: 16.97,
    subtitle: "Softness & natural shine",
    category: "shampoo",
    image: "/images/moisture-conditioner.png",
    listingImage: "/images/hero/moisture-conditioner.png",
    shopifyHandle: "moisture-rich-conditioner",
    description:
      "Moisture Rich Conditioner is the rinse-out conditioning step for Magic Coils wash-day routines. Apply it after shampooing to help add slip and make section-by-section detangling easier before styling.\n\nThe conditioning base includes cetyl alcohol, stearyl alcohol, cetrimonium chloride, and behentrimonium chloride, with argan oil, vitamin C, honey oil, and dimethicone also listed in the formula. Distribute from mid-lengths to ends, allow it to sit as directed, then rinse thoroughly. Review the complete ingredient list if you avoid specific conditioning agents or silicones. Built for the crown.",
    ingredients:
      "Water (Aqua), Cetyl Alcohol, Stearyl Alcohol, Argan Oil, Vitamin C, Honey Oil, Cetrimonium Chloride, Behentrimonium Chloride, Dimethicone, Fragrance.",
    howToUse:
      "After shampooing, apply from mid-lengths to ends. Leave on for 3-5 minutes. Rinse thoroughly with cool water to seal the cuticle.",
    variants: [
      { id: "moisture-conditioner-845", sizeLabel: "8.45 oz", price: 16.97 },
      { id: "moisture-conditioner-338", sizeLabel: "32 oz", price: 31.95 },
    ],
  },
  {
    id: "leave-in-treatment",
    name: "3-In-1 Leave In Treatment",
    price: 16.95,
    subtitle: "Argan oil + vitamin C + honey oil",
    category: "treatments",
    image: "/images/leave-in-pro.png",
    listingImage: "/images/hero/leave-in-treatment.png",
    shopifyHandle: "3-in-1-leave-in-treatment",
    description:
      "One bottle, three places in the routine: leave-in conditioning, detangling support, and styling prep. Apply the 3-In-1 Leave In Treatment to clean, damp hair before twists, coils, braid-outs, wash-and-gos, or other styling steps.\n\nThe formula lists argan oil, vitamin C, honey oil, conditioning agents, and panthenol. Distribute evenly in sections and do not rinse. Follow with Curl Forming Custard or Control Foam when you want an additional styling step, then use the Strengthening Serum as a finish. The crown deserves a clear routine.",
    ingredients:
      "Water (Aqua), Cetearyl Alcohol, Argania Spinosa (Argan) Kernel Oil, Ascorbic Acid (Vitamin C), Honey Oil, Behentrimonium Methosulfate, Quaternium-91, Panthenol, Phenoxyethanol.",
    howToUse:
      "Apply to clean, damp hair. Distribute evenly from roots to ends. Do not rinse. Style as usual.",
    variants: [
      { id: "leave-in-treatment-845", sizeLabel: "8.45 oz", price: 16.95 },
      { id: "leave-in-treatment-338", sizeLabel: "33 oz", price: 33.95 },
    ],
  },
  {
    id: "control-foam",
    name: "Control Foam Wrap Lotion & Setting Mousse",
    price: 16.95,
    subtitle: "7.44 oz · Soft set control",
    category: "styling",
    image: "/images/control-foam-pro.png",
    listingImage: "/images/hero/control-foam.png",
    shopifyHandle: "control-foam-wrap-lotion-setting-mousse",
    description:
      "Control Foam Wrap Lotion & Setting Mousse is the setting step for wraps, twists, roller sets, perm rods, and other styles formed on damp hair. The foam format helps distribute product through sections before molding, wrapping, or setting.\n\nApply it after the 3-In-1 Leave In Treatment when using both products, comb through for even coverage, and dry the style completely before taking it down. The formula lists polyquaternium-11, argan oil, vitamin C, honey extract, and fragrance. Crowned in Magic.",
    ingredients:
      "Water (Aqua), Polyquaternium-11, Cocamidopropyl Betaine, Argania Spinosa (Argan) Kernel Oil, Ascorbic Acid (Vitamin C), Honey Extract, PEG-40 Hydrogenated Castor Oil, Fragrance (Parfum).",
    howToUse:
      "Apply generously to damp hair. Comb through for even distribution. Mold, wrap, or set as desired. Sit under a warm dryer until completely dry.",
  },
  {
    id: "curl-custard",
    name: "Honey & Argan Curl Forming Custard",
    price: 16.95,
    subtitle: "Definition without stickiness",
    category: "styling",
    image: "/images/honey-argan-curl-forming-custard.png",
    listingImage: "/images/hero/curl-custard.png",
    shopifyHandle: "honey-argan-curl-forming-custard",
    description:
      "Honey & Argan Curl Forming Custard is a styling cream for two-strand twists, twist-outs, braid-outs, finger coils, and wash-and-go routines. Smooth it through damp, sectioned hair and form the style with your fingers, a comb, or your preferred tool.\n\nThe formula lists glycerin, argan oil, vitamin C, honey oil, pectin, marshmallow root extract, aloe, and agave. Product amount and drying method can change the finish, so begin with a small amount and add more as needed. Allow the style to dry completely before separating or fluffing. Crowned in Magic.",
    ingredients:
      "Water (Aqua), Glycerin, Argan Oil, Vitamin C, Honey Oil, Pectin, Althaea Officinalis (Marshmallow) Root Extract, Aloe Barbadensis Leaf Juice, Agave Americana Leaf Extract.",
    howToUse:
      "Apply to damp hair in sections. Use fingers to coil or twist. Allow to air dry or use a diffuser for more volume.",
  },
  {
    id: "moisturizing-cream",
    name: "Honey & Argan Daily Moisturizing Cream",
    price: 16.95,
    subtitle: "8.45 oz · Natural styles",
    category: "styling",
    image: "/images/moisturizing-cream.png",
    listingImage: "/images/hero/moisturizing-cream.png",
    shopifyHandle: "honey-argan-daily-moisturizing-cream",
    description:
      "Honey & Argan Daily Moisturizing Cream is a leave-on cream for refreshing dry-feeling sections and finishing textured styles between wash days. Warm a small amount between your hands, work it through dry or damp hair, and focus on the areas that need it most.\n\nThe formula lists shea butter, argan oil, coconut oil, vitamin C, honey oil, and vegetable glycerin. Start with a small amount—especially on fine hair, locs, or styles where buildup is a concern—and add more only as needed. Use it for twists, braids, coils, updos, and other natural-style routines. Crowned in Magic.",
    ingredients:
      "Water (Aqua), Butyrospermum Parkii (Shea) Butter, Argan Oil, Vitamin C, Honey Oil, Coconut Oil, Cetearyl Alcohol, Polysorbate 60, Vegetable Glycerin.",
    howToUse:
      "Apply a small amount to hands and work through dry or damp hair daily. Focus on ends and dry areas of the scalp.",
  },
  {
    id: "strengthening-serum",
    name: "Honey & Argan Strengthening Serum",
    price: 24.95,
    subtitle: "4.05 oz · Pre-styling & finishing serum",
    category: "treatments",
    image: "/images/honey-argan-strengthening-serum.png",
    listingImage: "/images/hero/strengthening-serum.png",
    shopifyHandle: "honey-argan-strengthening-serum",
    description:
      "Honey & Argan Strengthening Serum is the pre-styling and finishing step in the Magic Coils routine. Smooth a small amount through damp or dry hair before styling, or use a few drops at the end of a twist-out, wrap, or silk press routine for added shine and a polished finish.\n\nThe formula lists cyclopentasiloxane, dimethiconol, argan oil, vitamin C, honey oil, vitamin E, and fragrance. Because heat tools and hair needs vary, follow your tool manufacturer's temperature guidance and ask your stylist which heat setting is appropriate for your hair. Crowned in Magic.",
    ingredients:
      "Cyclopentasiloxane, Dimethiconol, Argania Spinosa (Argan) Kernel Oil, Ascorbic Acid (Vitamin C), Honey Oil, Tocopheryl Acetate (Vitamin E), Fragrance.",
    howToUse:
      "Apply a small amount to damp or dry hair before using heat tools. Can also be used as a finishing touch for extra shine and frizz control.",
  },
  {
    id: "bundle-2-strand-twist",
    name: "The Magic Coils 2 Strand Twist",
    price: 50.00,
    subtitle: "Complete set for perfect twists",
    category: "bundles",
    image: "/images/bundle-2-strand-twist-new.png",
    listingImage: "/images/hero/bundle-2-strand-twist.png",
    shopifyHandle: "the-magic-coils-2-strand-twist",
    description:
      "Build a twist routine with four coordinated styling steps in one set. The 2 Strand Twist Bundle includes the 3-In-1 Leave In Treatment, Honey & Argan Curl Forming Custard, Control Foam Wrap Lotion & Setting Mousse, and Honey & Argan Strengthening Serum.\n\nStart with the leave-in on clean, damp, detangled hair. Work in sections and choose the custard, foam, or a small amount of both based on the finish you want. Form each twist, allow the style to dry completely, and finish with a small amount of serum before separating. See the displayed bundle contents, sizes, and current pricing before ordering. Crowned in Magic.",
    ingredients: "See individual products for full ingredient lists.",
    howToUse: "Layer the Leave In Treatment, followed by the Curl Forming Custard or Control Foam. Finish with the Strengthening Serum for brilliant shine.",
  },
  {
    id: "bundle-magic-press",
    name: "The Magic Press",
    price: 100.00,
    subtitle: "The ultimate silk press system",
    category: "bundles",
    image: "/images/bundle-magic-press-new.png",
    listingImage: "/images/hero/bundle-magic-press.png",
    shopifyHandle: "the-magic-press",
    description:
      "The Magic Press brings the Magic Coils silk press routine into one five-product set: Peppermint Detox Shampoo, Intense Hydration Shampoo, Moisture Rich Conditioner, 3-In-1 Leave In Treatment, and Honey & Argan Strengthening Serum.\n\nBegin with the cleanser that fits your wash-day plan, condition and detangle thoroughly, then apply the leave-in before drying. Use a small amount of serum as the pre-styling or finishing step. Heat technique, tool temperature, and results vary by hair and service history, so follow your tool manufacturer's guidance or work with a licensed professional. See the displayed bundle contents, sizes, and current pricing before ordering. Crowned in Magic.",
    ingredients: "See individual products for full ingredient lists.",
    howToUse: "Start with the Peppermint Detox Shampoo to clarify, follow with Intense Hydration Shampoo and Moisture Rich Conditioner. Apply the Leave In Treatment before blow-drying, and use the Strengthening Serum before flat ironing.",
  }
];
