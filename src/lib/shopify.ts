// Shopify Storefront API client.
//
// Used on the SERVER only (API route) so the Storefront access token never
// ships to the browser. Environment variables come from .env.local.
//
// Required env:
//   SHOPIFY_STORE_DOMAIN         e.g. magic-coils-professional-hair-products.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN     Storefront API access token
//   SHOPIFY_API_VERSION          optional, defaults to the pinned version below

const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2026-07";

type Gql<T> = { data?: T; errors?: Array<{ message: string }> };

/** Shape of a single sellable line in a cart (what the user sees). */
export type CheckoutLineInput = {
  /** Shopify product handle, e.g. "peppermint-detox-shampoo". */
  handle: string;
  /** Optional size label, e.g. "8.45 oz", matches the variant option value. */
  sizeLabel?: string;
  /** Unit price from our cart line; matched to Storefront `variant.price.amount`. */
  unitPrice?: number;
  /**
   * Optional ProductVariant GID from Storefront (`gid://shopify/ProductVariant/...`).
   * Must belong to the product for `handle`; used verbatim as merchandiseId.
   */
  merchandiseId?: string;
  quantity: number;
};

export class ShopifyCheckoutError extends Error {
  constructor(
    message: string,
    public readonly code: "OUT_OF_STOCK" | "PRODUCT_UNAVAILABLE" | "INVALID_CART",
    public readonly status: number
  ) {
    super(message);
    this.name = "ShopifyCheckoutError";
  }
}

