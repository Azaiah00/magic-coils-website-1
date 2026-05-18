"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import {
  formatBlogDate,
  PILLAR_LABELS,
  type BlogPillar,
  type BlogPostMeta,
} from "@/lib/blog-shared";

type BlogIndexClientProps = {
  posts: BlogPostMeta[];
};

const POSTS_PER_PAGE = 12;

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [activePillar, setActivePillar] = useState<BlogPillar | "all">("all");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filteredPosts = useMemo(() => {
    if (activePillar === "all") return posts;
    return posts.filter((post) => post.pillar === activePillar);
  }, [posts, activePillar]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const featured = visiblePosts[0];
  const gridPosts = visiblePosts.slice(1);
  const hasMore = visibleCount < filteredPosts.length;

  const pillars = Object.entries(PILLAR_LABELS) as [BlogPillar, string][];

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
              Education, tutorials, and transformations. Discover the magic
              behind healthy, thriving textured hair.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-12">
          <BlogBreadcrumbs />

          {/* Pillar filter chips */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => {
                setActivePillar("all");
                setVisibleCount(POSTS_PER_PAGE);
              }}
              className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
                activePillar === "all"
                  ? "bg-primary text-white"
                  : "border border-primary/20 text-primary hover:border-primary"
              }`}
            >
              All
            </button>
            {pillars.map(([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  setActivePillar(value);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
                  activePillar === value
                    ? "bg-primary text-white"
                    : "border border-primary/20 text-primary hover:border-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <p className="text-center text-primary/60 font-sans py-20">
              No articles in this category yet. Check back soon.
            </p>
          ) : (
            <>
              {/* Featured post — always the newest in the filtered set */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-20"
                >
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group block"
                  >
                    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden mb-8">
                      <Image
                        src={featured.featuredImage}
                        alt={featured.featuredImageAlt}
                        fill
                        className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors duration-500" />
                    </div>
                    <div className="max-w-3xl mx-auto text-center">
                      <div className="flex items-center justify-center gap-4 text-sm font-semibold tracking-widest uppercase mb-4">
                        <span className="text-accent">
                          {PILLAR_LABELS[featured.pillar]}
                        </span>
                        <span className="text-primary/40">•</span>
                        <span className="text-primary/60">
                          {formatBlogDate(featured.publishedAt)}
                        </span>
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 group-hover:text-accent transition-colors duration-300">
                        {featured.title}
                      </h2>
                      <p className="font-sans text-lg text-primary/70">
                        {featured.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Grid posts */}
              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {gridPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block"
                      >
                        <div className="relative w-full aspect-[4/3] overflow-hidden mb-6">
                          <Image
                            src={post.featuredImage}
                            alt={post.featuredImageAlt}
                            fill
                            className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase mb-3">
                            <span className="text-accent">
                              {PILLAR_LABELS[post.pillar]}
                            </span>
                            <span className="text-primary/40">•</span>
                            <span className="text-primary/60">
                              {formatBlogDate(post.publishedAt)}
                            </span>
                          </div>
                          <h3 className="font-serif text-2xl md:text-3xl text-primary group-hover:text-accent transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="font-sans text-primary/60 mt-3 line-clamp-2">
                            {post.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {hasMore && (
                <div className="mt-20 flex justify-center">
                  <button
                    onClick={() =>
                      setVisibleCount((count) => count + POSTS_PER_PAGE)
                    }
                    className="border border-primary text-primary px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </PageTransition>
      <Footer />
    </main>
  );
}
