"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const posts = [
  {
    id: 1,
    title: "Mastering the Perfect Wash & Go",
    category: "Tutorial",
    date: "March 15, 2026",
    image: "/images/hero-woman.png",
    isVideo: true,
  },
  {
    id: 2,
    title: "The Science Behind Argan Oil & Vitamin C",
    category: "Education",
    date: "March 02, 2026",
    image: "/images/serum-woman.png",
    isVideo: false,
  },
  {
    id: 3,
    title: "Big Chop Transformation: Sarah's Story",
    category: "Transformation",
    date: "February 18, 2026",
    image: "/images/lineup.png",
    isVideo: false,
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />
      <PageTransition>
        <div className="pt-24 pb-12 bg-surface">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-7xl text-primary mb-6"
            >
              Curl Talk
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-lg text-primary/70 max-w-2xl mx-auto"
            >
              Education, tutorials, and transformations. Discover the magic behind healthy, thriving textured hair.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-20">
          
          {/* Featured Post */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20 group cursor-pointer"
          >
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden mb-8">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors duration-500"></div>
              {posts[0].isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <PlayCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              )}
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 text-sm font-semibold tracking-widest uppercase mb-4">
                <span className="text-accent">{posts[0].category}</span>
                <span className="text-primary/40">•</span>
                <span className="text-primary/60">{posts[0].date}</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 group-hover:text-accent transition-colors duration-300">
                {posts[0].title}
              </h2>
              <p className="font-sans text-lg text-primary/70">
                Learn the step-by-step technique to achieve defined, hydrated, and long-lasting curls using the Magic Coils 3-in-1 Leave In Treatment and Curling Custard.
              </p>
            </div>
          </motion.div>

          {/* Grid Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.slice(1).map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500"></div>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase mb-3">
                    <span className="text-accent">{post.category}</span>
                    <span className="text-primary/40">•</span>
                    <span className="text-primary/60">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-primary group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="border border-primary text-primary px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-primary hover:text-white transition-colors duration-300">
              Load More Articles
            </button>
          </div>

        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