/** Low-level GraphQL fetch against Storefront API. Throws on network/GraphQL errors. */
async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_TOKEN env vars."
    );
  }

  // Shopify uses different headers for Private vs Public Storefront tokens.
  // Private tokens (from Headless channel) start with "shpat_" and expect
  // `Shopify-Storefront-Private-Token`. Public tokens use the legacy header.
  const isPrivate = token.startsWith("shpat_");
  const res = await fetch(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(isPrivate
          ? { "Shopify-Storefront-Private-Token": token }
          : { "X-Shopify-Storefront-Access-Token": token }),
      },
      body: JSON.stringify({ query, variables }),
      // Always get fresh prices/inventory; do not cache on server.
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify Storefront HTTP ${res.status}`);
  }
  const json = (await res.json()) as Gql<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify returned no data.");
  }
  return json.data;
}

type VariantNode = {
  id: string;
  title: string;
  selectedOptions: Array<{ name: string; value: string }>;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
};

type ProductByHandleResponse = {
  product: {
    id: string;
    handle: string;
    title: string;
    availableForSale: boolean;
    variants: { nodes: VariantNode[] };
  } | null;
};

/** Fetch a product (and its variants) by its Shopify handle. Returns null if missing. */
export async function getProductByHandle(handle: string) {
  const data = await storefront<ProductByHandleResponse>(
    `query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        availableForSale
        variants(first: 50) {
          nodes {
            id
            title
            selectedOptions { name value }
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }`,
    { handle }
  );
  return data.product;
}

export async function getProductAvailability(handle: string) {
  const product = await getProductByHandle(handle);
  if (!product) return null;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    availableForSale: product.availableForSale,
    variants: product.variants.nodes.map((variant) => ({
      id: variant.id,
      title: variant.title,
      sizeLabel:
        variant.selectedOptions.find((option) =>
          /size/i.test(option.name)
        )?.value ?? variant.selectedOptions[0]?.value ?? null,
      price: Number.parseFloat(variant.price.amount),
      currencyCode: variant.price.currencyCode,
      availableForSale: variant.availableForSale,
    })),
  };
}

/** Compare cart price to Shopify Money amount (Storefront returns decimal strings). */
function priceAmountMatchesVariant(amount: string, unitPrice: number): boolean {
  const n = Number.parseFloat(amount);
  if (Number.isNaN(n)) return false;
  return Math.abs(n - unitPrice) < 0.01;
}

/**
 * Pick a variant by size option or title (case-insensitive).
 */
function pickVariantByLabel(
  variants: VariantNode[],
  sizeLabel?: string
): VariantNode | null {
  if (!variants.length) return null;
  if (!sizeLabel) return variants.length === 1 ? variants[0] : null;
  const wanted = sizeLabel.trim().toLowerCase();
  const byOption = variants.find((v) =>
    v.selectedOptions.some((o) => o.value.trim().toLowerCase() === wanted)
  );
  if (byOption) return byOption;
  const byTitle = variants.find(
    (v) => v.title.trim().toLowerCase() === wanted
  );
  return byTitle ?? null;
}

/**
 * Resolve the Storefront `ProductVariant` GID to send as `merchandiseId`.
 * Prefers an explicit `merchandiseId` when it appears on this product's variants,
 * then matches `unitPrice` to `variant.price` from Shopify (same payload as `variant.id`),
 * then requires an exact label match. It never guesses among multiple sizes.
 */
function resolveVariant(
  variants: VariantNode[],
  line: CheckoutLineInput
): VariantNode | null {
  if (!variants.length) return null;

  if (line.merchandiseId) {
    const gid = line.merchandiseId.trim();
    const explicitVariant = variants.find((v) => v.id === gid);
    if (explicitVariant) return explicitVariant;
    throw new Error(
      `merchandiseId does not match any variant for handle "${line.handle}".`
    );
  }

  if (line.unitPrice != null) {
    const matches = variants.filter((v) =>
      priceAmountMatchesVariant(v.price.amount, line.unitPrice as number)
    );
    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      const byLabel = pickVariantByLabel(matches, line.sizeLabel);
      if (byLabel) return byLabel;
      throw new Error(
        `Multiple Shopify variants match unit price ${line.unitPrice} for "${line.handle}".`
      );
    }
  }

  return pickVariantByLabel(variants, line.sizeLabel);
}

type CartCreateResponse = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: Array<{ field: string[]; message: string }>;
  };
};

/**
 * Turn our internal lines (handle + size + qty) into a Shopify cart and
 * return the hosted checkout URL the browser should redirect to.
 * Optional discount codes (e.g. MAGICTEN) are applied via CartInput.discountCodes for headless checkout.
 */
export async function createCheckoutUrl(
  lines: CheckoutLineInput[],
  discountCodes?: string[]
): Promise<string> {
  // Resolve each handle -> variant ID in parallel.
  const resolved = await Promise.all(
    lines.map(async (line) => {
      if (!line.handle || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 20) {
        throw new ShopifyCheckoutError(
          "A cart item has an invalid quantity.",
          "INVALID_CART",
          400
        );
      }
      const product = await getProductByHandle(line.handle);
      if (!product) {
        throw new ShopifyCheckoutError(
          "One of these items is not available for online checkout yet.",
          "PRODUCT_UNAVAILABLE",
          409
        );
      }
      const variant = resolveVariant(product.variants.nodes, line);
      if (!variant) {
        throw new ShopifyCheckoutError(
          `Please choose an available size for ${product.title}.`,
          "PRODUCT_UNAVAILABLE",
          409
        );
      }
      if (!product.availableForSale || !variant.availableForSale) {
        throw new ShopifyCheckoutError(
          `${product.title}${line.sizeLabel ? ` (${line.sizeLabel})` : ""} is currently sold out. Remove it from your cart or choose another size.`,
          "OUT_OF_STOCK",
          409
        );
      }
      return { merchandiseId: variant.id, quantity: line.quantity };
    })
  );

  const codes = (discountCodes ?? [])
    .map((c) => c.trim())
    .filter(Boolean);

  const cartInput: { lines: typeof resolved; discountCodes?: string[] } = {
    lines: resolved,
  };
  if (codes.length > 0) {
    cartInput.discountCodes = codes;
  }

  const data = await storefront<CartCreateResponse>(
    `mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }`,
    { input: cartInput }
  );

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length || !cart) {
    throw new Error(
      userErrors.map((e) => e.message).join("; ") || "Cart create failed."
    );
  }
  return cart.checkoutUrl;
}
