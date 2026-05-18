import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BlogBreadcrumbsProps = {
  articleTitle?: string;
};

/** Visible breadcrumb trail for article pages and the blog index. */
export default function BlogBreadcrumbs({ articleTitle }: BlogBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-primary/60 mb-8"
    >
      <Link href="/" className="hover:text-accent transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />
      {articleTitle ? (
        <>
          <Link href="/blog" className="hover:text-accent transition-colors">
            Curl Talk
          </Link>
          <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />
          <span className="text-primary font-medium line-clamp-1">
            {articleTitle}
          </span>
        </>
      ) : (
        <span className="text-primary font-medium">Curl Talk</span>
      )}
    </nav>
  );
}
