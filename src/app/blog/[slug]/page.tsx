import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import BlogArticleBody from "@/components/blog/BlogArticleBody";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import BlogRelatedProducts from "@/components/blog/BlogRelatedProducts";
import {
  buildArticleSchema,
  buildBlogBreadcrumbSchema,
  buildFaqSchema,
  getAllBlogPosts,
  getBlogPostBySlug,
} from "@/lib/blog";
import {
  formatBlogDate,
  getAbsoluteImageUrl,
  getBlogPostUrl,
  PILLAR_LABELS,
} from "@/lib/blog-shared";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found | Magic Coils" };

  const url = getBlogPostUrl(post.slug);
  const imageUrl = getAbsoluteImageUrl(post.featuredImage);

  return {
    title: `${post.title} | Curl Talk`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00Z`,
      modifiedTime: `${post.updatedAt}T00:00:00Z`,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: post.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const schemas = [
    buildArticleSchema(post),
    buildBlogBreadcrumbSchema(post),
    ...(post.faqs?.length ? [buildFaqSchema(post.faqs)] : []),
  ];

  return (
    <main className="min-h-screen flex flex-col w-full bg-background">
      <Navbar />

      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageTransition>
        <article className="pt-24 pb-20">
          {/* Hero image */}
          <div className="relative w-full h-[40vh] md:h-[50vh] mb-12">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-primary/30" />
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <BlogBreadcrumbs articleTitle={post.title} />

            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-widest uppercase mb-4">
                <span className="text-accent">{PILLAR_LABELS[post.pillar]}</span>
                <span className="text-primary/40">•</span>
                <time dateTime={post.publishedAt} className="text-primary/60">
                  {formatBlogDate(post.publishedAt)}
                </time>
                <span className="text-primary/40">•</span>
                <span className="text-primary/60">{post.author}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="font-sans text-lg text-primary/70 leading-relaxed">
                {post.description}
              </p>
            </header>

            {/* Article body — prose styling matches legal pages */}
            <div className="prose prose-neutral prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-primary/80 prose-li:text-primary/80 prose-strong:text-primary">
              <BlogArticleBody content={post.content} />
            </div>

            {/* FAQ section — visible + matches FAQPage schema */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-16 pt-12 border-t border-primary/10">
                <h2 className="font-serif text-3xl text-primary mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-8">
                  {post.faqs.map((faq) => (
                    <div key={faq.q}>
                      <h3 className="font-serif text-xl text-primary mb-3">
                        {faq.q}
                      </h3>
                      <p className="font-sans text-primary/70 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <BlogRelatedProducts productIds={post.relatedProducts} />

            {/* End-of-article CTA */}
            <section className="mt-16 p-8 md:p-12 bg-surface text-center">
              <h2 className="font-serif text-3xl text-primary mb-4">
                Find your perfect routine
              </h2>
              <p className="font-sans text-primary/70 mb-8 max-w-lg mx-auto">
                Take our 60-second Hair Quiz and get a personalized product
                routine built for your texture and goals.
              </p>
              <Link
                href="/quiz"
                className="inline-block bg-primary text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300"
              >
                Take the Hair Quiz
              </Link>
            </section>
          </div>
        </article>
      </PageTransition>

      <Footer />
    </main>
  );
}
