import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getProductAvailability } from "@/lib/shopify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const handles = [
    ...new Set(
      products
        .filter((product) => !product.availabilityLocked)
        .map((product) => product.shopifyHandle)
        .filter((handle): handle is string => Boolean(handle))
    ),
  ];

  const entries = await Promise.all(
    handles.map(async (handle) => {
      try {
        return [handle, await getProductAvailability(handle)] as const;
      } catch (error) {
        console.error(
          `Shopify availability lookup failed for ${handle}:`,
          error instanceof Error ? error.message : "Unknown error"
        );
        return [handle, null] as const;
      }
    })
  );

  return NextResponse.json(
    { products: Object.fromEntries(entries) },
    { headers: { "Cache-Control": "no-store" } }
  );
}
