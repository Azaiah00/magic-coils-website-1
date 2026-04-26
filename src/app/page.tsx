import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BundleShowcase from "@/components/BundleShowcase";
import ProductGrid from "@/components/ProductGrid";
import BrandStory from "@/components/BrandStory";
import QuizSection from "@/components/QuizSection";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <Navbar />
      <PageTransition>
        <Hero />
        <BundleShowcase />
        <ProductGrid />
        <BrandStory />
        <QuizSection />
        <SocialProof />
      </PageTransition>
      <Footer />
    </main>
  );
}
