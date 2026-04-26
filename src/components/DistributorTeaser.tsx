"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function DistributorTeaser() {
  return (
    <section className="py-20 bg-surface border-t border-accent/10">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <span className="text-primary/60 text-xs font-bold tracking-widest uppercase mb-4 block">
            Partner With Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
            Become a Distributor
          </h2>
          <p className="font-sans text-base md:text-lg text-primary/70 leading-relaxed font-light mb-8">
            Gain an additional stream of income by providing a salon-quality line of products that proven stylists and their clients love.
          </p>
          <Link
            href="/distributor"
            className="group relative inline-flex items-center justify-center border border-primary text-primary px-10 py-4 text-xs font-bold tracking-widest uppercase overflow-hidden transition-colors duration-300 hover:bg-primary hover:text-white"
          >
            <span className="relative z-10">Learn More & Apply</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}