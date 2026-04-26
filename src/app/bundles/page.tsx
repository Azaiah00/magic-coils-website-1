import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import BundleShowcase from "@/components/BundleShowcase";

export default function BundlesPage() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-background overflow-hidden">
      <Navbar />
      <PageTransition>
        {/* We use BundleShowcase which already has the luxury py-32 header inside it */}
        <BundleShowcase />
      </PageTransition>
      <Footer />
    </main>
  );
}