"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import Image from "next/image";

const questions = [
  {
    id: 1,
    question: "What is your natural curl pattern?",
    options: ["Wavy (Type 2)", "Curly (Type 3)", "Coily (Type 4)"],
  },
  {
    id: 2,
    question: "What is your primary hair concern?",
    options: ["Dryness & Moisture", "Definition & Frizz", "Damage & Breakage", "Scalp Health"],
  },
  {
    id: 3,
    question: "How often do you use heat styling?",
    options: ["Rarely / Never", "A few times a month", "Weekly"],
  }
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [currentStep]: option });
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsComplete(true);
      }
    }, 400);
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <PageTransition>
        <div className="flex-1 flex items-center justify-center py-24 bg-surface relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full border border-primary/5 rotate-12"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] rounded-full border border-primary/5 -rotate-12"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto bg-white p-10 md:p-16 shadow-2xl relative min-h-[500px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-6">
                      Step {currentStep + 1} of {questions.length}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10 leading-tight">
                      {questions[currentStep].question}
                    </h2>
                    <div className="w-full flex flex-col gap-4">
                      {questions[currentStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          className={`w-full p-5 border text-left font-sans text-lg transition-all duration-300 ${
                            answers[currentStep] === option 
                              ? "border-accent bg-accent/5 text-primary" 
                              : "border-surface hover:border-primary text-primary/70 hover:text-primary"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center"
                  >
                    <h2 className="font-serif text-4xl text-primary mb-6">Your Magic Routine</h2>
                    <p className="font-sans text-primary/70 mb-10">
                      Based on your answers, we&apos;ve curated the perfect formulations to nourish, define, and protect your crown.
                    </p>
                    
                    <div className="w-full bg-surface p-6 mb-8 flex items-center gap-6 text-left">
                      <div className="relative w-24 h-24 bg-white flex-shrink-0">
                        <Image src="/images/leave-in.png" alt="Leave In" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs text-accent uppercase tracking-widest mb-1 font-semibold">Step 1: Hydrate</p>
                        <h3 className="font-serif text-xl text-primary mb-1">3-in-1 Leave In Treatment</h3>
                        <p className="font-sans text-sm text-primary/70">Argan Oil + Vitamin C</p>
                      </div>
                    </div>

                    <div className="w-full bg-surface p-6 mb-10 flex items-center gap-6 text-left">
                      <div className="relative w-24 h-24 bg-white flex-shrink-0">
                        <Image src="/images/control-foam.png" alt="Foam" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs text-accent uppercase tracking-widest mb-1 font-semibold">Step 2: Define</p>
                        <h3 className="font-serif text-xl text-primary mb-1">Control Foam Wrap Lotion</h3>
                        <p className="font-sans text-sm text-primary/70">Setting Mousse</p>
                      </div>
                    </div>

                    <Link
                      href="/shop"
                      className="w-full bg-primary text-white py-5 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300 shadow-xl"
                    >
                      Shop Your Routine
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
