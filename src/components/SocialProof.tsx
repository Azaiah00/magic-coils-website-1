"use client";

import { Award, Leaf, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialProof() {
  const proofs = [
    {
      icon: <Award className="w-10 h-10 text-accent" strokeWidth={1} />,
      title: "Used by Top Salon Stylists",
      description: "Trusted by professionals for flawless, lasting results.",
    },
    {
      icon: <Leaf className="w-10 h-10 text-accent" strokeWidth={1} />,
      title: "Science Meets Nature",
      description: "Premium botanicals engineered for maximum efficacy.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-accent" strokeWidth={1} />,
      title: "Cruelty-Free Formulations",
      description: "Ethically crafted without animal testing, ever.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section className="py-24 bg-primary border-y border-accent/20 relative overflow-hidden">
      {/* Subtle Damask Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/promo-card.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
        >
          {proofs.map((proof, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center group">
              <div className="mb-8 p-6 bg-white/10 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-500 ease-out group-hover:-translate-y-2 border border-accent/20">
                {proof.icon}
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">
                {proof.title}
              </h3>
              <p className="font-sans text-base text-white/70 max-w-xs leading-relaxed font-light">
                {proof.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
