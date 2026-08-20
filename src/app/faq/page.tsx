"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const faqs = [
  {
    question: "What's in Magic Coils products that makes them different?",
    answer:
      "Magic Coils offers cleansers, conditioners, leave-ins, stylers, and a finishing serum designed to work as complete textured-hair routines. Ingredients vary by product, so review the complete ingredient list on each product page and package before use, especially if you have allergies or sensitivities.",
  },
  {
    question: "Are Magic Coils products safe for color-treated hair?",
    answer:
      "Color services and formulas vary. Check the ingredient list for the specific Magic Coils product you want to use and ask your colorist before changing your color-maintenance routine. Clarifying shampoos may be used less often depending on your stylist's guidance.",
  },
  {
    question:
      "Are Magic Coils products safe for chemically processed, relaxed, or transitioning hair?",
    answer:
      "Chemically processed hair can have different needs and sensitivities. Review the ingredient list and directions for each product, patch test first, and ask the professional who performed your chemical service if you are unsure whether a product fits your routine.",
  },
  {
    question: "Are Magic Coils products vegan or certified cruelty-free?",
    answer:
      "We are verifying certification and supplier documentation before making line-wide vegan or cruelty-free claims. For a current ingredient question, email info@magiccoils.net with the exact product name before ordering.",
  },
  {
    question: "How are Magic Coils products stored, and what's the shelf life?",
    answer:
      "Store products closed at room temperature and away from direct sunlight or excessive heat. Follow the lot, expiration, or period-after-opening information printed on the package. If that information is unclear, email info@magiccoils.net with the product name and lot code.",
  },
  {
    question: "Will Magic Coils work on my hair texture?",
    answer:
      "The Magic Coils line is built for textured hair across the full Type 3 through Type 4 spectrum — that's 3a wavy curls, 3b/3c spirals and corkscrews, 4a coils, 4b zig-zag patterns, and 4c tight coils. Locs, braids, twists, and silk-pressed hair are all part of the design. If you're unsure where your hair sits on the texture chart, take our 60-second Hair Quiz at magiccoils.net/quiz — it builds a routine recommendation specific to your hair pattern, scalp condition, and styling goals.",
  },
  {
    question: "Can I use Magic Coils on my children's hair?",
    answer:
      "Magic Coils products are not presented as children's products. Ask a pediatrician or dermatologist before using a new cosmetic product on a young child, review the complete ingredient list, keep products out of the eyes, and patch test first when appropriate.",
  },
  {
    question: "Can I use Magic Coils products on locs?",
    answer:
      "Several Magic Coils products can fit loc-care routines, but product choice and amount matter. Review the ingredients and directions, use lightweight amounts to avoid buildup, and ask your loctician which cleanser, moisturizer, or finishing product best fits your locs.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "We ship every order within 1–3 business days of confirmation. Standard transit time within the contiguous United States is 3–7 business days via USPS, UPS, or FedEx — destination-dependent. Orders over $75 ship free. Once your order ships, you'll receive a tracking email. We don't currently ship internationally.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We accept returns of unopened, unused products within 14 days of delivery for a full refund, less original shipping costs. Opened or used products are not eligible for return for hygiene reasons. To start a return, email info@magiccoils.net with your order number — we'll reply within 2 business days with a return authorization. Damaged or defective products are replaced or refunded at our cost (email photos to info@magiccoils.net within 7 days of delivery).",
  },
  {
    question: "What if my package is lost or arrives damaged?",
    answer:
      "If your package shows as delivered but you don't have it, first check with your neighbors and the carrier (USPS, UPS, or FedEx) — most lost-package claims have to be initiated by the recipient with the carrier directly. If your package is lost in transit (never marked delivered), email info@magiccoils.net and we'll work with the carrier to file a claim. If your order arrives damaged, email us within 7 days with photos of the damage and your order number — we'll replace or refund.",
  },
  {
    question: "Do you offer wholesale or distributor pricing for salons?",
    answer:
      "Yes. The Magic Coils Royal Court is the professional partner program for salons and independent stylists interested in carrying the line. To apply, visit magiccoils.net/distributor or email info@magiccoils.net with your business name, location, and products of interest. Current sizes, pricing, minimums, and partner benefits are confirmed during onboarding.",
  },
  {
    question: "How do I get listed as a Magic Coils stylist?",
    answer:
      "If you're a licensed professional stylist working with Magic Coils products in your salon or chair, you can apply to be listed on our Stylist Directory at magiccoils.net/directory. Email info@magiccoils.net with your name, salon name, address, phone, social handles, and a brief description of your specialty (silk press, natural styles, locs, braiding, etc.). We feature stylists across the country and update the directory monthly.",
  },
  {
    question: "Can I buy Magic Coils products in stores?",
    answer:
      "Not yet — for now, the full Magic Coils line is sold exclusively through magiccoils.net and through authorized salon partners listed in our Royal Court directory. We're actively expanding into select retail locations through 2026; subscribe to our email list at the bottom of any page to be the first to hear when we land in stores near you.",
  },
  {
    question: "Who founded Magic Coils?",
    answer:
      "Magic Coils was founded by Antwun Wilson, a hair distributor and the founder of Hair For You. The brand is operated by Hair For You LLC and focuses on product routines for textured hair. Read more at magiccoils.net/about.",
  },
  {
    question: "I have a sensitive scalp. Will Magic Coils irritate it?",
    answer:
      "Any cosmetic product can irritate a sensitive scalp. Review the complete ingredient list and patch test before full use. Peppermint Detox Shampoo lists peppermint oil and menthol, so avoid it if you know you react to mint or menthol. Stop use and consult a healthcare professional if irritation occurs.",
  },
  {
    question: "What if I have an allergic reaction to a product?",
    answer:
      "Stop using the product and follow the safety directions on its label. Seek prompt medical care for severe or worsening symptoms. You may also email info@magiccoils.net with the product name, lot code, order number, and a description of what occurred so the team can document and review the report. Magic Coils products are cosmetics, not medical treatments.",
  },
  {
    question: "How do I cancel my email subscription or update my preferences?",
    answer:
      "Every Magic Coils marketing email has an \"Unsubscribe\" link at the bottom — click it and you're out within 24 hours. If you want to stay on the list but receive fewer emails (e.g., only major launches, no weekly content), email info@magiccoils.net with the subject line \"Email Preferences\" and we'll set you up on the appropriate cadence. Transactional emails (order confirmations, shipping updates, return processing) will still send after you unsubscribe — those are required for your purchases.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
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
