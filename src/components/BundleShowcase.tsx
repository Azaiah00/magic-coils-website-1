"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { productToCartLine, products } from "@/data/products";

export default function BundleShowcase() {
  const { addItem } = useCart();
  
  // Find the two bundles
  const twistBundle = products.find(p => p.id === "bundle-2-strand-twist");
  const pressBundle = products.find(p => p.id === "bundle-magic-press");

  if (!twistBundle || !pressBundle) return null;

  return (
    <section className="py-32 bg-primary relative overflow-hidden text-center text-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/promo-card.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[150px] -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#BF953F]/20 rounded-full blur-[150px] translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
            Most Popular
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            The <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">Magic Bundles</span>
          </h2>
          <p className="font-sans text-lg text-white/80 leading-relaxed font-light">
            Everything you need for salon-quality results at home. Curated systems designed to work perfectly together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Bundle 1: 2 Strand Twist */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative bg-white/5 border border-accent/20 flex flex-col h-full hover:border-accent transition-colors duration-500 overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 border border-accent/30 m-3 z-10 pointer-events-none transition-all duration-500 group-hover:border-accent"></div>
              <Image
                src={twistBundle.image}
                alt={twistBundle.name}
                fill
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 p-6"
              />
            </div>
            <div className="p-10 flex flex-col flex-grow text-left">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
                {twistBundle.name}
              </h3>
              <p className="text-accent text-xl font-medium mb-6">${twistBundle.price.toFixed(2)}</p>
              <ul className="space-y-3 text-white/70 mb-10 flex-grow font-light">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> 3-In-1 Leave In Treatment (8.45 oz)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Honey & Argan Custard (8.45 oz)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Control Foam Wrap Mousse (7.44 oz)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Strengthening Serum (4.05 oz)
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  onClick={() => addItem(productToCartLine(twistBundle, 1))}
                  className="flex-1 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary py-4 text-sm font-bold tracking-widest uppercase hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] text-center"
                >
                  Add to Cart
                </button>
                <Link href={`/product/${twistBundle.id}`} className="flex-1 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-primary py-4 text-sm font-bold tracking-widest uppercase transition-colors duration-300">
                  Details
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Bundle 2: The Magic Press */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative bg-white/5 border border-accent/20 flex flex-col h-full hover:border-accent transition-colors duration-500 overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 border border-accent/30 m-3 z-10 pointer-events-none transition-all duration-500 group-hover:border-accent"></div>
              <Image
                src={pressBundle.image}
                alt={pressBundle.name}
                fill
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 p-6"
              />
            </div>
            <div className="p-10 flex flex-col flex-grow text-left">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
                {pressBundle.name}
              </h3>
              <p className="text-accent text-xl font-medium mb-6">${pressBundle.price.toFixed(2)}</p>
              <ul className="space-y-3 text-white/70 mb-10 flex-grow font-light">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Peppermint Detox Shampoo (33.8 oz)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Intense Hydration Shampoo (33.8 oz)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Moisture Rich Conditioner (33.8 oz)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> 3-In-1 Leave In Treatment (33.8 oz)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> Honey & Argan Serum (4.05 oz)
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  onClick={() => addItem(productToCartLine(pressBundle, 1))}
                  className="flex-1 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary py-4 text-sm font-bold tracking-widest uppercase hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] text-center"
                >
                  Add to Cart
                </button>
                <Link href={`/product/${pressBundle.id}`} className="flex-1 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-primary py-4 text-sm font-bold tracking-widest uppercase transition-colors duration-300">
                  Details
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
