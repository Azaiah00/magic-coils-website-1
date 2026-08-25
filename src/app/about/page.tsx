"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <PageTransition>
        
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/hero-woman.png"
            alt="Magic Coils Brand Story"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/40"></div>
          <div className="relative z-10 text-center px-4">
            <motion.h1 
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl text-white mb-6"
            >
              Our Story
            </motion.h1>
            <motion.p 
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-xl text-white/90 font-medium tracking-widest uppercase"
            >
              Crowned in Magic
            </motion.p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <motion.h2 
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl text-primary mb-10 leading-tight"
            >
              Honoring the beauty, versatility, and power of textured hair.
            </motion.h2>
            <motion.p 
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-lg md:text-xl text-primary/80 leading-relaxed mb-12"
            >
              Rooted in the belief that hair is a crown, Magic Coils celebrates curls, coils, waves, locs, and protective styles with complete routines for wash day, styling, and finishing.
            </motion.p>
            <motion.div 
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-block border-l-2 border-accent pl-8 py-2 text-left"
            >
              <p className="font-serif text-2xl text-primary italic">
                &quot;Every strand is a story. Every curl is crowned in magic.&quot;
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder's Message */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            {/* Section Header — Above the two columns */}
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
                FOUNDER&apos;S MESSAGE
              </span>
              <p className="font-serif italic text-primary/70 text-base">
                Antwun Wilson, Founder · Hair For You LLC
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Founder Image — Aligned at top with text */}
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:sticky lg:top-32"
              >
                <Image
                  src="/images/founder-antwun.png"
                  alt="Antwun Wilson, Founder of Magic Coils"
                  fill
                  className="object-cover object-center shadow-2xl"
                />
              </motion.div>

              {/* Message Content */}
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Body Copy */}
                <div className="font-sans text-[17px] leading-[28px] text-primary/90 space-y-6">
                  <p>
                    Magic Coils was created by Antwun Wilson, a hair distributor and the founder of Hair For You. His work in hair distribution gave the brand a practical starting point: textured-hair customers need clear routines, accessible product education, and reliable ways to buy the products that fit their styling goals.
                  </p>

                  <p>
                    The line brings wash-day, styling, and finishing products together so shoppers can build a routine for silk presses, twists, coils, locs, and other textured-hair styles. Each product page includes directions and a complete ingredient list to help customers make an informed choice.
                  </p>

                  <p>
                    Hair For You also gives Magic Coils a direct connection to salons and independent stylists. Through the Royal Court partner program, the brand is building relationships with professionals who want to use, carry, and introduce Magic Coils products to their clients.
                  </p>

                  <p>
                    The goal is simple: help every customer approach their hair as a crown, with a routine they can understand and products they can use with confidence.
                  </p>
                </div>

                {/* Sign-off */}
                <div className="mt-10 pt-8 border-t border-accent/20">
                  <p className="font-serif italic text-accent text-[15px]">
                    Welcome to Magic Coils. Crowned in Magic.
                  </p>
                  <p className="font-serif italic text-primary/60 text-[15px] mt-4">
                    Antwun Wilson<br />
                    Founder, Magic Coils · Hair For You LLC
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-surface border-y border-primary/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Our Essence</span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary">Core Values</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: "Authenticity", desc: "Honoring natural beauty in its truest form." },
                { title: "Confidence", desc: "Empowering you to wear your crown proudly." },
                { title: "Clarity", desc: "Clear routines, directions, and ingredient information." },
                { title: "Inclusivity", desc: "Celebrating every curl, coil, and wave." }
              ].map((value, idx) => (
                <motion.div 
                  key={idx}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center p-8 bg-white shadow-sm"
                >
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                    <span className="font-serif text-2xl text-accent">{idx + 1}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-4">{value.title}</h3>
                  <p className="font-sans text-primary/70 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Team — Behind the Magic */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
                THE TEAM
              </span>
              <p className="font-serif italic text-primary/70 text-lg">
                The people who make the magic happen
              </p>
            </motion.div>
            
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[16/10] w-full overflow-hidden shadow-xl"
            >
              <Image
                src="/images/about-team.png"
                alt="The Magic Coils team at an industry event"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </section>

      </PageTransition>
      <Footer />
    </main>
  );
}
