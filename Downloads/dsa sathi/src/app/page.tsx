import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { TrustMetrics } from '@/components/landing/TrustMetrics';
import { LoanTypesGrid } from '@/components/landing/LoanTypesGrid';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { BeforeAfter } from '@/components/landing/BeforeAfter';
import { FeaturesOverview } from '@/components/landing/FeaturesOverview';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQAccordion } from '@/components/landing/FAQAccordion';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustMetrics />
        <LoanTypesGrid />
        <ProblemSection />
        <BeforeAfter />
        <FeaturesOverview />
        <Testimonials />
        <FAQAccordion />
      </main>
      <Footer />
    </div>
  );
}
