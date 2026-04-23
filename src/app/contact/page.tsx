"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function ContactPage() {
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
              Contact Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-lg text-primary/70"
            >
              We&apos;re here to help you on your journey to healthy, beautiful hair. Reach out to our team with any questions or inquiries.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/3"
            >
              <h2 className="font-serif text-3xl text-primary mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-surface rounded-full text-accent">
                    <Phone className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-primary mb-1">Phone</h3>
                    <p className="font-sans text-primary/70">843-344-7131</p>
                    <p className="font-sans text-sm text-primary/50 mt-1">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-surface rounded-full text-accent">
                    <Mail className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-primary mb-1">Email</h3>
                    <a href="mailto:info@magiccoils.net" className="font-sans text-primary/70 hover:text-accent transition-colors">
                      info@magiccoils.net
                    </a>
                    <p className="font-sans text-sm text-primary/50 mt-1">We aim to respond within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-surface rounded-full text-accent">
                    <MapPin className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-primary mb-1">Company</h3>
                    <p className="font-sans text-primary/70">Hair For You LLC</p>
                    <p className="font-sans text-sm text-primary/50 mt-1">Magic Coils Professional Hair Products</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-2/3 bg-white p-8 md:p-12 shadow-xl border border-surface"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="font-sans text-sm font-semibold text-primary uppercase tracking-widest">First Name</label>
                    <input type="text" id="firstName" className="w-full border border-surface p-4 focus:outline-none focus:border-accent transition-colors" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="font-sans text-sm font-semibold text-primary uppercase tracking-widest">Last Name</label>
                    <input type="text" id="lastName" className="w-full border border-surface p-4 focus:outline-none focus:border-accent transition-colors" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="font-sans text-sm font-semibold text-primary uppercase tracking-widest">Email Address</label>
                  <input type="email" id="email" className="w-full border border-surface p-4 focus:outline-none focus:border-accent transition-colors" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="font-sans text-sm font-semibold text-primary uppercase tracking-widest">Subject</label>
                  <select id="subject" className="w-full border border-surface p-4 focus:outline-none focus:border-accent transition-colors bg-white">
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-sans text-sm font-semibold text-primary uppercase tracking-widest">Message</label>
                  <textarea id="message" rows={5} className="w-full border border-surface p-4 focus:outline-none focus:border-accent transition-colors resize-none" required></textarea>
                </div>

                <button type="button" className="w-full bg-primary text-white py-5 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300">
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
