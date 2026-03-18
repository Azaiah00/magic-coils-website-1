"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const stylists = [
  {
    id: 1,
    name: "Jasmine Carter",
    salon: "Crown & Glory Studio",
    location: "Atlanta, GA",
    specialty: "Natural Hair & Silk Presses",
    rating: 5.0,
    reviews: 124,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    salon: "The Coil Collective",
    location: "Brooklyn, NY",
    specialty: "Color & Big Chops",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    salon: "Texture Lounge",
    location: "Miami, FL",
    specialty: "Wash & Go, Hydration Treatments",
    rating: 5.0,
    reviews: 210,
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    salon: "Magic Touch Salon",
    location: "Chicago, IL",
    specialty: "Protective Styles & Locs",
    rating: 4.8,
    reviews: 156,
  }
];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStylists = stylists.filter(s => 
    s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <PageTransition>
        <div className="pt-24 pb-16 bg-surface">
          <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-6xl text-primary mb-6"
            >
              Stylist Directory
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-lg text-primary/70 mb-10"
            >
              Find a certified Magic Coils professional near you. Our network of elite stylists are trained to treat your hair like the crown it is.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-xl mx-auto"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary/40" />
              </div>
              <input
                type="text"
                placeholder="Search by city, state, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-surface focus:outline-none focus:border-accent transition-colors shadow-sm font-sans"
              />
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredStylists.map((stylist, index) => (
              <motion.div
                key={stylist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-surface p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-primary mb-1">{stylist.name}</h3>
                    <p className="font-sans text-accent font-medium text-sm">{stylist.salon}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-surface px-2 py-1 rounded-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-sans text-sm font-bold text-primary">{stylist.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-primary/60 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="font-sans text-sm">{stylist.location}</span>
                </div>
                
                <div className="mb-8">
                  <span className="text-xs text-primary/40 uppercase tracking-widest block mb-1">Specialty</span>
                  <p className="font-sans text-primary/80">{stylist.specialty}</p>
                </div>

                <button className="w-full border border-primary text-primary py-3 text-sm font-semibold tracking-widest uppercase hover:bg-primary hover:text-white transition-colors duration-300">
                  Book Appointment
                </button>
              </motion.div>
            ))}
          </div>
          
          {filteredStylists.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-xl text-primary/50">No stylists found matching your search.</p>
            </div>
          )}
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
