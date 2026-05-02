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

// Hair Types Data (Step 1)
const hairTypes = [
  {
    id: "type-1",
    label: "Type I",
    title: "Straight to Minimal Wave",
    desc: "Sleek hair with subtle, gentle waves.",
    image: "/images/hair-type-1.png",
  },
  {
    id: "type-2",
    label: "Type II",
    title: "Open Wave",
    desc: "Loose, relaxed S-shaped curve pattern.",
    image: "/images/hair-type-2.png",
  },
  {
    id: "type-3",
    label: "Type III",
    title: "Wavy",
    desc: "Distinct, uniform S-shaped curves throughout.",
    image: "/images/hair-type-3.png",
  },
  {
    id: "type-4",
    label: "Type IV",
    title: "Curly",
    desc: "Defined mix of distinct loop, spiral, and corkscrew curls.",
    image: "/images/hair-type-4.png",
  },
  {
    id: "type-5",
    label: "Type V",
    title: "Very Curly",
    desc: "Abundant coils forming into tighter defined coils.",
    image: "/images/hair-type-5.png",
  },
  {
    id: "type-6",
    label: "Type VI",
    title: "Coiled",
    desc: "Loose Afro texture, with medium coils close to the scalp.",
    image: "/images/hair-type-6.png",
  },
  {
    id: "type-7",
    label: "Type VII",
    title: "Very Coiled",
    desc: "Dense Afro with distinct, tight, springy coils.",
    image: "/images/hair-type-7.png",
  },
  {
    id: "type-8",
    label: "Type VIII",
    title: "Zig-Zag Coiled",
    desc: "Extremely tight Afro with intricate, interlocking zig-zag coiled patterns.",
    image: "/images/hair-type-8.png",
  },
];

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
      "Heat Protection & Silk Press"
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
      "Protective Styles"
    ],
  }
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  
  const { addItem, openCart } = useCart();

  const handleOptionSelect = (option: string) => {
    const newAnswers = { ...answers, [currentStep]: option };
    setAnswers(newAnswers);
    
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
    
    // Logic Engine
    const type = finalAnswers[0]; // e.g., "type-1" to "type-8"
    const goal = finalAnswers[1];
    const style = finalAnswers[2];
    
    const recs: Product[] = [];
    
    const typeNum = parseInt(type.split("-")[1]);
    
    // 1. Base Bundle Recommendation
    // Types I-III, or Silk Press style, or Heat Protection goal -> Magic Press
    if (typeNum <= 3 || style === "Silk Press / Blowout" || goal === "Heat Protection & Silk Press") {
      const magicPress = products.find(p => p.id === "bundle-magic-press");
      if (magicPress) recs.push(magicPress);
    } else {
      // Types IV-VIII, or Twist-Outs -> 2 Strand Twist
      const twistBundle = products.find(p => p.id === "bundle-2-strand-twist");
      if (twistBundle) recs.push(twistBundle);
    }
    
    // 2. Supplemental Products based on Goal
    if (goal === "Scalp Detox & Health") {
      const detox = products.find(p => p.id === "peppermint-shampoo");
      if (detox && !recs.some(r => r.id === detox.id)) recs.push(detox);
    } else if (goal === "Maximum Moisture & Hydration") {
      const moisture = products.find(p => p.id === "moisture-conditioner");
      if (moisture && !recs.some(r => r.id === moisture.id)) recs.push(moisture);
    } else if (goal === "Ultimate Curl Definition") {
      const custard = products.find(p => p.id === "curl-custard");
      if (custard && !recs.some(r => r.id === custard.id)) recs.push(custard);
    }
    
    setRecommendedProducts(recs.slice(0, 3));
    
    setTimeout(() => {
      setIsCalculating(false);
      setIsComplete(true);
    }, 2500); // 2.5s calculating animation
  };

  const handleAddToCart = (product: Product) => {
    addItem(productToCartLine(product, 1));
    openCart();
  };

  const progress = ((currentStep) / questions.length) * 100;

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

          {/* Progress Bar */}
          {!isComplete && !isCalculating && (
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
                    Based on your unique texture and goals, we&apos;ve curated the perfect formulations to nourish, define, and protect your crown.
                  </p>
                  
                  <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">
                    {recommendedProducts.map((product, idx) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="w-full bg-white border border-primary/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 text-left shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative w-48 h-48 bg-surface flex-shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-accent uppercase tracking-widest mb-2 font-bold">
                            {idx === 0 ? "Primary Recommendation" : "Perfect Pairing"}
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

                  <button
                    onClick={() => {
                      setIsComplete(false);
                      setCurrentStep(0);
                      setAnswers({});
                    }}
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
