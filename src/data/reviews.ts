export type GoogleReview = {
  id: number;
  reviewer: string;
  rating: number;
  text: string;
  date: string;
};

// Verified public reviews currently captured from the Magic Coils Google
// Business Profile. Add new reviews here only after checking the live profile.
export const googleReviews: GoogleReview[] = [
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

export const GOOGLE_BUSINESS_URL =
  "https://www.google.com/maps/place/Magic+Coils/@33.9417074,-80.3663443,846m/data=!3m1!1e3!4m6!3m5!1s0x88ff69be678be279:0xd935db73f6a89a48!8m2!3d33.9417074!4d-80.3663443!16s%2Fg%2F11zb1shvn2";

export function abbreviateReviewerName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0];
  }

  const first = parts[0];
  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${first} ${lastInitial}.`;
}
