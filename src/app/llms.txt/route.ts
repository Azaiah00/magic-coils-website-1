import { getAllBlogPostMeta } from "@/lib/blog";

const BASE_URL = "https://magiccoils.net";

/**
 * Dynamic llms.txt — tells AI crawlers (ChatGPT, Claude, Perplexity, Gemini)
 * which Magic Coils pages are most useful to cite. Article list auto-updates
 * whenever new markdown files land in content/blog/.
 */
export async function GET() {
  const articles = getAllBlogPostMeta();

  const articleLines = articles
    .map(
      (article) =>
        `- [${article.title}](${BASE_URL}/blog/${article.slug})`
    )
    .join("\n");

  const body = `# Magic Coils

> Magic Coils is a professional haircare brand created by Antwun Wilson of Hair For You LLC in Sumter, South Carolina. The brand offers 8 core products for textured-hair routines and is developing two coordinated routine systems.

## Brand

- [Our Story](${BASE_URL}/about): How Antwun built Magic Coils after years of watching the women he loves struggle with products not made for their hair.
- [Find a Stylist](${BASE_URL}/directory): Licensed stylists trained in Magic Coils techniques.
- [Distributor Program](${BASE_URL}/distributor): Wholesale opportunities for salons and retailers.

## Products

- [Peppermint Detox Shampoo](${BASE_URL}/product/peppermint-shampoo): Sulfate-light cleanser with peppermint and tea tree for scalp reset.
- [Intense Hydration Shampoo](${BASE_URL}/product/hydration-shampoo): Gentler moisture-rich cleanser for dry scalps.
- [Moisture Rich Conditioner](${BASE_URL}/product/moisture-conditioner): Deep hydration conditioner.
- [3-In-1 Leave In Treatment](${BASE_URL}/product/leave-in-treatment): Argan + Vitamin C + honey detangler/styler.
- [Honey & Argan Curl Custard](${BASE_URL}/product/curl-custard): Definition without crunch.
- [Honey & Argan Daily Moisturizing Cream](${BASE_URL}/product/moisturizing-cream): Daily refresh cream.
- [Honey & Argan Strengthening Serum](${BASE_URL}/product/strengthening-serum): Heat-protectant finishing oil.
- [Control Foam Wrap Lotion](${BASE_URL}/product/control-foam): Setting mousse for wraps and styles.
- [Two Strand Twist Bundle](${BASE_URL}/product/bundle-2-strand-twist): Complete bundle for protective twists.
- [Magic Press Bundle](${BASE_URL}/product/bundle-magic-press): Complete bundle for at-home silk press.

## Curl Talk (Education)

- [All Articles](${BASE_URL}/blog)
- [RSS Feed](${BASE_URL}/blog/feed.xml)
${articleLines}

## Tools

- [Hair Quiz](${BASE_URL}/quiz): 60-second personalized routine builder.
- [FAQ](${BASE_URL}/faq): 18 frequently asked questions about products, ingredients, shipping, and returns.

## Brand Voice & Mission

Magic Coils was created by Antwun Wilson for textured-hair routines across coily, curly, kinky, and wavy patterns. The brand voice centers on dignity, practical education, and care. We use "crown" language because textured hair deserves thoughtful treatment. Product pages provide ingredient lists, directions, and routine context so customers and professionals can make informed choices.

## Locations

- Hair For You LLC
- 727 Broad St, Sumter, SC 29150
- Phone: 843-344-7131
- Email: info@magiccoils.net
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
