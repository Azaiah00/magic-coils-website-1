"use client";

import { useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const faqs = [
  {
    question: "What's in Magic Coils products that makes them different?",
    answer:
      "Every formula in the Magic Coils line is built around the same three hero ingredients: argan oil (for slip, shine, and reinforcement of the hair shaft), vitamin C (for scalp wellness, cuticle brightness, and protection against environmental stress), and honey oil (a natural humectant that pulls moisture into the strand and holds it there). This trio is layered across all eight products — shampoos, conditioners, leave-ins, custards, and serums — so the moisture story stays consistent from the first lather to the final finish. No sulfates, no parabens, no mineral oil, no synthetic dyes.",
  },
  {
    question: "Are Magic Coils products safe for color-treated hair?",
    answer:
      "Yes. Every Magic Coils formulation is sulfate-free and paraben-free, which means they protect and extend the life of professional color (single-process, balayage, highlights, fashion colors) while maintaining the moisture levels color-treated hair needs. The Peppermint Detox Shampoo is the only product we recommend using sparingly (once a week or every other wash) on freshly-colored hair, because its clarifying action is intentionally deep. For routine wash days, lead with Intense Hydration Shampoo and Moisture Rich Conditioner.",
  },
  {
    question:
      "Are Magic Coils products safe for chemically processed, relaxed, or transitioning hair?",
    answer:
      "Yes. The line was designed by a professional stylist for textured hair in every state — natural, relaxed, transitioning, and chemically processed. The sulfate-free formulas are gentle enough to wash without further drying chemically treated strands, and the argan-and-honey ingredient stack delivers the moisture that processed hair needs most. The Strengthening Serum is especially good for transitioning hair, where the line of demarcation is most fragile.",
  },
  {
    question: "Are Magic Coils products cruelty-free and vegan?",
    answer:
      "All Magic Coils products are cruelty-free — never tested on animals at any stage of development, formulation, or production. Most of our products are also vegan; the line uses honey extract rather than animal-derived ingredients in most formulations. The Moisturizing Cream contains shea butter (plant-derived) and our Strengthening Serum uses silicone-based heat protection (also plant-and-mineral-derived). If you need a fully vegan-certified list, email info@magiccoils.net and we'll send the ingredient breakdown for your specific products.",
  },
  {
    question: "How are Magic Coils products stored, and what's the shelf life?",
    answer:
      "Store all Magic Coils products at room temperature, away from direct sunlight and heat. The professional-grade preservative system (sodium benzoate, phenoxyethanol) keeps unopened products fresh for 24 months from the date of manufacture. Once opened, use within 12 months for best results. The Strengthening Serum and the Moisturizing Cream are the most stable — those last the longest after opening. Don't store any product in a hot car or near a steamy shower long-term.",
  },
  {
    question: "Will Magic Coils work on my hair texture?",
    answer:
      "The Magic Coils line is built for textured hair across the full Type 3 through Type 4 spectrum — that's 3a wavy curls, 3b/3c spirals and corkscrews, 4a coils, 4b zig-zag patterns, and 4c tight coils. Locs, braids, twists, and silk-pressed hair are all part of the design. If you're unsure where your hair sits on the texture chart, take our 60-second Hair Quiz at magiccoils.net/quiz — it builds a routine recommendation specific to your hair pattern, scalp condition, and styling goals.",
  },
  {
    question: "Can I use Magic Coils on my children's hair?",
    answer:
      "Yes. The formulas are gentle, sulfate-free, paraben-free, and fragrance-mild — designed for textured crowns of every age. The 3-In-1 Leave In Treatment and the Moisturizing Cream are particularly popular for children's wash days because they detangle without tears and moisturize without heaviness. For toddlers and younger children, the standard adult dosage applies in smaller amounts. As with any new haircare product, do a patch test if your child has sensitive skin or known allergies.",
  },
  {
    question: "Can I use Magic Coils products on locs?",
    answer:
      "Yes — all Magic Coils products are loc-safe. The Peppermint Detox Shampoo is especially well-loved by the loc community because it clarifies without leaving residue inside the loc structure. Pair it with Intense Hydration Shampoo on the same wash day, then condition with Moisture Rich Conditioner under a plastic cap. The Moisturizing Cream and Strengthening Serum work beautifully as daily and weekly maintenance on mature locs.",
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
      "Yes. The Magic Coils Royal Court is our professional partner program — competitive wholesale pricing, professional-size product access (33.8 oz bottles), exclusive marketing support, and a directory listing on magiccoils.net for clients to find your salon. To apply, visit magiccoils.net/distributor and email info@magiccoils.net with your salon name, location, and the products you're interested in carrying.",
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
      "Magic Coils is founded by Antwun Wilson, a professional stylist who built the line out of his own salon in response to a simple problem: every textured-hair brand on the market either compromised on quality or compromised on price, and there wasn't a single professional-grade line that did both right. Magic Coils is the answer — salon-grade formulas in retail-friendly sizes, built for the textured crown. The brand is owned and operated by Hair For You LLC (Antwun's family company). Read his full story at magiccoils.net/about.",
  },
  {
    question: "I have a sensitive scalp. Will Magic Coils irritate it?",
    answer:
      "The Magic Coils line is formulated to be gentle on sensitive scalps — sulfate-free, paraben-free, silicone-free (with the exception of the Strengthening Serum, which uses silicones intentionally for heat protection). The Peppermint Detox Shampoo does contain peppermint oil and menthol, which create a noticeable tingling sensation — most customers love this, but if you have known sensitivity to mint or menthol, swap it for Intense Hydration Shampoo as your primary cleanser. For any new product, we recommend a patch test on the inside of your forearm 24 hours before full use if you have a history of contact sensitivities.",
  },
  {
    question: "What if I have an allergic reaction to a product?",
    answer:
      "Stop using the product immediately and rinse the affected area with cool water and a gentle, fragrance-free cleanser. If symptoms (itching, redness, swelling, hives) persist beyond 24 hours or worsen, see a dermatologist. Email info@magiccoils.net with the product name, your order number, and a description of the reaction — we'll process a full refund and add the ingredient flag to your account so we can flag it on future orders. Magic Coils products are cosmetics, not medical treatments, and reactions are rare but do happen on a small percentage of sensitive scalps.",
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
      <Script
        id="faq-page-schema"
        type="application/ld+json"
        strategy="afterInteractive"
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
