"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("/images/promo-card.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Editorial Image Composition */}
          <div className="w-full lg:w-1/2 relative h-[600px] md:h-[700px] flex items-center justify-center">
            
            {/* Background Glow */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/10 rounded-full blur-[80px]"
            />

            {/* Main Image (Model in Blue) */}
            <motion.div 
              initial={{ opacity: 0, x: -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-0 top-0 w-[70%] h-[80%] z-10 shadow-2xl"
            >
              <div className="relative w-full h-full overflow-hidden border border-accent/20">
                <Image
                  src="/images/model-blue.png"
                  alt="Beautiful Black woman with natural hair holding Magic Coils Moisture Rich Conditioner"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            {/* Secondary Image (Model in Bathroom) */}
            <motion.div 
              initial={{ opacity: 0, x: 40, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="absolute right-0 bottom-0 w-[60%] h-[65%] z-20 shadow-2xl"
            >
              <div className="relative w-full h-full overflow-hidden border-4 border-white">
                <Image
                  src="/images/model-bathroom.png"
                  alt="Smiling Black woman with natural hair holding Magic Coils Strengthening Serum"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
            
          </div>

          {/* Right Side: Copy */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
                The Magic Touch
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-8 leading-[1.1]">
                Formulated for <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] bg-clip-text text-transparent">Our Crowns.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-primary/80 font-sans text-lg leading-relaxed max-w-xl"
            >
              <p>
                At Magic Coils, we know that textured hair requires a different level of care. It needs deep hydration, intentional ingredients, and products that respect the science of our strands.
              </p>
              <p>
                Our professional-grade formulas are crafted specifically for Black women—designed to detangle, moisturize, and add brilliant shine without compromising the integrity of your natural curl pattern.
              </p>
              <p className="font-medium text-primary">
                Whether you&apos;re doing a wash-and-go or prepping for a silk press, treat your hair like royalty.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10"
            >
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center border border-primary text-primary px-10 py-4 text-sm font-bold tracking-widest uppercase overflow-hidden transition-colors duration-300 hover:bg-primary hover:text-white"
              >
                <span className="relative z-10">Read Our Story</span>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
