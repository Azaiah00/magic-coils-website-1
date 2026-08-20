import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  buildArticleSchema,
  buildBlogBreadcrumbSchema,
  buildBlogIndexSchema,
  buildFaqSchema,
} from "@/lib/blog-schema";
import type { BlogPillar, BlogPost, BlogPostMeta } from "@/lib/blog-shared";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** All valid pillar values — used to validate frontmatter at read time. */
const VALID_PILLARS = new Set<string>([
  "tutorial",
  "education",
  "ingredient",
  "transformation",
]);

function parsePostFile(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const pillar = String(data.pillar ?? "education");
  if (!VALID_PILLARS.has(pillar)) {
    throw new Error(`Invalid pillar "${pillar}" in ${filename}`);
  }

  return {
    title: String(data.title),
    slug: String(data.slug),
    description: String(data.description),
    publishedAt: String(data.publishedAt),
    updatedAt: String(data.updatedAt ?? data.publishedAt),
    author: String(data.author ?? "The Crown Editors"),
    pillar: pillar as BlogPillar,
    featuredImage: String(data.featuredImage),
    featuredImageAlt: String(data.featuredImageAlt),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    relatedProducts: Array.isArray(data.relatedProducts)
      ? data.relatedProducts.map(String)
      : [],
    faqs: Array.isArray(data.faqs)
      ? data.faqs.map((faq: { q?: string; a?: string }) => ({
          q: String(faq.q),
          a: String(faq.a),
        }))
      : undefined,
    draft: data.draft === true,
    content,
  };
}

/**
 * Reads every markdown file in content/blog/, parses YAML frontmatter,
 * and returns posts sorted newest-first by publishedAt.
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map(parsePostFile)
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/** Metadata-only list — lighter for index cards and RSS. */
export function getAllBlogPostMeta(): BlogPostMeta[] {
  return getAllBlogPosts().map(({ content, ...meta }) => {
    void content;
    return meta;
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export {
  buildArticleSchema,
  buildBlogBreadcrumbSchema,
  buildBlogIndexSchema,
  buildFaqSchema,
};
