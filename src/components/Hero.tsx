"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row bg-background overflow-hidden">
      {/* Visual (Left/Top) */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full lg:w-[55%] h-[60vh] lg:h-auto order-2 lg:order-1"
      >
        <Image
          src="/images/hero-woman.png"
          alt="Black woman with flawlessly defined natural hair"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/20"></div>
      </motion.div>

      {/* Copy (Right/Bottom) */}
      <div className="w-full lg:w-[45%] flex items-center p-8 md:p-16 lg:p-24 order-1 lg:order-2 bg-background z-10">
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="max-w-xl text-left flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-4"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Crowned in Magic
            </span>
          </motion.div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary leading-[1.1] mb-8">
            The Magic <br className="hidden lg:block" /> in Every <br className="hidden lg:block" /> Coil.
          </h1>
          <p className="font-sans text-lg md:text-xl text-primary/80 mb-12 max-w-md leading-relaxed">
            Professional formulations designed to nourish, define, and protect. Your hair is a crown.
          </p>
          <Link
            href="/shop"
            className="group relative inline-flex items-center justify-center bg-primary text-white px-10 py-5 text-sm font-semibold tracking-widest uppercase overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Shop the Collection</span>
            <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
