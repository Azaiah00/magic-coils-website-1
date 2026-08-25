import { products, type Product } from "@/data/products";

export type StoreCollection = {
  handle: string;
  title: string;
  eyebrow: string;
  description: string;
  productIds: string[];
};

export const storeCollections: StoreCollection[] = [
  {
    handle: "all-products",
    title: "All Magic Coils Products",
    eyebrow: "The complete collection",
    description:
      "Explore all Magic Coils cleansers, conditioners, moisturizers, stylers, treatments, and complete routine bundles.",
    productIds: products.map((product) => product.id),
  },
  {
    handle: "professional-magic-press",
    title: "Professional Magic Press",
    eyebrow: "Silk press routine",
    description:
      "Shop the complete Professional Magic Press bundle or build the five-step silk press routine one product at a time.",
    productIds: [
      "bundle-magic-press",
      "peppermint-shampoo",
      "hydration-shampoo",
      "moisture-conditioner",
      "leave-in-treatment",
      "strengthening-serum",
    ],
  },
  {
    handle: "2-strand-twist-collection",
    title: "2 Strand Twist Collection",
    eyebrow: "Twist and set routine",
    description:
      "Shop the complete twist bundle or select the leave-in, custard, foam, and serum individually for hydrated, defined twists and twist-outs.",
    productIds: [
      "bundle-2-strand-twist",
      "leave-in-treatment",
      "curl-custard",
      "control-foam",
      "strengthening-serum",
    ],
  },
  {
    handle: "magic-coils-curly-hair-collection",
    title: "Magic Coils Curly Hair Collection",
    eyebrow: "Hydrate and define",
    description:
      "Hydration, definition, and finishing essentials for curls, coils, twist-outs, wash-and-go styling, and textured-hair routines.",
    productIds: [
      "leave-in-treatment",
      "moisturizing-cream",
      "curl-custard",
      "moisture-conditioner",
      "hydration-shampoo",
      "strengthening-serum",
      "control-foam",
    ],
  },
  {
    handle: "loc-moisture-collection",
    title: "Loc Moisture Collection",
    eyebrow: "Cleanse, moisturize, set",
    description:
      "A focused selection for cleansing, conditioning, moisturizing, setting, and finishing loc services and at-home maintenance.",
    productIds: [
      "peppermint-shampoo",
      "hydration-shampoo",
      "moisture-conditioner",
      "leave-in-treatment",
      "control-foam",
      "strengthening-serum",
    ],
  },
  {
    handle: "shampoo-conditioners",
    title: "Shampoos & Conditioners",
    eyebrow: "Wash-day essentials",
    description:
      "Clarify, cleanse, condition, and prepare textured hair with the three foundational Magic Coils wash-day products.",
    productIds: [
      "peppermint-shampoo",
      "hydration-shampoo",
      "moisture-conditioner",
    ],
  },
  {
    handle: "styling-treatments",
    title: "Styling & Treatments",
    eyebrow: "Prepare, define, finish",
    description:
      "Leave-in moisture, curl definition, setting control, daily refreshing, and a polished serum finish for textured-hair styles.",
    productIds: [
      "leave-in-treatment",
      "curl-custard",
      "control-foam",
      "moisturizing-cream",
      "strengthening-serum",
    ],
  },
  {
    handle: "bundles",
    title: "Magic Coils Bundles",
    eyebrow: "Complete routines",
    description:
      "Choose a coordinated Magic Coils system for professional silk presses or hydrated, defined two-strand twists.",
    productIds: ["bundle-magic-press", "bundle-2-strand-twist"],
  },
];

export function getStoreCollection(handle: string): StoreCollection | undefined {
  return storeCollections.find((collection) => collection.handle === handle);
}

export function getCollectionProducts(collection: StoreCollection): Product[] {
  return collection.productIds.flatMap((id) => {
    const product = products.find((candidate) => candidate.id === id);
    return product ? [product] : [];
  });
}
