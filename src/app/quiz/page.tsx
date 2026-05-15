// FILE: src/app/quiz/page.tsx
// READY-TO-PASTE replacement for the existing hair quiz page
// See: Magic_Coils_Dev_Brief_4_Hair_Quiz_Upgrade.md
//
// CHANGES vs. the previous file:
//   1. Smarter recommendation engine — 3-stage routine (Cleanse → Treat → Style),
//      uses all 3 quiz answers to build a 3–4 product personalized routine.
//   2. Email gate between Step 3 and Results — captures completers into MailerLite
//      with source=quiz + hair_type tag for segmentation.
//   3. Bundle upsell — Two Strand Twist or Magic Press shown as a separate
//      "save $X" card when the styling answer matches.
//   4. quiz_complete dataLayer event for GTM (GA4 / Meta / TikTok pickup).
//   5. Preserves the existing UX — framer-motion animations, brand styling,
//      8-type texture grid, 2.5s calculating animation.

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import Image from "next/image";
import { products, productToCartLine, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Check, Loader2, ShoppingBag } from "lucide-react";

// ============================================================================
// Hair Types Data (Step 1)
// ============================================================================
const hairTypes = [
  { id: "type-1", label: "Type I",   title: "Straight to Minimal Wave", desc: "Sleek hair with subtle, gentle waves.",                                            image: "/images/hair-type-1.png" },
  { id: "type-2", label: "Type II",  title: "Open Wave",                desc: "Loose, relaxed S-shaped curve pattern.",                                            image: "/images/hair-type-2.png" },
  { id: "type-3", label: "Type III", title: "Wavy",                     desc: "Distinct, uniform S-shaped curves throughout.",                                     image: "/images/hair-type-3.png" },
  { id: "type-4", label: "Type IV",  title: "Curly",                    desc: "Defined mix of distinct loop, spiral, and corkscrew curls.",                        image: "/images/hair-type-4.png" },
  { id: "type-5", label: "Type V",   title: "Very Curly",               desc: "Abundant coils forming into tighter defined coils.",                                image: "/images/hair-type-5.png" },
  { id: "type-6", label: "Type VI",  title: "Coiled",                   desc: "Loose Afro texture, with medium coils close to the scalp.",                         image: "/images/hair-type-6.png" },
  { id: "type-7", label: "Type VII", title: "Very Coiled",              desc: "Dense Afro with distinct, tight, springy coils.",                                   image: "/images/hair-type-7.png" },
  { id: "type-8", label: "Type VIII", title: "Zig-Zag Coiled",          desc: "Extremely tight Afro with intricate, interlocking zig-zag coiled patterns.",        image: "/images/hair-type-8.png" },
];

// ============================================================================
// Quiz Questions
// ============================================================================
const questions = [
  {
    id: 1,
    type: "grid",
    question: "What is your natural coil or curl pattern?",
    subtitle: "Select the texture that most closely matches your crown.",
  },
  {
    id: 2,
    type: "list",
    question: "What is your primary hair goal?",
    subtitle: "What does your crown need most right now?",
    options: [
      "Maximum Moisture & Hydration",
      "Ultimate Curl Definition",
      "Scalp Detox & Health",
      "Heat Protection & Silk Press",
    ],
  },
  {
    id: 3,
    type: "list",
    question: "What is your go-to styling method?",
    subtitle: "How do you usually wear your crown?",
    options: [
      "Wash & Go",
      "Twist-Outs / Braids",
      "Silk Press / Blowout",
      "Protective Styles",
    ],
  },
];

