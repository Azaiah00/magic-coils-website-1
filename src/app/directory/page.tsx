"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const stylists = [
  {
    id: 1,
    name: "Jessica Veerapen",
    specialty: "Hairstylist",
    salon: "Shears of Gold Barber",
    location: "3030 Scotsman Rd, Columbia, SC 29223",
    phone: "706-915-8046",
    image: "/images/stylist-jessica.png",
  },
  {
    id: 2,
    name: "Bonnie",
    specialty: "Hairstylist",
    salon: "The Hair Goddess Studio by Bonnie",
    location: "740 Broad St, Sumter, SC 29150",
    phone: "",
    image: "/images/stylist-bonnie.png",
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
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
        
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
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
          >
            {stylists.map((stylist) => (
              <motion.div 
                key={stylist.id} 
                variants={itemVariants}
                className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-accent/10"
              >
                {/* Image Container - 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
                  <div className="absolute inset-0 border border-accent/30 m-3 z-10 pointer-events-none transition-all duration-500 group-hover:border-accent"></div>
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={stylist.image}
                      alt={stylist.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-0"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8 text-center flex flex-col items-center relative z-20 bg-white">
                  <h3 className="font-serif text-3xl text-primary mb-2">{stylist.name}</h3>
                  <p className="text-accent font-semibold tracking-widest uppercase text-xs mb-3">{stylist.specialty}</p>
                  
                  <div className="w-12 h-[1px] bg-accent/40 mb-4"></div>
                  
                  <p className="text-primary font-serif text-lg mb-1">{stylist.salon}</p>
                  
                  <p className="text-primary/70 text-sm mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {stylist.location}
                  </p>
                  
                  {stylist.phone && (
                    <p className="text-primary/70 text-sm mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <a href={`tel:${stylist.phone}`} className="hover:text-accent transition-colors">{stylist.phone}</a>
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url("/images/mc-pattern.png")', backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}></div>
        <div className="container relative z-10 px-4">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Are you a professional stylist?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 font-light">
            Join the Magic Coils Royal Court. Get exclusive access to professional sizes, wholesale pricing, and feature on our directory.
          </p>
          <a 
            href="/distributor" 
            className="inline-block bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-primary px-10 py-4 font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            Apply to Join
          </a>
        </div>
      </section>
      </PageTransition>
      <Footer />
    </main>
  );
}
