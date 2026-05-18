import Script from "next/script";
import BlogIndexClient from "./BlogIndexClient";
import { buildBlogIndexSchema, getAllBlogPostMeta } from "@/lib/blog";

/**
 * Server component — reads markdown articles from content/blog/ and passes
 * metadata to the animated client listing. JSON-LD is injected here so
 * crawlers see the blog hub schema without waiting for client JS.
 */
export default function BlogPage() {
  const posts = getAllBlogPostMeta();

  return (
    <>
      <Script
        id="blog-index-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBlogIndexSchema(posts)),
        }}
      />
      <BlogIndexClient posts={posts} />
    </>
  );
}
