"use client";

import { useState, use } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find(p => p.id === resolvedParams.id);
  
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

  if (!product) {
    return notFound();
  }

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Left: Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative w-full aspect-[4/5] bg-surface flex items-center justify-center shadow-inner">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center p-8 md:p-12"
                  priority
                />
              </div>
            </motion.div>

            {/* Right: Product Info (Sticky) */}
            <div className="w-full lg:w-1/2">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
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
                    ${product.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-6 mb-10">
                    <div className="flex items-center border border-primary/20 p-2">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-surface transition-colors"
                      >
                        <Minus className="w-4 h-4 text-primary" />
                      </button>
                      <span className="w-12 text-center font-sans text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-surface transition-colors"
                      >
                        <Plus className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                    <button 
                      onClick={() => addItem({ ...product, quantity })}
                      className="flex-1 bg-primary text-white py-5 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300 shadow-xl"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>

                {/* Accordions */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="border-t border-surface"
                >
                  {/* Description */}
                  <div className="border-b border-surface">
                    <button 
                      onClick={() => toggleAccordion("description")}
                      className="w-full py-6 flex justify-between items-center text-left"
                    >
                      <span className="font-serif text-xl text-primary">Description</span>
                      {openAccordion === "description" ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
                    </button>
                    {openAccordion === "description" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pb-6 text-primary/70 font-sans leading-relaxed"
                      >
                        {product.description}
                      </motion.div>
                    )}
                  </div>

                  {/* How to Use */}
                  <div className="border-b border-surface">
                    <button 
                      onClick={() => toggleAccordion("howToUse")}
                      className="w-full py-6 flex justify-between items-center text-left"
                    >
                      <span className="font-serif text-xl text-primary">How to Use</span>
                      {openAccordion === "howToUse" ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
                    </button>
                    {openAccordion === "howToUse" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pb-6 text-primary/70 font-sans leading-relaxed"
                      >
                        {product.howToUse}
                      </motion.div>
                    )}
                  </div>

                  {/* Ingredients */}
                  <div className="border-b border-surface">
                    <button 
                      onClick={() => toggleAccordion("ingredients")}
                      className="w-full py-6 flex justify-between items-center text-left"
                    >
                      <span className="font-serif text-xl text-primary">Ingredients</span>
                      {openAccordion === "ingredients" ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
                    </button>
                    {openAccordion === "ingredients" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pb-6 text-primary/70 font-sans leading-relaxed text-sm"
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
      </PageTransition>
      <Footer />
    </main>
  );
}