// ============================================================================
// RECOMMENDATION ENGINE
// 3-stage routine (Cleanse → Treat → Style) with optional bundle upsell.
// Uses all three quiz answers to surface 3–4 personalized products from the
// full 10-product line. See Magic_Coils_Dev_Brief_4_Hair_Quiz_Upgrade.md
// ============================================================================
function buildRoutine(typeId: string, goal: string, style: string): {
  routine: Product[];
  bundleUpsell: Product | null;
} {
  // Texture index drives the wash-and-go branching: types I-III (1-3) take the
  // serum-only path because waves don't need stiff hold, just gloss + protection.
  const typeNum = parseInt(typeId.split("-")[1] || "0");
  const routineIds: string[] = [];

  // ---- STAGE 1: Cleanse (always 1 shampoo) ----
  // Peppermint Detox for scalp focus, heat prep, or silk press. Everyone else
  // gets the gentler Intense Hydration as their default cleanser.
  if (
    goal === "Scalp Detox & Health" ||
    goal === "Heat Protection & Silk Press" ||
    style === "Silk Press / Blowout"
  ) {
    routineIds.push("peppermint-shampoo");
  } else {
    routineIds.push("hydration-shampoo");
  }

  // ---- STAGE 2: Treat (conditioner + leave-in/treatment) ----
  // Moisture Rich Conditioner for everyone EXCEPT pure curl-definition focus
  // (those users get the custard in Stage 3 to take the conditioner's slot).
  if (goal !== "Ultimate Curl Definition") {
    routineIds.push("moisture-conditioner");
  }

  // 3-In-1 Leave-In Treatment for everyone EXCEPT heat-focused routines —
  // those need the Strengthening Serum slotted in here for heat protection.
  if (goal === "Heat Protection & Silk Press") {
    routineIds.push("strengthening-serum");
  } else {
    routineIds.push("leave-in-treatment");
  }

  // ---- STAGE 3: Style (one styling product based on how they style) ----
  if (style === "Wash & Go" || style === "Twist-Outs / Braids") {
    // Both wash-and-gos and twist-outs benefit from the curl custard
    // EXCEPT Type I-III wash-and-go users — waves don't need stiff hold,
    // just gloss + protection from the serum.
    if (style === "Wash & Go" && typeNum <= 3 && goal !== "Ultimate Curl Definition") {
      routineIds.push("strengthening-serum");
    } else {
      routineIds.push("curl-custard");
    }
  } else if (style === "Silk Press / Blowout") {
    // Strengthening Serum was already added in Stage 2 for Heat Protection goal.
    // If the goal was something else but style is Silk Press, add it here.
    if (!routineIds.includes("strengthening-serum")) {
      routineIds.push("strengthening-serum");
    }
  } else if (style === "Protective Styles") {
    routineIds.push("moisturizing-cream");
  }

  // ---- STAGE 4: Universal finishing oil (if room) ----
  // Strengthening Serum benefits virtually every routine. Add as the 4th
  // product if there's still a slot and it isn't already in the routine.
  if (!routineIds.includes("strengthening-serum") && routineIds.length < 4) {
    routineIds.push("strengthening-serum");
  }

  // Resolve product IDs into Product objects (cap at 4 so the results page
  // stays clean even if future logic changes try to push a 5th).
  const routine = routineIds
    .slice(0, 4)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  // ---- BUNDLE UPSELL (separate from the routine) ----
  // Shown as a "save $X" card when the styling answer matches a bundle.
  let bundleUpsell: Product | null = null;
  if (style === "Twist-Outs / Braids") {
    bundleUpsell = products.find((p) => p.id === "bundle-2-strand-twist") || null;
  } else if (style === "Silk Press / Blowout") {
    bundleUpsell = products.find((p) => p.id === "bundle-magic-press") || null;
  }

  return { routine, bundleUpsell };
}

