"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-surface overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20">
          {/* Column 1: Brand & Social */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <Link href="/" className="mb-8">
              <Image 
              src="/images/magic-coils-logo.png" 
              alt="Magic Coils" 
              width={160} 
              height={80} 
              className="object-contain"
              />
            </Link>
            <p className="font-sans text-sm text-primary/70 mb-8 max-w-sm leading-relaxed">
              &quot;Crowned in Magic.&quot; A luxurious professional haircare brand where every curl is treated like a crown.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" aria-label="Instagram" className="text-primary hover:text-accent transition-colors duration-300">
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="TikTok" className="text-primary hover:text-accent transition-colors duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-primary hover:text-accent transition-colors duration-300">
                <Youtube className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook" className="text-primary hover:text-accent transition-colors duration-300">
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Shop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col"
          >
            <h4 className="font-serif text-xl text-primary mb-8">Shop</h4>
            <nav className="flex flex-col gap-5">
              <Link href="/shop" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">All Products</Link>
              <Link href="/shop?category=shampoo" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">Shampoo & Conditioners</Link>
              <Link href="/shop?category=styling" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">Styling & Treatments</Link>
              <Link href="/shop?category=bundles" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">Crown Bundles</Link>
              <Link href="/quiz" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">Hair Quiz</Link>
            </nav>
          </motion.div>

          {/* Column 3: About & Support */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <h4 className="font-serif text-xl text-primary mb-8">Discover</h4>
            <nav className="flex flex-col gap-5">
              <Link href="/about" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">Our Story</Link>
              <Link href="/blog" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">Curl Talk Blog</Link>
              <Link href="/directory" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">Stylist Directory</Link>
              <Link href="/faq" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">FAQ</Link>
              <Link href="/contact" className="font-sans text-sm text-primary/70 hover:text-accent transition-colors duration-300">Contact Us</Link>
            </nav>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col"
          >
            <h4 className="font-serif text-xl text-primary mb-8">Join the Royalty</h4>
            <p className="font-sans text-sm text-primary/70 mb-6 leading-relaxed">
              Subscribe to receive educational content, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-surface border border-surface px-5 py-4 text-sm focus:outline-none focus:border-accent focus:bg-white transition-colors duration-300"
                required
              />
              <button 
                type="button" 
                className="w-full bg-primary text-white px-5 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Contact Info & Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-12 border-t border-surface flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
            <p className="font-sans text-xs text-primary/50">
              &copy; {new Date().getFullYear()} Magic Coils Professional Hair Products. All rights reserved.
            </p>
            <span className="hidden md:inline text-primary/30">|</span>
            <p className="font-sans text-xs text-primary/50">
              Hair For You LLC &bull; 843-344-7131 &bull; <a href="mailto:hairforyoullc@gmail.com" className="hover:text-accent transition-colors">hairforyoullc@gmail.com</a>
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="font-sans text-xs text-primary/50 hover:text-primary transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="font-sans text-xs text-primary/50 hover:text-primary transition-colors duration-300">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
