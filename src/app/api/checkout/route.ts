// POST /api/checkout
// Receives the cart lines from the browser, asks Shopify to create a cart,
// and returns the hosted checkout URL to redirect the shopper to.
//
// The Storefront API token stays on the server (via src/lib/shopify.ts).

import { NextResponse } from "next/server";
import {
  createCheckoutUrl,
  ShopifyCheckoutError,
  type CheckoutLineInput,
} from "@/lib/shopify";

export const runtime = "nodejs";

type RequestBody = {
  lines: CheckoutLineInput[];
  /** Optional Shopify discount codes (e.g. MAGICTEN) applied at cart create for hosted checkout. */
  discountCodes?: string[];
};

export async function POST(req: Request) {
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty." },
      { status: 400 }
    );
  }

  if (body.lines.length > 25) {
    return NextResponse.json(
      { error: "Your cart has too many separate items." },
      { status: 400 }
    );
  }

  try {
    const checkoutUrl = await createCheckoutUrl(
      body.lines,
      body.discountCodes
    );
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    if (err instanceof ShopifyCheckoutError) {
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status: err.status }
      );
    }
    console.error("Shopify checkout failed", err);
    return NextResponse.json(
      { error: "We could not start checkout. Please try again in a moment." },
      { status: 500 }
    );
  }
}
