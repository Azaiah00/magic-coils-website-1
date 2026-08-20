/** Content pillars used for filtering on the Curl Talk index page. */
export type BlogPillar = "tutorial" | "education" | "ingredient" | "transformation";

export type BlogFaq = {
  q: string;
  a: string;
};

export type BlogPostMeta = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  pillar: BlogPillar;
  featuredImage: string;
  featuredImageAlt: string;
  keywords: string[];
  relatedProducts: string[];
  faqs?: BlogFaq[];
  draft?: boolean;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

/** Human-readable labels for pillar filter chips on /blog. */
export const PILLAR_LABELS: Record<BlogPillar, string> = {
  tutorial: "Tutorial",
  education: "Education",
  ingredient: "Ingredient",
  transformation: "Transformation",
};

const BASE_URL = "https://magiccoils.net";

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getBlogPostUrl(slug: string): string {
  return `${BASE_URL}/blog/${slug}`;
}

export function getAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  return `${BASE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
}
