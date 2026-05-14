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
      shopifyVariantId: variant.shopifyVariantId,
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
    price: 17.95,
    subtitle: "First lather · scalp & detox",
    category: "shampoo",
    image: "/images/peppermint-shampoo-new.png",
    shopifyHandle: "peppermint-detox-shampoo",
    description:
      "There's a moment in every wash day that resets everything — the moment the lather hits your scalp and you feel the cool rush of peppermint. That's the first lather. Peppermint Detox Shampoo is built for that moment: a deep-clean first wash designed to strip away product build-up, mineral residue, and the weight of last week's routine without stripping your crown of the oils it needs.\n\nThree things happen at once when you massage this into a wet scalp. Mentha piperita (peppermint) oil tingles into the follicle and stimulates blood flow — that's the sensation you feel, and it's also what supports growth at the root. Tea tree oil clarifies, breaking down flakes, dandruff residue, and the silicone halo that other styling products leave behind. Argan oil and aloe vera oil follow underneath, restoring the moisture barrier so your scalp doesn't feel tight or chalky after rinsing. This is a true first lather — meant to be followed by Intense Hydration Shampoo on the same wash day, or by Moisture Rich Conditioner if you're double-cleansing.\n\nFor every textured crown that has felt that mid-week heaviness — the scalp itch, the dullness, the sense that nothing is sinking in anymore — this is the reset. Use it once a week (or every other wash) for routine maintenance, or back-to-back with Intense Hydration when you're prepping for a silk press or a fresh install. Sulfate-free, paraben-free, silicone-free. Safe on color, safe on chemically treated hair, safe on locs. Treat your hair like the crown it is.",
    ingredients:
      "Water (Aqua), Mentha Piperita (Peppermint) Oil, Argan Oil, Aloe Vera Oil, Tea Tree Oil, Sodium Lauryl Sulfoacetate, Cocamidopropyl Betaine, Menthol.",
    howToUse:
      "Apply to wet hair and scalp. Massage vigorously to stimulate blood flow. Rinse thoroughly. Feel the magic tingle.",
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
    shopifyHandle: "intense-hydration-shampoo",
    description:
      "Some cleansers strip. Intense Hydration Shampoo doesn't. This is the second lather — the one that closes the cuticle while it cleans, the one that leaves your hair soft enough to detangle without a fight. Designed for the moment after the Peppermint Detox, or as a stand-alone gentle cleanse on the days you just need to reset without scrubbing.\n\nThe formula leads with our hero ingredient trio: argan oil for slip and shine, vitamin C for scalp wellness and brightness, and honey oil for the kind of deep moisture that textured hair actually holds onto. Cocamidopropyl betaine — a coconut-derived cleanser — does the lifting without sulfates, which means no squeak, no tightness, no stripped feeling. The water beads down your strands instead of catching, and that's where detangling gets easy. Run your fingers through while the lather sits, and feel the difference.\n\nIntense Hydration is the everyday wash for textured crowns that need both moisture and movement. Curly, coily, locked, color-treated, transitioning, relaxed — this is the one shampoo on the shelf that handles all of those without picking favorites. Pair it with Moisture Rich Conditioner for the full moisture system, or with the 3-In-1 Leave In Treatment if you're heading into a wash-and-go. Sulfate-free, paraben-free, silicone-free. Crowned in Magic.",
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
    shopifyHandle: "moisture-rich-conditioner",
    description:
      "If your textured hair has ever felt like a desert by the time the conditioner came off, this one's different. Moisture Rich Conditioner is the second-step ritual that closes the cuticle, restores the lipid layer, and locks in the moisture you just earned in the shampoo step. Use it with a plastic cap or a hooded steamer for the kind of softness that makes a wide-tooth comb glide instead of fight.\n\nThe magic is in the layering. Cetyl alcohol and stearyl alcohol — the good kind of fatty alcohols, the ones that smooth instead of dry — form the conditioning base. Argan oil, vitamin C, and honey oil layer on top, sealing in moisture while smoothing the cuticle from root to tip. Behentrimonium chloride does the detangling lift, so when you reach for your wide-tooth comb the knots release instead of break. The result is hair that feels like silk under your hands and stays that way through the rest of your routine.\n\nFor 3a curls all the way through 4c coils, Moisture Rich Conditioner is the soft-hands moment in wash day. Use it weekly after Intense Hydration Shampoo. Use it bi-weekly as a co-wash on days you skip the lather. Use it as the final rinse before a twist-out, a braid-out, or a silk press for the kind of finish a stylist would charge you for. Sulfate-free, paraben-free, color-safe. Built for the crown.",
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
    shopifyHandle: "3-in-1-leave-in-treatment",
    description:
      "One bottle. Three jobs. The 3-In-1 Leave In Treatment is the multitasker every textured routine has been missing — a leave-in conditioner that detangles, a strengthening treatment that protects, and a styling primer that prepares your hair for whatever look you're going for next. Infused with our hero trio: argan oil, vitamin C, and honey oil.\n\nWhat it does, in order of priority. First, it detangles. Damp hair drinks this in within 15 seconds of application, and the slip is real — fingers glide, knots release, and your wide-tooth comb does its job without snagging. Second, it strengthens. Vitamin C reinforces the inner cortex of the hair shaft against breakage; honey oil's natural humectant pull holds moisture in even on the driest day. Third, it primes. Whether you're going into a twist-out, a wash-and-go, a braid-out, or a heat style, the 3-In-1 lays the foundation for definition without weighing your curls down or leaving a residue.\n\nFor 3a curls to 4c coils, this is the must-have leave-in. It's the bottle you reach for between full wash days when your hair just needs a moisture top-up. It's also the prep step before the Curl Forming Custard, the Setting Mousse, or the Strengthening Serum. Stylists trust it as a daily refresh. Mothers love it for their daughters. The crown deserves the multitasker.",
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
    shopifyHandle: "control-foam-wrap-lotion-setting-mousse",
    description:
      "There's a reason your grandmother wrapped her hair every night. The right setting product gives you the kind of soft, polished, lasting set that no flat iron alone can deliver — the kind that holds through the work week and reactivates with a sprinkle of water on day five. Control Foam Wrap Lotion & Setting Mousse is the modern, lightweight take on that classic salon-grade ritual.\n\nThe foam dispenses light, not heavy. Massage it into damp hair and feel the difference — there's give in the cushion, no crunch, no flake, and the smell doesn't punch you in the face. Polyquaternium-11 gives the hold; argan oil and honey extract give the shine and the suppleness. As your hair dries, the cuticle locks down smooth and the volume settles into the shape you wrapped, rolled, or pinned. By the time you take the wrap off, the curl pattern is set, the frizz is muted, and the cuticle reflects light the way it does in a real salon mirror.\n\nUse Control Foam for two-strand twists, perm rod sets, roller sets, doobie wraps, or any soft styling that needs hold without the helmet feeling. Pair with the 3-In-1 Leave In as your moisture base, then finish with the Strengthening Serum for the kind of finish a stylist charges $80 for. 7.44 oz of professional-grade control. Crowned in Magic.",
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
    shopifyHandle: "honey-argan-curl-forming-custard",
    description:
      "If you have ever stood in front of a mirror at hour six watching your wash-and-go fall flat, you already know the brief: a curl definer that holds without flaking, sets without sticking, and refreshes on day three without turning into a crunchy memory. Honey & Argan Curl Forming Custard is the answer. A non-sticky, non-flaking, non-stiff custard that builds clump definition curl by curl and holds it.\n\nWhat makes it different is the layered moisture. Glycerin pulls humidity in from the air; argan oil and honey extract seal it; vitamin C reinforces. Pectin and aloe vera give the custard body — it's spreadable like a cream, never gummy, never thick the way a gel pretends to be. Marshmallow root extract adds the kind of silky slip that lets you smooth without disrupting the clump. By the time it dries, your curls have shape memory: they hold the pattern you defined, and they bounce back the next day when you refresh with the 3-In-1.\n\nMade for two-strand twists, twist-outs, braid-outs, finger coils, and wash-and-gos on 3a through 4c. This is the styler that lets you skip the gel cast altogether. It will not flake, will not feel sticky on your hands, will not turn white as it dries. 8.45 oz of definition without the crunch. Crowned in Magic.",
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
    shopifyHandle: "honey-argan-daily-moisturizing-cream",
    description:
      "Textured hair needs moisture every day — not just on wash day, but in the in-between mornings, the mid-week refreshes, and the bedtime tuck-ins. Honey & Argan Daily Moisturizing Cream is the leave-on you reach for on autopilot: a lightweight, daily-use hydrator that softens dry strands, smooths frizz, and adds the natural shine that makes a low bun, a wash-and-go, or a casual updo look intentional.\n\nThe formula leads with shea butter — the unrefined kind, not the watered-down imitation — for deep, lasting moisture. Argan oil and coconut oil layer on top for slip and shine; vitamin C brightens the cuticle so light reflects clean instead of dull. Honey extract holds humidity in even when the air doesn't, which means your hair doesn't crisp up by 2 PM. Vegetable glycerin balances the moisture pull so you get hydration without heaviness — your roots stay lifted, your ends stay soft, and the cream absorbs in seconds.\n\nFor every textured style — twists, locs, braids, blowouts, silk presses, wash-and-gos — this is the daily moisturizer. Apply a dime-sized amount to dry hair in the morning. Apply a slightly larger amount to the ends before bed. Mothers love it for daughters; daughters love it for themselves. 8.45 oz of the kind of natural-styles moisture that lasts. Crowned in Magic.",
    ingredients:
      "Water (Aqua), Butyrospermum Parkii (Shea) Butter, Argan Oil, Vitamin C, Honey Oil, Coconut Oil, Cetearyl Alcohol, Polysorbate 60, Vegetable Glycerin.",
    howToUse:
      "Apply a small amount to hands and work through dry or damp hair daily. Focus on ends and dry areas of the scalp.",
  },
  {
    id: "strengthening-serum",
    name: "Honey & Argan Strengthening Serum",
    price: 24.95,
    subtitle: "4.05 oz · Heat protectant",
    category: "treatments",
    image: "/images/honey-argan-strengthening-serum.png",
    shopifyHandle: "honey-argan-strengthening-serum",
    description:
      "Every textured hair routine deserves a finishing oil that does more than shine. Honey & Argan Strengthening Serum is the lightweight, fast-absorbing heat protectant that delivers instant gloss while building strand strength from the cuticle in — the bottle stylists reach for before a silk press, the one you reach for after a wash-and-go, and the one you keep on the dresser for a daily bedtime ritual.\n\nThe science is in the silicone-light, oil-heavy ratio. Cyclopentasiloxane gives the slip and the heat-protection layer up to 450°F — that's flat-iron range, blow-dryer range, hot-comb range. Argan oil and honey oil underneath are the real workers: argan reinforces the cortex while honey oil locks moisture into the cuticle so heat doesn't dehydrate. Vitamin C and Vitamin E (tocopheryl acetate) round it out with antioxidant repair on free-radical damage from styling and the sun. The result is the kind of mirror finish that no other oil delivers — and it lasts past day three.\n\nA few drops cover an entire head. Use it before any heat styling. Use it as a finishing oil on a finished twist-out for the kind of light bounce that catches a room. Use it on your ends before bed to stop the splits before they start. Pair with the Moisturizing Cream for daily moisture, or with the Control Foam for setting work. 4.05 oz of the bottle that will outlast every other oil in your routine. Crowned in Magic.",
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
    shopifyHandle: "the-magic-coils-2-strand-twist",
    description:
      "Everything you need for the perfect two-strand twist — bundled at $25.80 off retail. The Two Strand Twist Bundle is the wash day in a box: the leave-in that detangles, the custard that defines, the foam that holds, and the serum that shines. Crowned in Magic, end to end.\n\nThis is the system every textured haircare brand swears at and every stylist wishes existed in one purchase. Four professional-grade products, sized for at-home use, designed to layer in the exact order a salon would. Apply the 3-In-1 Leave In Treatment to damp, detangled hair for moisture and slip. Smooth the Curl Forming Custard through each section to define the twist without flaking or sticking. Set with the Control Foam Wrap Lotion & Setting Mousse for the soft, polished hold that lasts through the work week. Finish with a few drops of the Honey & Argan Strengthening Serum for the gloss layer and the heat protection if you're stretching the style with a hooded dryer.\n\nThe Two Strand Twist Bundle works for 3a curls through 4c coils, locs, braids, and any twist-style finish. It's also the bundle to gift to the natural in your life who's just starting to take their wash day seriously. Includes all four products in retail (8.45 oz / 7.44 oz / 4.05 oz) sizes — a $75.80 retail value for $50. Free shipping on orders over $75 (this bundle hits the threshold with one extra product). Crowned in Magic.",
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
    shopifyHandle: "the-magic-press",
    description:
      "The full professional silk press system in one purchase — at a $44.77 savings over buying the products separately. The Magic Press is the bundle stylists trust for the kind of silk press that lasts through humidity, sweat, and a week of wear. Five professional-size products (33.8 oz pros + the 4.05 oz Strengthening Serum), built to be used together in the exact order a salon uses them.\n\nThe ritual is a four-step pro silk press. Step one: Peppermint Detox Shampoo (33.8 oz) — first lather to clarify, strip product build-up, and prep the cuticle. Step two: Intense Hydration Shampoo (33.8 oz) — second lather to restore moisture without weighing down the strand. Step three: Moisture Rich Conditioner (33.8 oz) under a plastic cap or steamer for 10–15 minutes for the cuticle close. Step four: 3-In-1 Leave In Treatment (33.8 oz) on damp hair before the blow-dry. Finish with the Honey & Argan Strengthening Serum (4.05 oz) before the flat iron — it's the heat protection up to 450°F that lets you press without the dry, brittle finish other systems leave.\n\nThe Magic Press is built for stylists, salon owners, and serious at-home naturals who do their own silk presses every 3–4 weeks. The professional sizes mean fewer reorders, lower cost-per-press, and a routine that holds up across multiple client heads or family wash days. $100 for a $144.77 retail value — Crowned in Magic professional, in your shower.",
    ingredients: "See individual products for full ingredient lists.",
    howToUse: "Start with the Peppermint Detox Shampoo to clarify, follow with Intense Hydration Shampoo and Moisture Rich Conditioner. Apply the Leave In Treatment before blow-drying, and use the Strengthening Serum before flat ironing.",
  }
];
