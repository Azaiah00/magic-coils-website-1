import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
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
        <ProductGrid />
        <QuizSection />
        <SocialProof />
      </PageTransition>
      <Footer />
    </main>
  );
}
