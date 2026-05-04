// Shopify Storefront API client.
//
// Used on the SERVER only (API route) so the Storefront access token never
// ships to the browser. Environment variables come from .env.local.
//
// Required env:
//   SHOPIFY_STORE_DOMAIN         e.g. magic-coils-professional-hair-products.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN     Storefront API access token
//   SHOPIFY_API_VERSION          optional, defaults to the pinned version below

const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2025-01";

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
};

type ProductByHandleResponse = {
  product: {
    id: string;
    handle: string;
    title: string;
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
        variants(first: 50) {
          nodes {
            id
            title
            selectedOptions { name value }
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

/** Compare cart price to Shopify Money amount (Storefront returns decimal strings). */
function priceAmountMatchesVariant(amount: string, unitPrice: number): boolean {
  const n = Number.parseFloat(amount);
  if (Number.isNaN(n)) return false;
  return Math.abs(n - unitPrice) < 0.01;
}

/**
 * Pick variant by size option / title (case-insensitive). Last resort only;
 * our labels often differ from Shopify option text (e.g. "32 oz" vs "33.8 oz").
 */
function pickVariantIdByLabel(
  variants: VariantNode[],
  sizeLabel?: string
): string | null {
  if (!variants.length) return null;
  if (!sizeLabel) return variants[0].id;
  const wanted = sizeLabel.trim().toLowerCase();
  const byOption = variants.find((v) =>
    v.selectedOptions.some((o) => o.value.trim().toLowerCase() === wanted)
  );
  if (byOption) return byOption.id;
  const byTitle = variants.find(
    (v) => v.title.trim().toLowerCase() === wanted
  );
  return byTitle?.id ?? null;
}

/**
 * Resolve the Storefront `ProductVariant` GID to send as `merchandiseId`.
 * Prefers an explicit `merchandiseId` when it appears on this product's variants,
 * then matches `unitPrice` to `variant.price` from Shopify (same payload as `variant.id`),
 * then falls back to label matching / first variant.
 */
function resolveVariantMerchandiseId(
  variants: VariantNode[],
  line: CheckoutLineInput
): string | null {
  if (!variants.length) return null;

  if (line.merchandiseId) {
    const gid = line.merchandiseId.trim();
    if (variants.some((v) => v.id === gid)) {
      return gid;
    }
    throw new Error(
      `merchandiseId does not match any variant for handle "${line.handle}".`
    );
  }

  if (line.unitPrice != null) {
    const matches = variants.filter((v) =>
      priceAmountMatchesVariant(v.price.amount, line.unitPrice as number)
    );
    if (matches.length === 1) {
      return matches[0].id;
    }
    if (matches.length > 1) {
      const byLabel = pickVariantIdByLabel(matches, line.sizeLabel);
      if (byLabel) return byLabel;
      throw new Error(
        `Multiple Shopify variants match unit price ${line.unitPrice} for "${line.handle}".`
      );
    }
  }

  return (
    pickVariantIdByLabel(variants, line.sizeLabel) ?? variants[0]?.id ?? null
  );
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
 */
export async function createCheckoutUrl(
  lines: CheckoutLineInput[]
): Promise<string> {
  // Resolve each handle -> variant ID in parallel.
  const resolved = await Promise.all(
    lines.map(async (line) => {
      const product = await getProductByHandle(line.handle);
      if (!product) {
        throw new Error(`Shopify product not found for handle "${line.handle}"`);
      }
      const variantId = resolveVariantMerchandiseId(product.variants.nodes, line);
      if (!variantId) {
        throw new Error(`No variant found for "${line.handle}"`);
      }
      return { merchandiseId: variantId, quantity: Math.max(1, line.quantity) };
    })
  );

  const data = await storefront<CartCreateResponse>(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }`,
    { lines: resolved }
  );

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length || !cart) {
    throw new Error(
      userErrors.map((e) => e.message).join("; ") || "Cart create failed."
    );
  }
  return cart.checkoutUrl;
}
