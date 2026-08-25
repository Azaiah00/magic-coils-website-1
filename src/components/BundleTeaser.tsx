"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const routineCards = [
  {
    title: "Professional Magic Press",
    eyebrow: "Silk press routine",
    description: "A five-product path from cleansing and conditioning through prep and finish.",
    image: "/images/hero/bundle-magic-press.png",
    mobileImage: "/images/hero/bundle-magic-press-mobile-wide.png",
    href: "/collections/professional-magic-press",
    cta: "Explore Magic Press",
  },
  {
    title: "2 Strand Twist",
    eyebrow: "Twist & set routine",
    description: "Leave-in, custard, foam, and serum grouped for twists and definition-focused styles.",
    image: "/images/hero/bundle-2-strand-twist.png",
    mobileImage: "/images/hero/bundle-2-strand-twist-mobile-wide.png",
    href: "/collections/2-strand-twist-collection",
    cta: "Explore Twist Routine",
  },
];

export default function BundleTeaser() {
  return (
    <section id="routines" className="scroll-mt-24 py-24 md:py-32 bg-primary relative overflow-hidden text-white border-y border-accent/20">
      {/* Subtle Damask Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
      
      {/* Animated Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-6 block">
            Shop by styling goal
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8">
            Choose Your <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">Routine</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed font-light mb-12 max-w-2xl">
            Start with the finish you want, then follow a clear product sequence from prep to style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {routineCards.map((routine) => (
            <motion.article
              key={routine.href}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="group overflow-hidden rounded-2xl border border-accent/25 bg-white/[0.06] backdrop-blur-sm"
            >
              <Link href={routine.href} className="grid sm:grid-cols-[0.9fr_1.1fr] h-full">
                <div className="relative aspect-[512/382] sm:aspect-auto sm:min-h-full bg-white/95">
                  <Image
                    src={routine.mobileImage}
                    alt={`${routine.title} product routine`}
                    fill
                    sizes="(max-width: 639px) 100vw, 1px"
                    className="object-cover sm:hidden transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <Image
                    src={routine.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 640px) 45vw, 1px"
                    className="hidden sm:block object-contain p-5 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 md:p-9 flex flex-col justify-center">
                  <span className="text-accent text-xs font-bold tracking-[0.18em] uppercase mb-3">
                    {routine.eyebrow}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
                    {routine.title}
                  </h3>
                  <p className="font-sans text-white/75 leading-relaxed mb-7">
                    {routine.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent font-bold tracking-widest uppercase text-xs">
                    {routine.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/bundles" className="text-white/80 hover:text-accent underline underline-offset-4 transition-colors">
            Compare both routines
          </Link>
        </div>
      </div>
    </section>
  );
}
