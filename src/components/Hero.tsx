"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row bg-primary overflow-hidden">
      {/* Visual Background (Damask Pattern) */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
      
      {/* Animated Gold Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1.2 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/30 rounded-full blur-[150px]"
      />

      {/* Visual (Left/Top) */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full lg:w-[55%] h-[60vh] lg:h-auto order-2 lg:order-1 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/promo-throne.png"
            alt="Black woman with flawlessly defined natural hair on a throne"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient Overlays for Blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary"></div>
        </div>
      </motion.div>

      {/* Copy (Right/Bottom) */}
      <div className="w-full lg:w-[45%] flex items-center p-8 md:p-16 lg:p-24 order-1 lg:order-2 bg-transparent z-10">
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="max-w-xl text-left flex flex-col items-start"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-6 drop-shadow-lg">
            Crowned <br className="hidden lg:block" /> in <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">Magic.</span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-white/80 mb-12 max-w-md leading-relaxed font-light tracking-wide">
            A luxurious professional haircare brand. Every strand is a story. Treat your curls like royalty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-10 py-5 text-sm font-bold tracking-widest uppercase overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10">Shop the Collection</span>
            </Link>
            <Link
              href="/quiz"
              className="group relative inline-flex items-center justify-center border border-accent text-accent px-10 py-5 text-sm font-bold tracking-widest uppercase overflow-hidden transition-colors duration-300 hover:bg-accent hover:text-primary"
            >
              <span className="relative z-10">Take the Hair Quiz</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
