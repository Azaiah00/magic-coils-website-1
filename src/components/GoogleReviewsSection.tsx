"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";

// Hardcoded Google reviews keep the section fast and brand-matched.
// When new reviews come in, update this array and the aggregate schema
// below will automatically reflect the new review count and average.
const reviews = [
  {
    id: 1,
    reviewer: "Dawna Quick",
    rating: 5,
    text: "It's strange to find out that someone in the Sumter community actually makes hair products. I've spent so much money on hair products from small makers through the years and would have tried Magic Coils sooner if I'd been aware of it.",
    date: "May 2026",
  },
  {
    id: 2,
    reviewer: "Bonnie Joe",
    rating: 5,
    text: "Let me tell you, Magic Coils is definitely my go to product for silk wraps. This system makes my blowouts and silk wraps last up to 2 months on some of my clients. I love the versatility of MAGIC Coils.",
    date: "May 2026",
  },
  {
    id: 3,
    reviewer: "joy richburg",
    rating: 5,
    text: "I'm truly in loved with these products. All of my natural hair girlies look like they have a relaxer and the products make the hair very manageable.",
    date: "May 2026",
  },
  {
    id: 4,
    reviewer: "Marcia Sims",
    rating: 5,
    text: "This product is amazing! I love the way the hair feels after using these products. The outcome of the silk press starts at the shampoo bowl and this is what you want from start to finish!",
    date: "May 2026",
  },
];

const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/place/Magic+Coils/@33.9417074,-80.3663443,846m/data=!3m1!1e3!4m6!3m5!1s0x88ff69be678be279:0xd935db73f6a89a48!8m2!3d33.9417074!4d-80.3663443!16s%2Fg%2F11zb1shvn2";

function abbreviateName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0];
  }

  const first = parts[0];
  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${first} ${lastInitial}.`;
}

function averageRating(): string {
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= rating
              ? "w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
              : "w-4 h-4 text-[#D4AF37]/30"
          }
        />
      ))}
    </div>
  );
}

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function GoogleReviewsSection() {
  // This links the homepage reviews to the Organization schema already
  // shipped in the root layout, making the AggregateRating easy for
  // search engines to connect to Magic Coils as the reviewed business.
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://magiccoils.net/#organization",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating(),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: abbreviateName(review.reviewer),
      },
      datePublished: review.date,
      reviewBody: review.text,
    })),
  };

  return (
    <section
      id="google-reviews"
      className="relative w-full bg-[#0A1F44] text-white py-20 md:py-28 overflow-hidden"
      aria-labelledby="reviews-heading"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <GoogleIcon className="w-6 h-6" />
            <StarRow rating={Math.round(parseFloat(averageRating()))} />
            <span className="text-sm text-white/70 ml-1">
              {averageRating()} ({reviews.length} reviews)
            </span>
          </div>

          <h2
            id="reviews-heading"
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-[#D4AF37] mb-4"
          >
            Trusted by the Crown Community
          </h2>

          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            Real words from real wearers of Magic Coils, verified Google reviews from
            members of our growing community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14">
          {reviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative bg-white/[0.04] backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6 md:p-8 hover:border-[#D4AF37]/50 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <StarRow rating={review.rating} />
                <GoogleIcon className="w-5 h-5 opacity-80" />
              </div>

              <blockquote className="text-white/90 text-base md:text-lg leading-relaxed mb-6 font-[family-name:var(--font-inter)]">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <footer className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-[#D4AF37] font-semibold text-sm">
                    {abbreviateName(review.reviewer)}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">Verified Google review</p>
                </div>
                <p className="text-white/50 text-xs">{review.date}</p>
              </footer>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#D4AF37] hover:bg-[#E0BB42] text-[#0A1F44] font-semibold rounded-full transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            <GoogleIcon className="w-5 h-5" />
            Read all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-white/50 text-xs mt-4">
            Have you tried Magic Coils? We&rsquo;d love your honest review.
          </p>
        </motion.div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema),
        }}
      />
    </section>
  );
}
