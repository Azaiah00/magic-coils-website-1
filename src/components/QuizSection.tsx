"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function QuizSection() {
  return (
    <section className="py-32 bg-primary relative overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
      {/* Decorative background elements */}
      <motion.div 
        animate={{ 
          rotate: [12, 15, 12],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[150%] rounded-[100%] border border-white/5 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          rotate: [-12, -15, -12],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[150%] rounded-[100%] border border-white/5 pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto bg-background p-12 md:p-24 text-center shadow-2xl relative"
        >
          {/* Accent corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent m-6"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent m-6"></div>

          <h2 className="font-serif text-5xl md:text-7xl text-primary mb-8 leading-tight">
            Find Your <br/> <span className="text-accent italic">Magic.</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-primary/80 mb-12 max-w-xl mx-auto leading-relaxed">
            Take our 60-second consultation to build your custom routine. Discover the perfect formulations for your unique crown.
          </p>
          <Link
            href="/quiz"
            className="group relative inline-flex items-center justify-center bg-transparent border border-primary text-primary px-12 py-5 text-sm font-semibold tracking-widest uppercase overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Start Consultation</span>
            <div className="absolute inset-0 bg-primary transform scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
