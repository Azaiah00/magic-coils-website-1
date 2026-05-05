"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Copy, Check } from "lucide-react";

function WelcomeForm() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "direct";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
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

  return (
    <div className="w-full max-w-[480px] mx-auto bg-primary border border-accent/20 p-8 md:p-12 shadow-2xl relative z-10 overflow-hidden">
      {/* Subtle Damask Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}
      ></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <Link href="/" className="mb-8 block hover:opacity-80 transition-opacity">
          <Image 
            src="/images/magic-coils-logo.png" 
            alt="Magic Coils Logo" 
            width={160} 
            height={80} 
            className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          />
        </Link>

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
              <h1 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
                Unlock 10% Off <br/> Your First Order
              </h1>
              <p className="text-accent text-sm font-bold tracking-widest uppercase mb-6">
                Crowned in Magic.
              </p>
              <p className="font-sans text-white/80 text-base mb-8 max-w-sm mx-auto font-light leading-relaxed">
                Drop your email and we&apos;ll send your code instantly.
              </p>

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="w-full bg-white/10 border border-accent/30 text-white px-5 py-4 text-base placeholder:text-white/50 focus:outline-none focus:border-accent focus:bg-white/20 transition-all duration-300"
                  required
                  disabled={status === "loading"}
                />
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-5 py-4 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Me My Code"}
                </button>
                {status === "error" && (
                  <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
                )}
              </form>
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
              <p className="font-sans text-white/70 mb-8">
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
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-5 py-4 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform duration-300"
              >
                Shop Now & Apply Code
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-white/40 text-xs font-medium tracking-wide">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

export default function WelcomeClient() {
  return (
    <main className="min-h-screen flex items-center justify-center w-full bg-primary relative overflow-hidden p-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Suspense fallback={<div className="w-full max-w-[480px] h-[500px] bg-primary border border-accent/20 flex items-center justify-center"><Loader2 className="w-8 h-8 text-accent animate-spin" /></div>}>
        <WelcomeForm />
      </Suspense>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Offer",
            "name": "10% Off First Order",
            "description": "Unlock 10% off your first Magic Coils order by subscribing to our newsletter.",
            "itemOffered": {
              "@type": "Product",
              "name": "Magic Coils Haircare Products",
              "brand": {
                "@type": "Brand",
                "name": "Magic Coils"
              }
            },
            "eligibleCustomerType": "NewCustomer",
            "availability": "https://schema.org/InStock",
            "url": "https://magiccoils.net/welcome"
          })
        }}
      />
    </main>
  );
}
