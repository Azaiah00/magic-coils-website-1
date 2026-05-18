import Link from "next/link";
import ReactMarkdown from "react-markdown";

type BlogArticleBodyProps = {
  content: string;
};

/**
 * Renders article markdown with internal links routed through Next.js Link
 * so /product/* and /blog/* navigation stays client-side fast.
 */
export default function BlogArticleBody({ content }: BlogArticleBodyProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children, ...props }) => {
          if (href?.startsWith("/")) {
            return (
              <Link href={href} className="text-accent hover:underline">
                {children}
              </Link>
            );
          }

          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
              {...props}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
