"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatListingPrice, productToCartLine, products } from "@/data/products";

export default function ProductGrid() {
  const { addItem } = useCart();
  // Show first 4 products on home page
  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      {/* Subtle Damask Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl text-primary mb-6">
              Iconic <span className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] bg-clip-text text-transparent">Essentials</span>
            </h2>
            <p className="font-sans text-lg text-primary/70 leading-relaxed">
              Curated perfection for your daily routine. Experience the magic of our best-selling formulas, crafted to honor the beauty of textured hair.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 text-primary font-semibold tracking-widest uppercase text-sm hover:text-accent transition-colors duration-300 group"
            >
              View All Products
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          {displayProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`group relative flex flex-col ${index % 2 !== 0 ? 'lg:mt-24' : ''}`}
            >
              {/* Image Wrapper */}
              <div className={`relative w-full aspect-[3/4] bg-white overflow-hidden mb-6 flex items-center justify-center shadow-sm`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110 p-4"
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
                
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col text-left">
                <p className="text-xs text-accent uppercase tracking-widest mb-2 font-semibold">
                  {product.subtitle}
                </p>
                <h3 className="font-serif text-2xl text-primary mb-3 leading-tight">
                  <Link href={`/product/${product.id}`} className="hover:text-accent transition-colors duration-300">
                    {product.name}
                  </Link>
                </h3>
                <p className="font-sans text-primary/80 font-medium text-lg">
                  {formatListingPrice(product)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
