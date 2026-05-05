"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { getStoredCheckoutDiscount } from "@/lib/checkoutDiscount";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SlideOutCart() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, cartTotal } = useCart();
  // Checkout state: show a loading label and any Shopify error near the button.
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Build /api/checkout payload and redirect to the hosted Shopify checkout URL.
  async function handleCheckout() {
    setCheckoutError(null);
    // Every line needs a Shopify handle so the API can resolve its variant.
    const lines = items
      .filter((i) => i.shopifyHandle)
      .map((i) => ({
        handle: i.shopifyHandle as string,
        sizeLabel: i.sizeLabel,
        unitPrice: i.price,
        quantity: i.quantity,
        ...(i.shopifyVariantId ? { merchandiseId: i.shopifyVariantId } : {}),
      }));

    if (lines.length === 0) {
      setCheckoutError(
        "This product is not yet connected to Shopify. Please try again soon."
      );
      return;
    }

    setCheckingOut(true);
    try {
      const storedDiscount = getStoredCheckoutDiscount();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines,
          ...(storedDiscount ? { discountCodes: [storedDiscount] } : {}),
        }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? "Could not start checkout.");
      }
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed.");
      setCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-surface">
              <h2 className="font-serif text-2xl text-primary">Your Crown</h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-surface rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-primary/50 space-y-4">
                  <ShoppingBag className="w-12 h-12" strokeWidth={1} />
                  <p className="font-sans">Your cart is empty.</p>
                  <button 
                    onClick={closeCart}
                    className="text-accent underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-24 h-24 bg-surface rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif text-lg text-primary leading-tight">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-primary/40 hover:text-primary transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-accent font-medium mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border border-surface rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-surface transition-colors"
                            >
                              <Minus className="w-4 h-4 text-primary" />
                            </button>
                            <span className="w-8 text-center font-sans text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-surface transition-colors"
                            >
                              <Plus className="w-4 h-4 text-primary" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-surface p-6 bg-background">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-primary/70">Subtotal</span>
                  <span className="font-serif text-2xl text-primary">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-primary/50 text-center mb-6">
                  Shipping & taxes calculated at checkout.
                </p>
                {checkoutError && (
                  <p className="text-xs text-red-600 text-center mb-3">
                    {checkoutError}
                  </p>
                )}
                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full bg-primary text-white py-4 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkingOut ? "Redirecting…" : "Checkout"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
