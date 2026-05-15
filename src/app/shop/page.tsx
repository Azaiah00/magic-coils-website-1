"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import JudgeMePreviewBadge from "@/components/JudgeMePreviewBadge";
import { useCart } from "@/context/CartContext";
import { formatListingPrice, productToCartLine, products } from "@/data/products";

const categories = [
  { id: "all", label: "All Products" },
  { id: "shampoo", label: "Shampoo & Conditioners" },
  { id: "styling", label: "Styling" },
  { id: "treatments", label: "Treatments" },
  { id: "bundles", label: "Bundles", href: "/bundles" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <Script
        id="shop-itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Magic Coils — Full Product Line",
            url: "https://magiccoils.net/shop",
            numberOfItems: products.length,
            itemListElement: products.map((p, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: `https://magiccoils.net/product/${p.id}`,
              name: p.name,
            })),
          }),
        }}
      />
      <PageTransition>
        <div className="pt-24 pb-12 bg-surface">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-7xl text-primary mb-6"
            >
              The Collection
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-lg text-primary/70 max-w-2xl mx-auto"
            >
              Professional-quality formulations designed to nourish, define, and protect.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-16">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {categories.map((cat) => (
              cat.href ? (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="text-sm font-semibold tracking-widest uppercase transition-colors duration-300 pb-2 border-b-2 border-transparent text-primary/50 hover:text-primary hover:border-accent"
                >
                  {cat.label}
                </Link>
              ) : (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-sm font-semibold tracking-widest uppercase transition-colors duration-300 pb-2 border-b-2 ${
                    activeCategory === cat.id 
                      ? "border-accent text-primary" 
                      : "border-transparent text-primary/50 hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              )
            ))}
          </div>

          {/* Product Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12"
          >
            {filteredProducts.map((product) => {
              // Only the two shop bundles get a wider 4:3 frame + contain so composite art isn’t side-cropped.
              const isBundleCard = product.category === "bundles";
              return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={product.id} 
                className="group relative flex flex-col"
              >
                {/* Image Wrapper */}
                <div
                  className={`relative w-full bg-surface overflow-hidden mb-6 flex items-center justify-center shadow-sm ${
                    isBundleCard ? "aspect-[4/3]" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-center transition-transform duration-1000 ease-out group-hover:scale-110 ${
                      isBundleCard ? "object-contain p-2 md:p-4" : "object-cover"
                    }`}
                  />
                  
                  {/* Quick Add Button */}
                  <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                    <button 
                      onClick={() => addItem(productToCartLine(product, 1))}
                      className="w-full bg-primary text-white py-4 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300 shadow-xl"
                    >
                      Quick Add
                    </button>
                  </div>
                  
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col text-left">
                  <p className="text-xs text-accent uppercase tracking-widest mb-2 font-semibold">
                    {product.subtitle}
                  </p>
                  <h3 className="font-serif text-xl text-primary mb-2 leading-tight">
                    <Link href={`/product/${product.id}`} className="hover:text-accent transition-colors duration-300">
                      {product.name}
                    </Link>
                  </h3>
                  <JudgeMePreviewBadge product={product} />
                  <p className="font-sans text-primary/80 font-medium">
                    {formatListingPrice(product)}
                  </p>
                </div>
              </motion.div>
            );
            })}
          </motion.div>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
