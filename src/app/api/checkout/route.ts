// POST /api/checkout
// Receives the cart lines from the browser, asks Shopify to create a cart,
// and returns the hosted checkout URL to redirect the shopper to.
//
// The Storefront API token stays on the server (via src/lib/shopify.ts).

import { NextResponse } from "next/server";
import { createCheckoutUrl, type CheckoutLineInput } from "@/lib/shopify";

export const runtime = "nodejs";

type RequestBody = {
  lines: CheckoutLineInput[];
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

  try {
    const checkoutUrl = await createCheckoutUrl(body.lines);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
