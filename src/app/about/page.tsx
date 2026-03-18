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

      </PageTransition>
      <Footer />
    </main>
  );
}
