"use client";

import { useEffect } from "react";
import {
  CHECKOUT_DISCOUNT_STORAGE_KEY,
} from "@/lib/checkoutDiscount";

/**
 * Reads ?discount=, ?discount_code=, or ?discountCode= from the URL on magiccoils.net,
 * stores the code for checkout, and removes those params from the address bar (no UI change).
 * Shopify's myshopify.com/discount/... links cannot be replaced in admin; use this pattern instead.
 */
export default function DiscountUrlCapture() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const raw =
      params.get("discount") ||
      params.get("discount_code") ||
      params.get("discountCode");

    if (!raw?.trim()) return;

    const code = raw.trim();
    sessionStorage.setItem(CHECKOUT_DISCOUNT_STORAGE_KEY, code);

    params.delete("discount");
    params.delete("discount_code");
    params.delete("discountCode");

    const next =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "") +
      window.location.hash;

    window.history.replaceState({}, "", next);
  }, []);

  return null;
}
