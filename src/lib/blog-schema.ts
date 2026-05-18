import type { BlogFaq, BlogPostMeta } from "@/lib/blog-shared";
import { getAbsoluteImageUrl, getBlogPostUrl } from "@/lib/blog-shared";

const BASE_URL = "https://magiccoils.net";

/** Article JSON-LD block for a single Curl Talk post. */
export function buildArticleSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: getAbsoluteImageUrl(post.featuredImage),
    datePublished: `${post.publishedAt}T00:00:00Z`,
    dateModified: `${post.updatedAt}T00:00:00Z`,
    author: {
      "@type": "Organization",
      name: `${post.author} at Magic Coils`,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Magic Coils",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/mc-pattern.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getBlogPostUrl(post.slug),
    },
    keywords: post.keywords,
  };
}

/** Breadcrumb JSON-LD for article pages. */
export function buildBlogBreadcrumbSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Curl Talk",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  };
}

/** FAQPage JSON-LD when an article includes faqs in frontmatter. */
export function buildFaqSchema(faqs: BlogFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/** Blog index JSON-LD — signals to crawlers that /blog is a content hub. */
export function buildBlogIndexSchema(posts: BlogPostMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Curl Talk — Magic Coils",
    description:
      "Education, tutorials, and ingredient deep dives for textured hair.",
    url: `${BASE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Magic Coils",
      url: BASE_URL,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: getBlogPostUrl(post.slug),
      datePublished: `${post.publishedAt}T00:00:00Z`,
    })),
  };
}
