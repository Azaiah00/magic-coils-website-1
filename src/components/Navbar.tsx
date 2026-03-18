"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { openCart, items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-primary text-accent py-2.5 text-center text-xs md:text-sm font-medium tracking-widest uppercase">
        Free Shipping on Orders Over $75 | Crowned in Magic
      </div>

      {/* Main Navbar */}
      <div className="border-b border-surface">
        <div className="container mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2 text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>

          {/* Left: Links */}
          <nav className="hidden md:flex items-center gap-10 flex-1">
            <Link href="/shop" className="text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors duration-300 ease-in-out">
              Shop All
            </Link>
            <Link href="/quiz" className="text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors duration-300 ease-in-out">
              Hair Quiz
            </Link>
            <Link href="/about" className="text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors duration-300 ease-in-out">
              Our Story
            </Link>
          </nav>

          {/* Center: Logo */}
          <Link href="/" className="flex-1 md:flex-none flex justify-center items-center">
            <Image 
              src="/images/magic-coils-logo.png" 
              alt="Magic Coils" 
              width={140} 
              height={70} 
              className="object-contain h-14 w-auto"
              priority
            />
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-6 flex-1">
            <button aria-label="Search" className="hover:text-accent transition-colors duration-300 ease-in-out hidden sm:block">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button aria-label="Account" className="hover:text-accent transition-colors duration-300 ease-in-out hidden sm:block">
              <User className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button 
              aria-label="Cart" 
              onClick={openCart}
              className="relative hover:text-accent transition-colors duration-300 ease-in-out p-2 -mr-2"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-surface">
              <Image src="/images/magic-coils-logo.png" alt="Magic Coils" width={100} height={50} className="h-10 w-auto" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>
            <nav className="flex flex-col p-8 gap-8">
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-primary">Shop All</Link>
              <Link href="/quiz" onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-primary">Hair Quiz</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-primary">Our Story</Link>
              <Link href="/directory" onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-primary">Stylist Directory</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="font-serif text-3xl text-primary">Curl Talk Blog</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
