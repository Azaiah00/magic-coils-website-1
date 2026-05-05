/** Session key: discount code applied from ?discount= / ?discount_code= on magiccoils.net. */
export const CHECKOUT_DISCOUNT_STORAGE_KEY = "magic_coils_checkout_discount";

/** Read stored discount code (browser only). */
export function getStoredCheckoutDiscount(): string | null {
  if (typeof window === "undefined") return null;
  const v = sessionStorage.getItem(CHECKOUT_DISCOUNT_STORAGE_KEY)?.trim();
  return v || null;
}
