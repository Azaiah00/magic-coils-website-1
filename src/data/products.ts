import type { CartItem } from "@/context/CartContext";

/**
 * Optional sellable sizes for one PDP. Each variant gets its own cart line id
 * so two sizes of the same product do not merge incorrectly.
 */
export type ProductVariant = {
  id: string;
  sizeLabel: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  /** Lowest SKU price — used for sorting and as a fallback when no variants exist. */
  price: number;
  subtitle: string;
  category: "shampoo" | "styling" | "treatments" | "bundles";
  image: string;
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
      image: product.image,
      shopifyHandle: product.shopifyHandle,
      sizeLabel: variant.sizeLabel,
    };
  }
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity,
    image: product.image,
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
    price: 10.95,
    subtitle: "First lather · scalp & detox",
    category: "shampoo",
    image: "/images/peppermint-shampoo-new.png",
    shopifyHandle: "peppermint-detox-shampoo",
    description:
      "Our Peppermint Detox Shampoo is a first lather shampoo that does three things at once:\n\n1. Exfoliate the scalp from unwanted dandruff or flakes.\n2. Clarify and detox the hair from unwanted minerals and product build-up.\n3. Promote growth.",
    ingredients:
      "Water (Aqua), Mentha Piperita (Peppermint) Oil, Argan Oil, Aloe Vera Oil, Tea Tree Oil, Sodium Lauryl Sulfoacetate, Cocamidopropyl Betaine, Menthol.",
    howToUse:
      "Apply to wet hair and scalp. Massage vigorously to stimulate blood flow. Rinse thoroughly. Feel the magic tingle.",
    variants: [
      { id: "peppermint-shampoo-845", sizeLabel: "8.45 oz", price: 10.95 },
      { id: "peppermint-shampoo-338", sizeLabel: "33.8 oz", price: 21.95 },
    ],
  },
  {
    id: "hydration-shampoo",
    name: "Intense Hydration Shampoo",
    price: 8.95,
    subtitle: "Moisture-rich cleanse",
    category: "shampoo",
    image: "/images/hydration-shampoo.png",
    shopifyHandle: "intense-hydration-shampoo",
    description:
      "Our Intense Hydration Shampoo instantly provides moisture to each hair strand while strengthening it and detangling the hair simultaneously.",
    ingredients:
      "Water (Aqua), Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Argan Oil, Vitamin C, Honey Oil, Glycol Distearate, Polyquaternium-10, Citric Acid.",
    howToUse:
      "Apply to wet hair, massage into a rich lather. Rinse thoroughly. For best results, follow with Moisture Rich Conditioner.",
    variants: [
      { id: "hydration-shampoo-845", sizeLabel: "8.45 oz", price: 8.95 },
      { id: "hydration-shampoo-338", sizeLabel: "33.8 oz", price: 18.95 },
    ],
  },
  {
    id: "moisture-conditioner",
    name: "Moisture Rich Conditioner",
    price: 9.95,
    subtitle: "Softness & natural shine",
    category: "shampoo",
    image: "/images/moisture-conditioner.png",
    shopifyHandle: "moisture-rich-conditioner",
    description:
      "The Magic Coils Moisture Rich Conditioner gives the hair softness and natural shine like no other conditioner on the market. Use with a plastic cap or steamer for amazing results.",
    ingredients:
      "Water (Aqua), Cetyl Alcohol, Stearyl Alcohol, Argan Oil, Vitamin C, Honey Oil, Cetrimonium Chloride, Behentrimonium Chloride, Dimethicone, Fragrance.",
    howToUse:
      "After shampooing, apply from mid-lengths to ends. Leave on for 3-5 minutes. Rinse thoroughly with cool water to seal the cuticle.",
    variants: [
      { id: "moisture-conditioner-845", sizeLabel: "8.45 oz", price: 9.95 },
      { id: "moisture-conditioner-338", sizeLabel: "33.8 oz", price: 19.95 },
    ],
  },
  {
    id: "leave-in-treatment",
    name: "3-In-1 Leave In Treatment",
    price: 11.95,
    subtitle: "Argan oil + vitamin C + honey oil",
    category: "treatments",
    image: "/images/leave-in-pro.png",
    shopifyHandle: "3-in-1-leave-in-treatment",
    description:
      "The Magic Coils 3-In-1 Leave In Treatment infuses argan oil, vitamin C, and honey oil to add strength, shine, and softness to the hair that lasts all day long.",
    ingredients:
      "Water (Aqua), Cetearyl Alcohol, Argania Spinosa (Argan) Kernel Oil, Ascorbic Acid (Vitamin C), Honey Oil, Behentrimonium Methosulfate, Quaternium-91, Panthenol, Phenoxyethanol.",
    howToUse:
      "Apply to clean, damp hair. Distribute evenly from roots to ends. Do not rinse. Style as usual.",
    variants: [
      { id: "leave-in-treatment-845", sizeLabel: "8.45 oz", price: 11.95 },
      { id: "leave-in-treatment-338", sizeLabel: "33.8 oz", price: 24.95 },
    ],
  },
  {
    id: "control-foam",
    name: "Control Foam Wrap Lotion & Setting Mousse",
    price: 9.95,
    subtitle: "7.44 oz · Soft set control",
    category: "styling",
    image: "/images/control-foam-pro.png",
    shopifyHandle: "control-foam-wrap-lotion-setting-mousse",
    description:
      "Our Magic Coils Control Foam Wrap Lotion gives you the control over your hair you want when creating a soft set.",
    ingredients:
      "Water (Aqua), Polyquaternium-11, Cocamidopropyl Betaine, Argania Spinosa (Argan) Kernel Oil, Ascorbic Acid (Vitamin C), Honey Extract, PEG-40 Hydrogenated Castor Oil, Fragrance (Parfum).",
    howToUse:
      "Apply generously to damp hair. Comb through for even distribution. Mold, wrap, or set as desired. Sit under a warm dryer until completely dry.",
  },
  {
    id: "curl-custard",
    name: "Honey & Argan Curl Forming Custard",
    price: 9.95,
    subtitle: "Definition without stickiness",
    category: "styling",
    image: "/images/honey-argan-curl-forming-custard.png",
    shopifyHandle: "honey-argan-curl-forming-custard",
    description:
      "Our Honey & Argan Curl Forming Custard is a non-sticky, non-flaking product that works wonders for two strand twists, twist-out styles, or looks where you want more curl definition.",
    ingredients:
      "Water (Aqua), Glycerin, Argan Oil, Vitamin C, Honey Oil, Pectin, Althaea Officinalis (Marshmallow) Root Extract, Aloe Barbadensis Leaf Juice, Agave Americana Leaf Extract.",
    howToUse:
      "Apply to damp hair in sections. Use fingers to coil or twist. Allow to air dry or use a diffuser for more volume.",
  },
  {
    id: "moisturizing-cream",
    name: "Honey & Argan Daily Moisturizing Cream",
    price: 9.95,
    subtitle: "8.45 oz · Natural styles",
    category: "styling",
    image: "/images/moisturizing-cream.png",
    shopifyHandle: "honey-argan-daily-moisturizing-cream",
    description:
      "Our Honey & Argan Daily Moisturizing Cream is the perfect natural hair moisturizer for all natural hair styles while providing a natural shine.",
    ingredients:
      "Water (Aqua), Butyrospermum Parkii (Shea) Butter, Argan Oil, Vitamin C, Honey Oil, Coconut Oil, Cetearyl Alcohol, Polysorbate 60, Vegetable Glycerin.",
    howToUse:
      "Apply a small amount to hands and work through dry or damp hair daily. Focus on ends and dry areas of the scalp.",
  },
  {
    id: "strengthening-serum",
    name: "Honey & Argan Strengthening Serum",
    price: 12.95,
    subtitle: "4.05 oz · Heat protectant",
    category: "treatments",
    image: "/images/honey-argan-strengthening-serum.png",
    shopifyHandle: "honey-argan-strengthening-serum",
    description:
      "Magic Coils Honey & Argan Strengthening Serum is a lightweight heat protectant that gives the hair instant shine and softness that lasts all day long.",
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
    image: "/images/bundle-2-strand-twist.png",
    shopifyHandle: "the-magic-coils-2-strand-twist",
    description:
      "Everything you need for the perfect 2 Strand Twist. This bundle includes:\n\n- 3-In-1 Leave In Treatment (8.45 oz)\n- Honey & Argan Curl Forming Custard (8.45 oz)\n- Control Foam Wrap Lotion & Setting Mousse (7.44 oz)\n- Honey & Argan Strengthening Serum (4.05 oz)",
    ingredients: "See individual products for full ingredient lists.",
    howToUse: "Layer the Leave In Treatment, followed by the Curl Forming Custard or Control Foam. Finish with the Strengthening Serum for brilliant shine.",
  },
  {
    id: "bundle-magic-press",
    name: "The Magic Press",
    price: 100.00,
    subtitle: "The ultimate silk press system",
    category: "bundles",
    image: "/images/bundle-magic-press.png",
    shopifyHandle: "the-magic-press",
    description:
      "The complete professional system for a flawless, long-lasting silk press. This bundle includes:\n\n- Peppermint Detox Shampoo (33.8 oz)\n- Intense Hydration Shampoo (33.8 oz)\n- Moisture Rich Conditioner (33.8 oz)\n- 3-In-1 Leave In Treatment (33.8 oz)\n- Honey & Argan Strengthening Serum (4.05 oz)",
    ingredients: "See individual products for full ingredient lists.",
    howToUse: "Start with the Peppermint Detox Shampoo to clarify, follow with Intense Hydration Shampoo and Moisture Rich Conditioner. Apply the Leave In Treatment before blow-drying, and use the Strengthening Serum before flat ironing.",
  }
];
