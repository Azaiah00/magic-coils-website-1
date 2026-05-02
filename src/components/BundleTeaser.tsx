"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BundleTeaser() {
  return (
    <section className="py-32 bg-primary relative overflow-hidden text-center text-white border-y border-accent/20">
      {/* Subtle Damask Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
      
      {/* Animated Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-6 block">
            Unlock The Full Experience
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8">
            The Magic <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">Bundles</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed font-light mb-12 max-w-2xl">
            For the perfect 2-strand twist or a flawless silk press. Discover our expertly curated full-system bundles that guarantee salon-quality results at home.
          </p>
          <Link
            href="/bundles"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-12 py-5 text-sm font-bold tracking-widest uppercase overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">Shop The Bundles Collection</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}