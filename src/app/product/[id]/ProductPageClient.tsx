"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Mail, Minus, Plus, RotateCcw, ShoppingBag } from "lucide-react";
import Link from "next/link";
import JudgeMeProductReviews from "@/components/JudgeMeProductReviews";
import { ProductImageCarouselFromProduct } from "@/components/ProductImageCarousel";
import { useCart } from "@/context/CartContext";
import { productToCartLine, type Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductPageClient({ product }: Props) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [variantIndex, setVariantIndex] = useState(0);

  const hasVariants = Boolean(product.variants?.length);
  const displayPrice = hasVariants ? product.variants![variantIndex].price : product.price;

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left: Image Gallery */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2"
        >
          <ProductImageCarouselFromProduct product={product} />
        </motion.div>

        {/* Right: Product Info (Sticky) */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-32">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-accent uppercase tracking-widest mb-3 font-semibold">
                {product.subtitle}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-2xl text-primary/80 mb-8">
                ${displayPrice.toFixed(2)}
              </p>

              {hasVariants && (
                <div className="mb-8">
                  <p className="text-xs text-accent uppercase tracking-widest mb-3 font-semibold">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.variants!.map((v, i) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVariantIndex(i)}
                        aria-pressed={variantIndex === i}
                        className={`px-4 py-3 text-sm font-sans border transition-colors duration-300 ${
                          variantIndex === i
                            ? "border-primary bg-primary text-white"
                            : "border-primary/20 text-primary hover:border-primary/40"
                        }`}
                      >
                        {v.sizeLabel}
                        <span className="block text-xs opacity-80 mt-0.5">
                          ${v.price.toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 mb-10">
                <div className="flex items-center border border-primary/20 p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-surface transition-colors"
                    type="button"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 text-primary" />
                  </button>
                  <span className="w-12 text-center font-sans text-lg" aria-live="polite">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-surface transition-colors"
                    type="button"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4 text-primary" />
                  </button>
                </div>
                <button
                  onClick={() => addItem(productToCartLine(product, quantity, variantIndex))}
                  className="flex-1 bg-primary text-white py-5 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300 shadow-xl"
                  type="button"
                >
                  Add to Cart — ${(displayPrice * quantity).toFixed(2)}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 text-sm text-primary/70">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                  <span>Shopify-powered checkout</span>
                </div>
                <Link href="/terms" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <RotateCcw className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                  <span>14-day unopened returns</span>
                </Link>
                <a href="mailto:info@magiccoils.net" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                  <span>Product questions</span>
                </a>
              </div>
            </motion.div>

            {/* Accordions */}
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="border-t border-surface"
            >
              <div className="border-b border-surface">
                <button
                  onClick={() => toggleAccordion("description")}
                  className="w-full py-6 flex justify-between items-center text-left"
                  type="button"
                >
                  <span className="font-serif text-xl text-primary">Description</span>
                  {openAccordion === "description" ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </button>
                {openAccordion === "description" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-6 text-primary/70 font-sans leading-relaxed whitespace-pre-line"
                  >
                    {product.description}
                  </motion.div>
                )}
              </div>

              <div className="border-b border-surface">
                <button
                  onClick={() => toggleAccordion("howToUse")}
                  className="w-full py-6 flex justify-between items-center text-left"
                  type="button"
                >
                  <span className="font-serif text-xl text-primary">How to Use</span>
                  {openAccordion === "howToUse" ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </button>
                {openAccordion === "howToUse" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-6 text-primary/70 font-sans leading-relaxed whitespace-pre-line"
                  >
                    {product.howToUse}
                  </motion.div>
                )}
              </div>

              <div className="border-b border-surface">
                <button
                  onClick={() => toggleAccordion("ingredients")}
                  className="w-full py-6 flex justify-between items-center text-left"
                  type="button"
                >
                  <span className="font-serif text-xl text-primary">Ingredients</span>
                  {openAccordion === "ingredients" ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </button>
                {openAccordion === "ingredients" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-6 text-primary/70 font-sans leading-relaxed text-sm whitespace-pre-line"
                  >
                    {product.ingredients}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </div>
      <JudgeMeProductReviews product={product} />
    </>
  );
}
