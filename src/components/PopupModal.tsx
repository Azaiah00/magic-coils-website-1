"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Check } from "lucide-react";

/**
 * localStorage key + cooldown window for popup throttling.
 *
 * We track the popup with a single timestamp instead of a counter:
 * after it shows once, we don't show it again for a full week. This
 * covers the once-per-week cap directly and avoids needing a separate
 * count field. Old visitors with the previous `magic_coils_exit_intent_count`
 * key in localStorage are unaffected — that key is just orphaned.
 */
const LAST_SHOWN_KEY = "magic_coils_popup_last_shown";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Throttle to once per week regardless of which trigger fires.
    const lastShown = parseInt(localStorage.getItem(LAST_SHOWN_KEY) || "0", 10);
    if (lastShown && Date.now() - lastShown < WEEK_MS) {
      return;
    }

    setIsDismissed(false);

    // Single guard so whichever trigger wins first (exit-intent vs
    // scroll vs timer), the others quietly no-op.
    let triggered = false;
    const markTriggered = () => {
      if (triggered) return;
      triggered = true;
      localStorage.setItem(LAST_SHOWN_KEY, String(Date.now()));
      setIsOpen(true);
    };

    // Desktop trigger: mouse leaves toward browser chrome.
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return;
      markTriggered();
    };

    // Mobile trigger #1: visitor scrolls past 50% of the page.
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPct = window.scrollY / docHeight;
      if (scrollPct >= 0.5) markTriggered();
    };

    // Mobile trigger #2: 25 seconds after page load. Covers visitors
    // who barely scroll but linger reading (mobile-only behavior).
    const timerTrigger = setTimeout(markTriggered, 25_000);

    // 10s grace period before any listener is active so we don't
    // ambush brand-new visitors before they've seen anything.
    const activationTimer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 10_000);

    return () => {
      clearTimeout(timerTrigger);
      clearTimeout(activationTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Source is "popup" so MailerLite reports attribute popup signups vs /welcome.
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup" }),
      });

      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
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
                        Join the <br />
                        <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent drop-shadow-sm">
                          Crowned Community
                        </span>
                      </h2>

                      <p className="font-sans text-white/80 text-sm lg:text-base mb-8 max-w-sm mx-auto font-light leading-relaxed">
                        Get textured-hair routine education, product updates, and new-release news in your inbox.
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
                          {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join the Community"}
                        </button>
                        {status === "error" && (
                          <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
                        )}
                      </form>

                      <button
                        onClick={handleClose}
                        className="mt-6 text-white/50 hover:text-white text-xs font-medium tracking-wide underline underline-offset-4 transition-colors"
                      >
                        Not right now.
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
                        You&apos;re on the list.
                      </h2>
                      <p className="font-sans text-white/70 text-sm mb-8">
                        Watch your inbox for routine education, product news, and new releases.
                      </p>

                      <button
                        type="button"
                        onClick={handleClose}
                        className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-5 py-4 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform duration-300"
                      >
                        Continue Shopping
                      </button>
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
