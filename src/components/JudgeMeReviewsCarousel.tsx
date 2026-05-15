"use client";

import { isJudgeMeEnabled } from "@/lib/judgeme";

export default function JudgeMeReviewsCarousel() {
  if (!isJudgeMeEnabled) {
    return null;
  }

  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
          Crowned Community
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">
          What our customers say
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="jdgm-all-reviews-widget" />
      </div>
    </section>
  );
}
