"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function DistributorPage() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-background overflow-hidden">
      <Navbar />
      <PageTransition>
        {/* Luxury Hero Section */}
        <section className="relative w-full py-32 lg:py-48 flex items-center justify-center bg-primary overflow-hidden">
          {/* Damask Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("/images/promo-card.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          
          {/* Animated Gold Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]"
          />

          <div className="container relative z-10 px-4 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <Image 
                src="/images/magic-coils-logo.png" 
                alt="Magic Coils Logo" 
                width={200} 
                height={100} 
                className="object-contain drop-shadow-2xl mx-auto"
              />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide"
            >
              Distributor <br className="md:hidden" />
              <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">Opportunities</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-white/80 font-sans text-lg md:text-xl max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
            >
              Gain an additional stream of income by providing a salon-quality line of products that proven stylists and their clients love.
            </motion.p>
          </div>
        </section>

        {/* Info & CTA Section */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="bg-white p-10 md:p-16 shadow-2xl border border-accent/20 flex flex-col items-center text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">Partner With The Best</h2>
              <p className="text-primary/70 font-sans text-lg mb-10 max-w-2xl leading-relaxed">
                We are actively seeking passionate distributors and salon owners to carry the Magic Coils professional line. Expand your retail offerings and increase your revenue with formulations that deliver flawless, healthy results for textured hair.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-accent mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="font-serif text-xl text-primary mb-2">High Margins</h3>
                  <p className="text-sm text-primary/60">Competitive wholesale pricing designed for profitability.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-accent mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                  <h3 className="font-serif text-xl text-primary mb-2">Proven Results</h3>
                  <p className="text-sm text-primary/60">Formulas that clients will keep coming back to purchase.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-accent mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="font-serif text-xl text-primary mb-2">Brand Support</h3>
                  <p className="text-sm text-primary/60">Marketing materials and priority support for our partners.</p>
                </div>
              </div>

              <a 
                href="mailto:info@magiccoils.net?subject=Distributor%20Inquiry"
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-10 py-5 text-sm font-bold tracking-widest uppercase overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-transform duration-300 hover:scale-105"
              >
                <span className="relative z-10">Email Us to Apply</span>
              </a>
            </div>
          </div>
        </section>
      </PageTransition>
      <Footer />
    </main>
  );
}
