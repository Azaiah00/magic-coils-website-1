"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const stylists = [
  {
    id: 1,
    name: "Aaliyah Johnson",
    specialty: "Natural Hair & Silk Presses",
    location: "Atlanta, GA",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
    instagram: "@aaliyahstyles",
  },
  {
    id: 2,
    name: "Serena Davis",
    specialty: "Color Specialist & Extensions",
    location: "Houston, TX",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop",
    instagram: "@serenadoeshair",
  },
  {
    id: 3,
    name: "Chloe Washington",
    specialty: "Locs, Braids & Protective Styles",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=800&auto=format&fit=crop",
    instagram: "@chloesmagiccoils",
  },
  {
    id: 4,
    name: "Jasmine Taylor",
    specialty: "Bridal Hair & Updos",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=800&auto=format&fit=crop",
    instagram: "@jasminetaylorhair",
  },
  {
    id: 5,
    name: "Nia Robinson",
    specialty: "Curly Cuts & Wash n' Go's",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=800&auto=format&fit=crop",
    instagram: "@niarobinsoncurls",
  },
  {
    id: 6,
    name: "Maya Smith",
    specialty: "Healthy Hair Care & Treatments",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    instagram: "@mayasmithhair",
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function StylistDirectory() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-background overflow-hidden">
      <Navbar />
      <PageTransition>
        {/* Luxury Hero Section */}
        <section className="relative w-full py-32 lg:py-48 flex items-center justify-center bg-primary overflow-hidden">
        {/* Damask Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("/images/promo-card.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        
        {/* Animated Gold Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1.2 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]"
        />

        <div className="container relative z-10 px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <Image 
              src="/images/magic-coils-logo.png" 
              alt="Magic Coils Logo" 
              width={200} 
              height={100} 
              className="object-contain drop-shadow-2xl mx-auto"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-wide"
          >
            The <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">Royal</span> Court
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-white/80 font-sans text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
          >
            Discover the elite stylists who trust Magic Coils to crown their clients in luxury. Find a professional near you.
          </motion.p>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
          >
            {stylists.map((stylist) => (
              <motion.div 
                key={stylist.id} 
                variants={itemVariants}
                className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-accent/10"
              >
                {/* Image Container with Gold Border Effect */}
                <div className="relative h-[450px] w-full overflow-hidden p-2 bg-white">
                  <div className="absolute inset-0 border border-accent/30 m-2 z-10 pointer-events-none transition-all duration-500 group-hover:border-accent"></div>
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={stylist.image}
                      alt={stylist.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 z-0"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 text-center flex flex-col items-center relative z-20 bg-white">
                  <h3 className="font-serif text-3xl text-primary mb-2">{stylist.name}</h3>
                  <p className="text-accent font-semibold tracking-widest uppercase text-xs mb-4">{stylist.specialty}</p>
                  
                  <div className="w-12 h-[1px] bg-accent/40 mb-4"></div>
                  
                  <p className="text-primary/70 text-sm mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {stylist.location}
                  </p>
                  
                  <a 
                    href={`https://instagram.com/${stylist.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    {stylist.instagram}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 mix-blend-overlay" style={{ backgroundImage: 'url("/images/promo-card.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container relative z-10 px-4">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Are you a professional stylist?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 font-light">
            Join the Magic Coils Royal Court. Get exclusive access to professional sizes, wholesale pricing, and feature on our directory.
          </p>
          <button className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-10 py-4 font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            Apply to Join
          </button>
        </div>
      </section>
      </PageTransition>
      <Footer />
    </main>
  );
}
