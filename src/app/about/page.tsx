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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl text-white mb-6"
            >
              Our Story
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl text-primary mb-10 leading-tight"
            >
              Honoring the beauty, versatility, and power of textured hair.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-lg md:text-xl text-primary/80 leading-relaxed mb-12"
            >
              Rooted in the belief that hair is a crown, our brand celebrates every curl, coil, and wave with professional-quality formulations designed to nourish, define, and protect. Our luxurious blends merge science and nature to empower confidence and elegance in every strand.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
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

        {/* Event Presence — Where the Magic Happens */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
                IN ACTION
              </span>
              <p className="font-serif italic text-primary/70 text-lg">
                Where the magic comes to life
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[16/10] w-full overflow-hidden shadow-xl"
            >
              <Image
                src="/images/about-booth.png"
                alt="Magic Coils booth at a trade show event with founder Antwun Wilson"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </section>

        {/* Founder's Message */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            {/* Founder Image — Full Width at Top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] md:aspect-[16/9] w-full max-w-2xl mx-auto mb-12 overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/founder-antwun.png"
                alt="Antwun Wilson, Founder of Magic Coils"
                fill
                className="object-cover object-top"
              />
            </motion.div>

            {/* Message Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              {/* Section Label */}
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-2 block text-center">
                FOUNDER&apos;S MESSAGE
              </span>
              
              {/* Subcaption */}
              <p className="font-serif italic text-primary/70 text-base mb-8 text-center">
                Antwun Wilson, Founder · Hair For You LLC
              </p>

              {/* Body Copy */}
              <div className="font-sans text-[17px] leading-[28px] text-primary/90 space-y-6">
                <p>
                  I built Magic Coils because the haircare aisle never built it for the women in my life.
                </p>
                
                <p>
                  For years I watched the women in my family search for products that actually understood their hair. Bottle after bottle promised to &quot;tame&quot; them. <em className="italic">Tame.</em> As if their crowns were something unruly that needed to be managed instead of celebrated. The shelves were full of formulas designed for someone else&apos;s texture, marketed in someone else&apos;s language. The few brands that did serve textured hair too often felt like an afterthought — thin ingredient lists, generic packaging, no soul behind the label.
                </p>
                
                <p>
                  I knew their hair deserved more. More care. More science. More respect.
                </p>
                
                <p>
                  So I built it. Magic Coils is what happens when a brand starts with that respect from day one. Every product in our line is built around three hero ingredients chosen specifically for textured hair: <strong className="text-primary">argan oil</strong> for slip and shine, <strong className="text-primary">vitamin C</strong> for scalp health and luminosity, and <strong className="text-primary">honey oil</strong> for deep, lasting moisture. Eight professional-grade formulas — not one of them an afterthought, not one ingredient filler. Each one designed to nourish, define, and protect the natural pattern of your crown, exactly as it grows.
                </p>
                
                <p>
                  But Magic Coils isn&apos;t only about what&apos;s in the bottle. It&apos;s about who you become when you finally use a product that was made for you. The first time your wash day feels like ritual instead of routine. The first time your twist-out lasts seven days instead of three. The first time you look in the mirror and your hair looks the way it was always supposed to.
                </p>
                
                <p>
                  That&apos;s the magic. That&apos;s the promise.
                </p>
                
                <p>
                  This is the brand the women in my life deserved. The one we built so the women coming after them never have to wait for it the way they did.
                </p>
              </div>

              {/* Sign-off */}
              <div className="mt-10 pt-8 border-t border-accent/20 text-center">
                <p className="font-serif italic text-accent text-[15px]">
                  Welcome to Magic Coils. Crowned in Magic.
                </p>
                <p className="font-serif italic text-primary/60 text-[15px] mt-4">
                  — Antwun Wilson<br />
                  Founder, Magic Coils · Hair For You LLC
                </p>
              </div>
            </motion.div>
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
                { title: "Quality", desc: "Professional-grade, luxurious formulations." },
                { title: "Inclusivity", desc: "Celebrating every curl, coil, and wave." }
              ].map((value, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
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
              initial={{ opacity: 0, y: 20 }}
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
              initial={{ opacity: 0, scale: 0.98 }}
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
