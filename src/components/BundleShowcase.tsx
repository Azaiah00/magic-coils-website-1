"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, Truck, Heart, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { abbreviateReviewerName, googleReviews } from "@/data/reviews";

// Locked product data
const BUNDLES = [
  {
    slug: "bundle-2-strand-twist",
    name: "The Magic Coils 2 Strand Twist",
    tagline: "For twist-outs, defined coils, and styling days.",
    price: 50.00,
    originalPrice: 75.80,
    savings: 25.80,
    savingsPct: 34,
    hero: "/images/bundle-2-strand-twist-new.png",
    badge: "MOST POPULAR",
    contents: [
      { name: "3-In-1 Leave-In Treatment", size: "8.45 oz", individual: 16.95 },
      { name: "Honey & Argan Custard",     size: "8.45 oz", individual: 16.95 },
      { name: "Control Foam Wrap Mousse",  size: "7.44 oz", individual: 16.95 },
      { name: "Strengthening Serum",       size: "4.05 oz", individual: 24.95 }
    ],
    benefits: [
      "Defines coils without crunch or flake",
      "Layered routine for twists and twist-outs",
      "Lightweight enough for daily refresh",
      "Created for textured-hair styling routines"
    ]
  },
  {
    slug: "bundle-magic-press",
    name: "Professional Magic Press",
    tagline: "A complete wash-to-finish silk press routine.",
    price: 100.00,
    originalPrice: 151.75,
    savings: 51.75,
    savingsPct: 34,
    hero: "/images/bundle-magic-press-new.png",
    badge: "BEST VALUE",
    contents: [
      { name: "Peppermint Detox Shampoo",   size: "33.8 oz", individual: 33.95 },
      { name: "Intense Hydration Shampoo",  size: "33.8 oz", individual: 26.95 },
      { name: "Moisture Rich Conditioner",  size: "33.8 oz", individual: 31.95 },
      { name: "3-In-1 Leave-In Treatment",  size: "33.8 oz", individual: 33.95 },
      { name: "Honey & Argan Serum",        size: "4.05 oz", individual: 24.95 }
    ],
    benefits: [
      "Five products designed to be used as one routine",
      "Wash, condition, prep, and finish in one set",
      "Professional sizes for frequent wash days",
      "Made for salon and at-home silk press routines"
    ]
  }
];

const FAQS = [
  { q: "Which bundle should I choose?", a: "Not sure what your curls need? Take the Coil Crown Quiz to get matched." },
  { q: "Can I use these bundles on color-treated hair?", a: "Check the complete ingredient list on each product and ask your colorist before adding a new cleanser or styling product to a color-maintenance routine." },
  { q: "How long do these bundles last?", a: "Usage varies by hair length, density, routine, and how many people use the products. Product sizes are listed with each bundle so you can compare them before ordering." },
  { q: "Can I customize a bundle?", a: "Not yet — but taking the Coil Crown Quiz will build you a personalized 2-product starter routine." },
  { q: "Do you offer subscriptions?", a: "Subscriptions are not currently available. Join the email list for product and restock updates." },
  { q: "What's your return policy?", a: "Unopened, unused products may be returned within 14 days of delivery, less original shipping costs. See the full Return Policy or email info@magiccoils.net before sending anything back." }
];

