"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export default function SocialCTA() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
            Join the Crowned Community
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Show Us Your <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">Magic</span>
          </h2>
          <p className="font-sans text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Tag @magiccoilsofficial on Instagram and TikTok for a chance to be featured. 
            See real results from our Crowned community.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://instagram.com/magiccoilsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white text-primary px-8 py-4 font-bold tracking-widest uppercase hover:bg-accent hover:text-primary transition-colors duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow on Instagram</span>
            </a>
            <a
              href="https://tiktok.com/@magiccoilsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-accent text-accent px-8 py-4 font-bold tracking-widest uppercase hover:bg-accent hover:text-primary transition-colors duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span>Follow on TikTok</span>
            </a>
          </div>
          
          <p className="mt-8 text-sm text-white/50">
            #magiccoils #crownedinmagic #4chair #naturalhair
          </p>
        </motion.div>
      </div>
    </section>
  );
}
