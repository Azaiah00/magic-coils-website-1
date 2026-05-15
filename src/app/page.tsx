import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BundleTeaser from "@/components/BundleTeaser";
import ProductGrid from "@/components/ProductGrid";
import BrandStory from "@/components/BrandStory";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import JudgeMeReviewsCarousel from "@/components/JudgeMeReviewsCarousel";
import QuizSection from "@/components/QuizSection";
import SocialProof from "@/components/SocialProof";
import SocialCTA from "@/components/SocialCTA";
import DistributorTeaser from "@/components/DistributorTeaser";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <Navbar />
      <PageTransition>
        <Hero />
        <BundleTeaser />
        <ProductGrid />
        <BrandStory />
        <GoogleReviewsSection />
        <JudgeMeReviewsCarousel />
        <QuizSection />
        <SocialProof />
        <SocialCTA />
        <DistributorTeaser />
      </PageTransition>
      <Footer />
    </main>
  );
}