// ============================================================================
// Main Quiz Page Component
// ============================================================================
export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [bundleUpsell, setBundleUpsell] = useState<Product | null>(null);

  // Email gate state
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "submitted">("idle");

  const { addItem, openCart } = useCart();

  const handleOptionSelect = (option: string) => {
    const newAnswers = { ...answers, [currentStep]: option };
    setAnswers(newAnswers);

    // Tiny pause so the selected-state animation has time to play before
    // we jump to the next step or kick off the calculation animation.
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        calculateResults(newAnswers);
      }
    }, 400);
  };

  const calculateResults = (finalAnswers: Record<number, string>) => {
    setIsCalculating(true);

    const typeId = finalAnswers[0];
    const goal = finalAnswers[1];
    const style = finalAnswers[2];

    const { routine, bundleUpsell: bundle } = buildRoutine(typeId, goal, style);
    setRecommendedProducts(routine);
    setBundleUpsell(bundle);

    setTimeout(() => {
      setIsCalculating(false);
      setShowEmailGate(true);

      // Fire quiz_complete to GTM dataLayer so we can forward to GA4 / Meta /
      // TikTok later without touching code. Email capture is initially false
      // here; a follow-up quiz_email_captured event fires after submit.
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "quiz_complete",
          hair_type: typeId,
          hair_goal: goal,
          styling_method: style,
          recommended_products: routine.map((p) => p.id),
          bundle_offered: bundle?.id || null,
          email_captured: false,
        });
      }
    }, 2500);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus("loading");

    const typeId = answers[0];

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "quiz",
          // hair_type passes through to MailerLite as a custom field
          // (see Brief #4 Part 4 + /api/subscribe/route.ts).
          hair_type: typeId,
        }),
      });

      // Mirror the capture into the dataLayer so analytics can attribute
      // the email back to the same quiz session.
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "quiz_email_captured",
          hair_type: typeId,
        });
      }
    } catch {
      // Silently fail — the visitor still sees their routine either way
      // so a network hiccup never blocks the value moment.
    } finally {
      setEmailStatus("submitted");
      // Reveal results after a short pause so the success state is visible.
      setTimeout(() => {
        setShowEmailGate(false);
        setIsComplete(true);
      }, 1200);
    }
  };

  const handleSkipEmailGate = () => {
    setShowEmailGate(false);
    setIsComplete(true);
  };

  const handleAddToCart = (product: Product) => {
    addItem(productToCartLine(product, 1));
    openCart();
  };

  const handleRetake = () => {
    setIsComplete(false);
    setShowEmailGate(false);
    setCurrentStep(0);
    setAnswers({});
    setEmail("");
    setEmailStatus("idle");
    setRecommendedProducts([]);
    setBundleUpsell(null);
  };

  const progress = (currentStep / questions.length) * 100;

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <PageTransition>
        <div className="flex-1 flex flex-col pt-24 pb-12 bg-surface relative overflow-hidden min-h-[80vh]">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full border border-primary/5 rotate-12"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] rounded-full border border-primary/5 -rotate-12"></div>
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
          </div>

          {/* Progress Bar — visible during questions only */}
          {!isComplete && !isCalculating && !showEmailGate && (
            <div className="w-full max-w-3xl mx-auto px-4 mb-8 relative z-20">
              <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="mt-2 text-right text-xs font-bold tracking-widest text-primary/50 uppercase">
                Step {currentStep + 1} of {questions.length}
              </div>
            </div>
          )}

          <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isCalculating ? (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center text-center max-w-md mx-auto py-20"
                >
                  <Loader2 className="w-16 h-16 text-accent animate-spin mb-8" />
                  <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                    Curating Your Routine...
                  </h2>
                  <p className="font-sans text-primary/70">
                    Analyzing your crown&apos;s unique needs to find the perfect Magic Coils formulations.
                  </p>
                </motion.div>
              ) : showEmailGate ? (
                <motion.div
                  key="emailgate"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center text-center max-w-xl mx-auto py-12 md:py-20"
                >
                  {emailStatus !== "submitted" ? (
                    <>
                      <span className="text-accent text-xs font-bold tracking-widest uppercase mb-4">
                        Your Results Are Ready
                      </span>
                      <h2 className="font-serif text-3xl md:text-5xl text-primary mb-4 leading-tight">
                        Your routine is ready{" "}
                        <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
                          👑
                        </span>
                      </h2>
                      <p className="font-sans text-base md:text-lg text-primary/70 mb-8 max-w-md mx-auto leading-relaxed">
                        Drop your email and we&apos;ll send your personalized Magic Coils routine
                        straight to your inbox &mdash; plus <strong className="text-primary">10% off</strong> your first order.
                      </p>

                      <form onSubmit={handleEmailSubmit} className="w-full max-w-md flex flex-col gap-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          disabled={emailStatus === "loading"}
                          className="w-full bg-white border border-primary/20 px-5 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={emailStatus === "loading"}
                          className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-8 py-4 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
                        >
                          {emailStatus === "loading" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            "Send Me My Routine"
                          )}
                        </button>
                      </form>

                      <button
                        type="button"
                        onClick={handleSkipEmailGate}
                        className="mt-6 text-xs font-medium tracking-wider text-primary/50 hover:text-primary underline underline-offset-4 transition-colors uppercase"
                      >
                        No thanks, just show me my routine
                      </button>

                      <p className="font-sans text-xs text-primary/40 mt-8 max-w-sm leading-relaxed">
                        No spam &mdash; unsubscribe anytime. By submitting, you agree to our{" "}
                        <Link href="/privacy" className="underline hover:text-accent">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                        <Check className="w-8 h-8 text-accent" />
                      </div>
                      <h2 className="font-serif text-3xl text-primary mb-3">
                        Check your inbox{" "}
                        <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
                          👑
                        </span>
                      </h2>
                      <p className="font-sans text-primary/70 mb-2 max-w-sm mx-auto leading-relaxed">
                        Your routine is on its way. Loading your recommendations...
                      </p>
                    </>
                  )}
                </motion.div>
              ) : !isComplete ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center max-w-5xl mx-auto w-full"
                >
                  <h2 className="font-serif text-3xl md:text-5xl text-primary mb-3 leading-tight">
                    {questions[currentStep].question}
                  </h2>
                  <p className="font-sans text-primary/60 mb-10 text-lg">
                    {questions[currentStep].subtitle}
                  </p>

                  {questions[currentStep].type === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      {hairTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleOptionSelect(type.id)}
                          className={`group relative flex flex-col text-left overflow-hidden border transition-all duration-300 ${
                            answers[currentStep] === type.id
                              ? "border-accent ring-1 ring-accent shadow-lg"
                              : "border-primary/10 hover:border-accent/50 hover:shadow-md bg-white"
                          }`}
                        >
                          <div className="relative w-full aspect-square overflow-hidden bg-primary/5">
                            <Image
                              src={type.image}
                              alt={type.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {answers[currentStep] === type.id && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[2px]">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                  <Check className="w-5 h-5 text-primary" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-4 bg-white flex-1 flex flex-col">
                            <span className="text-xs font-bold tracking-widest text-accent uppercase mb-1">{type.label}</span>
                            <h3 className="font-serif text-lg text-primary mb-1 leading-tight">{type.title}</h3>
                            <p className="text-xs text-primary/60 leading-relaxed hidden sm:block">{type.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
                      {questions[currentStep].options?.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          className={`w-full p-6 border text-left font-sans text-lg transition-all duration-300 flex items-center justify-between ${
                            answers[currentStep] === option
                              ? "border-accent bg-accent/5 text-primary shadow-md"
                              : "border-surface hover:border-primary/30 text-primary/70 hover:text-primary bg-white"
                          }`}
                        >
                          <span>{option}</span>
                          {answers[currentStep] === option && (
                            <Check className="w-5 h-5 text-accent" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center max-w-4xl mx-auto w-full"
                >
                  <span className="text-accent text-sm font-bold tracking-widest uppercase mb-4 block">
                    Your Results Are Ready
                  </span>
                  <h2 className="font-serif text-4xl md:text-6xl text-primary mb-6">
                    Your Magic Routine
                  </h2>
                  <p className="font-sans text-lg text-primary/70 mb-12 max-w-2xl mx-auto">
                    Based on your texture, goals, and styling preference, we&apos;ve curated{" "}
                    {recommendedProducts.length} formulation{recommendedProducts.length === 1 ? "" : "s"} to nourish, define,
                    and protect your crown.
                  </p>

                  {/* Recommended routine — one card per product, stacked vertically
                      so each step's label reads cleanly on mobile and desktop. */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">
                    {recommendedProducts.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="w-full bg-white border border-primary/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 text-left shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative w-48 h-48 bg-surface flex-shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-accent uppercase tracking-widest mb-2 font-bold">
                            {idx === 0
                              ? "Step 1 — Cleanse"
                              : idx === 1
                                ? "Step 2 — Condition"
                                : idx === 2
                                  ? "Step 3 — Treat"
                                  : "Step 4 — Style & Finish"}
                          </p>
                          <h3 className="font-serif text-2xl md:text-3xl text-primary mb-2">{product.name}</h3>
                          <p className="font-sans text-primary/70 mb-4">{product.subtitle}</p>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                            <span className="text-xl font-medium text-primary">${product.price.toFixed(2)}</span>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="group relative inline-flex items-center justify-center bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase overflow-hidden transition-colors duration-300 hover:bg-accent hover:text-primary w-full sm:w-auto"
                            >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Add to Cart
                            </button>
                            <Link
                              href={`/product/${product.id}`}
                              className="text-sm font-bold tracking-widest text-primary uppercase hover:text-accent transition-colors underline underline-offset-4"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bundle upsell — separate card with gold accent treatment so
                      it reads as an upgrade, not a replacement for the routine. */}
                  {bundleUpsell && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: recommendedProducts.length * 0.15 + 0.2 }}
                      className="w-full bg-gradient-to-br from-primary to-primary/95 border-2 border-accent text-white p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 text-left mb-12 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat' }} />
                      <div className="relative w-48 h-48 bg-white/10 flex-shrink-0 z-10">
                        <Image src={bundleUpsell.image} alt={bundleUpsell.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 relative z-10">
                        <p className="text-xs text-accent uppercase tracking-widest mb-2 font-bold">
                          Save with the Bundle
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{bundleUpsell.name}</h3>
                        <p className="font-sans text-white/80 mb-4">{bundleUpsell.subtitle}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                          <span className="text-2xl font-medium text-accent">${bundleUpsell.price.toFixed(2)}</span>
                          <button
                            onClick={() => handleAddToCart(bundleUpsell)}
                            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-8 py-3 text-sm font-bold tracking-widest uppercase overflow-hidden hover:scale-[1.02] transition-transform w-full sm:w-auto"
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Add Bundle to Cart
                          </button>
                          <Link
                            href={`/product/${bundleUpsell.id}`}
                            className="text-sm font-bold tracking-widest text-white uppercase hover:text-accent transition-colors underline underline-offset-4"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <button
                    onClick={handleRetake}
                    className="text-sm font-bold tracking-widest text-primary/50 uppercase hover:text-primary transition-colors"
                  >
                    Retake Quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
