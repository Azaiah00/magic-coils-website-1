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
    <>
      <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md flex flex-col">
        {/* Announcement Bar */}
        <div className="bg-primary text-accent py-2.5 text-center text-xs md:text-sm font-medium tracking-widest uppercase">
          Free Shipping on Orders Over $75 | Crowned in Magic
        </div>

        {/* Main Navbar */}
        <div className="border-b border-surface">
          <div className="container mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
            
            {/* Left Section: Mobile Menu Toggle / Desktop Links */}
            <div className="flex-1 flex items-center justify-start">
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 -ml-2 text-primary hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>

              {/* Desktop Links */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-10">
                <Link href="/shop" className="text-xs lg:text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors duration-300 ease-in-out whitespace-nowrap">
                  Shop All
                </Link>
                <Link href="/quiz" className="text-xs lg:text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors duration-300 ease-in-out whitespace-nowrap">
                  Hair Quiz
                </Link>
                <Link href="/directory" className="text-xs lg:text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors duration-300 ease-in-out whitespace-nowrap">
                  Stylists
                </Link>
                <Link href="/about" className="text-xs lg:text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors duration-300 ease-in-out whitespace-nowrap">
                  Our Story
                </Link>
              </nav>
            </div>

            {/* Center Section: Logo */}
            <div className="flex justify-center items-center shrink-0 px-2">
              <Link href="/" className="flex items-center justify-center">
                <Image 
                  src="/images/magic-coils-logo.png" 
                  alt="Magic Coils" 
                  width={160} 
                  height={80} 
                  className="object-contain h-12 md:h-16 w-auto drop-shadow-sm"
                  priority
                />
              </Link>
            </div>

            {/* Right Section: Icons */}
            <div className="flex items-center justify-end gap-2 md:gap-6 flex-1">
              <button aria-label="Search" className="hover:text-accent transition-colors duration-300 ease-in-out hidden sm:block p-2">
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button aria-label="Account" className="hover:text-accent transition-colors duration-300 ease-in-out hidden sm:block p-2">
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button 
                aria-label="Cart" 
                onClick={openCart}
                className="relative hover:text-accent transition-colors duration-300 ease-in-out p-2 -mr-2 md:mr-0"
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center bg-accent text-white text-[10px] md:text-xs font-bold rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[100] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-surface">
              <Image src="/images/magic-coils-logo.png" alt="Magic Coils" width={100} height={50} className="h-10 w-auto drop-shadow-sm" />
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
    </>
  );
}
