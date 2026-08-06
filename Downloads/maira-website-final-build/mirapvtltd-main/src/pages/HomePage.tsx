import Navbar from '../components/Navbar'
import ErrorBoundary from '../components/ErrorBoundary'

import DarkHeroSection from '../sections/DarkHeroSection'
import { OverviewSection } from '../sections/OverviewSection'
import { ServicesSection } from '../sections/ServicesSection'
import { WhyChooseUsSection } from '../sections/WhyChooseUsSection'
import { StatisticsSection } from '../sections/StatisticsSection'
import { ClientsSection } from '../sections/ClientsSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import { IndustriesSection } from '../sections/IndustriesSection'
import { ProcessSection } from '../sections/ProcessSection'
import { FeaturesSection } from '../sections/FeaturesSection'
import { CtaSection } from '../sections/CtaSection'
import { ContactSection } from '../sections/ContactSection'
import { FooterSection } from '../sections/FooterSection'

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary fallbackName="Hero Section">
          <DarkHeroSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="About Section">
          <OverviewSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Services Section">
          <ServicesSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Why Choose Us Section">
          <WhyChooseUsSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Statistics Section">
          <StatisticsSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Clients Section">
          <ClientsSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Testimonials Section">
          <TestimonialsSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Industries Section">
          <IndustriesSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Process Section">
          <ProcessSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Features Section">
          <FeaturesSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="CTA Section">
          <CtaSection />
        </ErrorBoundary>

        <ErrorBoundary fallbackName="Contact Section">
          <ContactSection />
        </ErrorBoundary>
      </main>

      <ErrorBoundary fallbackName="Footer Section">
        <FooterSection />
      </ErrorBoundary>
    </>
  )
}

export default HomePage
