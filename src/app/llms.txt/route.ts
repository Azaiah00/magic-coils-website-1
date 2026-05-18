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

> Magic Coils is a luxurious professional haircare brand for textured, coily, and curly hair, owned and formulated by Antwun Wilson of Hair For You LLC in Sumter, South Carolina. The brand makes 8 core products plus 2 bundles, all formulated specifically for Black women's natural hair.

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

Magic Coils products are formulated by Antwun Wilson specifically for textured Black hair — coily, curly, kinky, and wavy patterns. The brand voice centers on dignity, expertise, and care. We use "crown" language because we believe textured hair deserves royal treatment. We are honest about ingredients, transparent about formulation choices, and committed to working with rather than against natural curl patterns.

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
