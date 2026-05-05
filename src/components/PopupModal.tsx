"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Check, Copy } from "lucide-react";
import Link from "next/link";

/** Max times we ever show the exit popup (across visits); user asked to slow it down, so we use 1. */
const MAX_EXIT_POPUPS_LIFETIME = 1;

/** localStorage key: number of times the exit offer was shown. */
const EXIT_COUNT_KEY = "magic_coils_exit_intent_count";

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  // After we show (or user dismisses) on this tab session, do not trigger again until a full reload.
  const exitHandledThisTabRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const count = parseInt(localStorage.getItem(EXIT_COUNT_KEY) || "0", 10);
    if (count >= MAX_EXIT_POPUPS_LIFETIME) {
      return;
    }

    // Ready to show chrome only if we might still trigger exit intent
    const initTimer = setTimeout(() => {
      setIsDismissed(false);
    }, 0);

    /**
     * Exit intent only (mouse leaves toward the browser chrome — desktop).
     * To "slow it down", we add a 10 second delay before the listener is even active.
     */
    let listenerAdded = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (exitHandledThisTabRef.current) return;
      if (e.clientY > 10) return;

      const c = parseInt(localStorage.getItem(EXIT_COUNT_KEY) || "0", 10);
      if (c >= MAX_EXIT_POPUPS_LIFETIME) return;

      exitHandledThisTabRef.current = true;
      localStorage.setItem(EXIT_COUNT_KEY, String(c + 1));
      setIsOpen(true);
    };

    const delayTimer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      listenerAdded = true;
    }, 10000); // 10 seconds before exit intent becomes active

    return () => {
      clearTimeout(initTimer);
      clearTimeout(delayTimer);
      if (listenerAdded) {
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit_intent_popup" }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("MAGICTEN");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
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
              <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>

              <div className="relative z-10 flex flex-col items-center w-full">
                <AnimatePresence mode="wait">
                  {status !== "success" ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col items-center"
                    >
                      <span className="text-accent text-xs font-bold tracking-widest uppercase mb-4">
                        Wait! Before you go...
                      </span>

                      <h2 className="font-serif text-4xl lg:text-5xl text-white mb-2 leading-tight">
                        The <br />
                        <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent drop-shadow-sm">
                          Magic Ten
                        </span>
                      </h2>

                      <p className="font-sans text-white/80 text-sm lg:text-base mb-8 max-w-sm mx-auto font-light leading-relaxed">
                        Treat your curls like royalty. Enter your email to unlock <strong>10% off</strong> your first purchase of our professional formulas.
                      </p>

                      <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-4"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full bg-white/10 border border-accent/30 text-white px-5 py-4 text-sm placeholder:text-white/50 focus:outline-none focus:border-accent focus:bg-white/20 transition-all duration-300"
                          required
                          disabled={status === "loading"}
                        />
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-5 py-4 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100"
                        >
                          {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Claim My 10%"}
                        </button>
                        {status === "error" && (
                          <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
                        )}
                      </form>

                      <button
                        onClick={handleClose}
                        className="mt-6 text-white/50 hover:text-white text-xs font-medium tracking-wide underline underline-offset-4 transition-colors"
                      >
                        No thanks, I&apos;ll pay full price.
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                        <Check className="w-8 h-8 text-accent" />
                      </div>
                      <h2 className="font-serif text-3xl text-white mb-4">
                        Check your email — your code is on its way.
                      </h2>
                      <p className="font-sans text-white/70 text-sm mb-8">
                        Or copy it right here to use immediately:
                      </p>

                      <div className="w-full flex items-center justify-between bg-white/5 border border-accent/40 p-4 mb-8">
                        <span className="font-mono text-2xl tracking-widest text-accent font-bold">MAGICTEN</span>
                        <button 
                          onClick={handleCopy}
                          className="p-2 hover:bg-white/10 rounded transition-colors text-white"
                          aria-label="Copy code"
                        >
                          {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>

                      <Link 
                        href="/?discount_code=MAGICTEN"
                        onClick={handleClose}
                        className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-5 py-4 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform duration-300"
                      >
                        Shop Now & Apply Code
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