export default function BundleShowcase() {
  const [activeBundleIndex, setActiveBundleIndex] = useState(0); // for mobile sticky cart
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const bundleCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Pixel Tracking for ViewContent
  useEffect(() => {
    // Send tracking events for page load
    try {
      // Example standard track call
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && (window as any).fbq) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).fbq('track', 'ViewContent', {
          content_type: 'product_group',
          content_ids: BUNDLES.map(b => b.slug),
          value: BUNDLES.reduce((acc, b) => acc + b.price, 0)
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  // Scroll Tracking for Mobile Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      // Only track if we are past the grid top
      if (rect.top > window.innerHeight) {
        setActiveBundleIndex(-1); // hidden
        return;
      }
      
      // Find which bundle is most visible
      let bestIdx = 0;
      let bestVisibleArea = 0;
      
      bundleCardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const eRect = el.getBoundingClientRect();
        // Visible height in viewport
        const visibleTop = Math.max(0, eRect.top);
        const visibleBottom = Math.min(window.innerHeight, eRect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        if (visibleHeight > bestVisibleArea) {
          bestVisibleArea = visibleHeight;
          bestIdx = idx;
        }
      });
      
      // If we've scrolled past the bundle grid entirely, maybe keep showing the last one or hide it
      // Let's just always show the best matching one once we enter the grid
      setActiveBundleIndex(bestIdx);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDetails = (slug: string) => {
    setExpandedDetails(prev => ({...prev, [slug]: !prev[slug]}));
  };

  // Review Carousel State
  const [currentReview, setCurrentReview] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % googleReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => setCurrentReview(p => (p + 1) % googleReviews.length);
  const prevReview = () => setCurrentReview(p => (p - 1 + googleReviews.length) % googleReviews.length);

  return (
    <>
      <section className="py-24 bg-primary relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[150px] -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#BF953F]/20 rounded-full blur-[150px] translate-x-1/2"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
              Curated Systems
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
              The <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">Magic Bundles</span>
            </h1>
            <p className="font-sans text-lg text-white/80 leading-relaxed font-light">
              Curated product routines for silk presses, twists, coils, and textured-hair styling days.
            </p>
          </motion.div>

          {/* Bridge CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-surface/50 border border-accent/30 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-20 shadow-2xl backdrop-blur-sm"
          >
            <div className="text-left flex-1">
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">Not sure which bundle is right for your hair?</h3>
              <p className="text-white/70 font-light font-sans">Take the 60-second Coil Crown quiz and we&apos;ll match you.</p>
            </div>
            <Link 
              href="/quiz" 
              className="whitespace-nowrap flex items-center gap-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-8 py-4 text-sm font-bold tracking-widest uppercase transition-transform hover:scale-105"
            >
              Take the Quiz <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Bundles Grid */}
          <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start text-left max-w-7xl mx-auto">
            {BUNDLES.map((bundle, idx) => (
              <motion.div
                key={bundle.slug}
                ref={el => { bundleCardRefs.current[idx] = el; }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + (idx * 0.1) }}
                className="group relative bg-white border-2 border-transparent hover:border-accent transition-colors duration-500 overflow-hidden flex flex-col shadow-2xl text-primary"
              >
                {/* Badge */}
                <div className="absolute top-4 right-0 z-20">
                  <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-4 py-1.5 text-xs font-bold tracking-widest uppercase shadow-lg">
                    {bundle.badge}
                  </span>
                </div>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-surface/5 flex items-center justify-center p-8 overflow-hidden">
                  <Image
                    src={bundle.hero}
                    alt={bundle.name}
                    fill
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 p-6"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">
                    {bundle.name}
                  </h2>
                  <p className="text-primary/70 font-sans text-sm mb-6">{bundle.tagline}</p>
                  
                  {/* High-Impact Pricing Block */}
                  <div className="space-y-2 mb-8 pb-8 border-b border-surface/50">
                    <p className="text-primary/50 text-sm line-through">
                      Bought separately: ${bundle.originalPrice.toFixed(2)}
                    </p>
                    <p className="text-primary text-4xl font-serif font-medium">
                      ${bundle.price.toFixed(2)}
                    </p>
                    <span className="inline-block bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                      Save ${bundle.savings.toFixed(2)} &middot; {bundle.savingsPct}% off
                    </span>
                  </div>

                  {/* Expandable Value Breakdown */}
                  <div className="mb-8">
                    <button 
                      onClick={() => toggleDetails(bundle.slug)}
                      className="flex items-center justify-between w-full text-left font-serif text-xl text-primary mb-4 focus:outline-none"
                    >
                      <span>What&apos;s inside &amp; what it&apos;s worth</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${expandedDetails[bundle.slug] ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedDetails[bundle.slug] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-surface/10 p-5 rounded font-sans text-sm font-light space-y-3">
                            {bundle.contents.map((item, i) => (
                              <div key={i} className="flex justify-between items-end border-b border-primary/10 pb-2">
                                <span className="text-primary/80 pr-4">{item.name} <span className="text-xs opacity-70">({item.size})</span></span>
                                <span className="text-primary font-medium whitespace-nowrap">${item.individual.toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between items-center pt-3 font-medium">
                              <span className="text-primary/60">Total:</span>
                              <span className="text-primary line-through">${bundle.originalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1 font-medium">
                              <span className="text-primary">Bundle Price:</span>
                              <span className="text-primary">${bundle.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1 font-bold text-accent">
                              <span>YOU SAVE:</span>
                              <span>${bundle.savings.toFixed(2)}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6">
                    <button
                      type="button"
                      disabled
                      className="flex-1 bg-primary/60 text-white py-4 text-sm font-bold tracking-widest uppercase cursor-not-allowed shadow-xl text-center"
                    >
                      Online Checkout Coming Soon
                    </button>
                    <Link
                      href="/shop"
                      className="flex-1 border border-primary px-5 py-4 text-center text-sm font-bold tracking-widest uppercase text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      Shop Products
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Band */}
      <section className="bg-surface py-16 border-y border-accent/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 text-center items-start">
            <div className="flex flex-col items-center p-4">
              <Heart className="w-8 h-8 text-accent mb-4" strokeWidth={1.5} />
              <h4 className="font-serif text-lg text-primary mb-2">Black-Owned & Independent</h4>
              <p className="font-sans text-sm text-primary/70 font-light">Founded by Antwun Wilson under Hair For You LLC.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Truck className="w-8 h-8 text-accent mb-4" strokeWidth={1.5} />
              <h4 className="font-serif text-lg text-primary mb-2">Shopify-Powered Checkout</h4>
              <p className="font-sans text-sm text-primary/70 font-light">Complete payment through the connected Shopify store.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Star className="w-8 h-8 text-accent mb-4" strokeWidth={1.5} />
              <h4 className="font-serif text-lg text-primary mb-2">Complete Routines</h4>
              <p className="font-sans text-sm text-primary/70 font-light">Shop products grouped by a clear styling goal.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <ShieldCheck className="w-8 h-8 text-accent mb-4" strokeWidth={1.5} />
              <h4 className="font-serif text-lg text-primary mb-2">Clear Return Policy</h4>
              <p className="font-sans text-sm text-primary/70 font-light">Unopened products may be returned within 14 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Carousel */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl text-primary mb-2">Crown Reviews</h2>
              <p className="font-sans text-primary/60">Verified public reviews from Google.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={prevReview} className="p-3 border border-surface text-primary hover:bg-primary hover:text-white transition-colors rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextReview} className="p-3 border border-surface text-primary hover:bg-primary hover:text-white transition-colors rounded-full">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-surface/30 p-8 md:p-12 border border-accent/20 rounded-xl"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
                </div>
                <p className="font-sans text-lg md:text-xl text-primary/80 font-light italic mb-8 max-w-4xl leading-relaxed">
                  &ldquo;{googleReviews[currentReview].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent font-serif text-xl">
                    {googleReviews[currentReview].reviewer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-primary">{abbreviateReviewerName(googleReviews[currentReview].reviewer)} <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full ml-2 font-normal">Google review</span></p>
                    <p className="text-sm text-primary/60">{googleReviews[currentReview].date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-2 mt-8 md:hidden">
              {googleReviews.map((_, i) => (
                <button key={i} onClick={() => setCurrentReview(i)} className={`w-2 h-2 rounded-full transition-colors ${i === currentReview ? 'bg-accent' : 'bg-surface'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-background border-t border-surface">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-serif text-4xl text-primary mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-white border border-surface rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-serif text-xl text-primary focus:outline-none">
                  {faq.q}
                  <span className="transition group-open:rotate-180 text-accent">
                    <ChevronDown className="w-6 h-6" />
                  </span>
                </summary>
                <div className="p-6 pt-0 font-sans text-primary/70 font-light leading-relaxed">
                  {faq.q.includes("Which bundle should I choose") ? (
                    <p>Not sure what your curls need? <Link href="/quiz" className="text-accent underline hover:text-primary">Take the Coil Crown Quiz</Link> to get matched.</p>
                  ) : (
                    <p>{faq.a}</p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Add To Cart */}
      <AnimatePresence>
        {activeBundleIndex >= 0 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-accent/20 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="font-serif text-sm text-primary">{BUNDLES[activeBundleIndex].name}</span>
              <span className="font-bold text-accent">${BUNDLES[activeBundleIndex].price.toFixed(2)}</span>
            </div>
            <Link
              href="/shop"
              className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-6 py-3 text-xs font-bold tracking-widest uppercase shadow-lg whitespace-nowrap"
            >
              Shop Products
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
