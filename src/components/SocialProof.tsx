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
    <section className="py-24 bg-surface border-y border-primary/5">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
        >
          {proofs.map((proof, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center group">
              <div className="mb-8 p-6 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all duration-500 ease-out group-hover:-translate-y-2">
                {proof.icon}
              </div>
              <h3 className="font-serif text-2xl text-primary mb-4">
                {proof.title}
              </h3>
              <p className="font-sans text-base text-primary/70 max-w-xs leading-relaxed">
                {proof.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
