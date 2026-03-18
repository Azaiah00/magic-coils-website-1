"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const faqs = [
  {
    question: "Are Magic Coils products safe for color-treated hair?",
    answer: "Yes! All of our formulations are sulfate-free, paraben-free, and designed to protect and extend the life of your color while maintaining optimal hydration."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within the continental US. Orders placed before 2 PM EST are processed the same day. You will receive a tracking number once your order ships."
  },
  {
    question: "Do you offer wholesale pricing for salons?",
    answer: "Absolutely. We love partnering with stylists. Please visit our Contact page and select 'Wholesale' as the subject, or email us directly at hairforyoullc@gmail.com with your salon details."
  },
  {
    question: "What is your return policy?",
    answer: "We stand behind the magic of our products. If you are not completely satisfied, you may return gently used products within 30 days of purchase for a full refund, minus shipping costs."
  },
  {
    question: "Are your products cruelty-free?",
    answer: "Yes, Magic Coils is 100% cruelty-free. We never test on animals, and we carefully source our ingredients from ethical suppliers."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <PageTransition>
        <div className="pt-24 pb-12 bg-surface">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-6xl text-primary mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-lg text-primary/70"
            >
              Everything you need to know about Magic Coils, our formulations, and our services.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-surface"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full py-8 flex justify-between items-center text-left group"
                >
                  <span className="font-serif text-2xl text-primary group-hover:text-accent transition-colors">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-primary/70 font-sans text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <p className="font-sans text-primary/70 mb-6">Still have questions?</p>
            <a href="/contact" className="inline-block border border-primary text-primary px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-primary hover:text-white transition-colors duration-300">
              Contact Support
            </a>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
