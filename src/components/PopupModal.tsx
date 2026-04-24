"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("magic_coils_popup_seen");
    
    if (hasSeenPopup) {
      return;
    }

    // Set it to not dismissed only after we confirm they haven't seen it
    // Using a timeout of 0 avoids the synchronous setState in effect warning
    const initTimer = setTimeout(() => {
      setIsDismissed(false);
    }, 0);
    
    // 1. Time-delayed intent (show after 20 seconds)
    const popupTimer = setTimeout(() => {
      setIsOpen(true);
    }, 20000);

    // 2. Exit intent (mouse leaves the top of the viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(popupTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // When the modal opens, mark it as seen in the session
  useEffect(() => {
    if (isOpen) {
      sessionStorage.setItem("magic_coils_popup_seen", "true");
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 border border-accent/20"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur-md rounded-full text-primary hover:text-accent hover:bg-white transition-colors duration-300"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Image (Hidden on very small screens) */}
            <div className="hidden md:block w-1/2 relative min-h-[500px]">
              <Image
                src="/images/model-bathroom.png"
                alt="Magic Coils Model"
                fill
                className="object-cover object-center"
              />
              {/* Gradient Overlay to blend into the right side */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/90"></div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 relative bg-primary flex flex-col justify-center p-10 md:p-12 lg:p-16 text-center">
              {/* Subtle Damask Pattern Background */}
              <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/promo-card.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

              <div className="relative z-10 flex flex-col items-center">
                <span className="text-accent text-xs font-bold tracking-widest uppercase mb-4">
                  Wait! Before you go...
                </span>
                
                <h2 className="font-serif text-4xl lg:text-5xl text-white mb-2 leading-tight">
                  The <br/>
                  <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent drop-shadow-sm">Magic Ten</span>
                </h2>
                
                <p className="font-sans text-white/80 text-sm lg:text-base mb-8 max-w-sm mx-auto font-light leading-relaxed">
                  Treat your curls like royalty. Enter your email to unlock <strong>10% off</strong> your first purchase of our professional formulas.
                </p>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle email signup logic here
                    handleClose();
                  }} 
                  className="w-full flex flex-col gap-4"
                >
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-white/10 border border-accent/30 text-white px-5 py-4 text-sm placeholder:text-white/50 focus:outline-none focus:border-accent focus:bg-white/20 transition-all duration-300"
                    required
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-5 py-4 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform duration-300"
                  >
                    Claim My 10%
                  </button>
                </form>

                <button 
                  onClick={handleClose}
                  className="mt-6 text-white/50 hover:text-white text-xs font-medium tracking-wide underline underline-offset-4 transition-colors"
                >
                  No thanks, I&apos;ll pay full price.
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
