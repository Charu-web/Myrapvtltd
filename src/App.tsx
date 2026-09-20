import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Lab } from './components/Lab';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Services } from './components/Services';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Toast } from './components/Toast';
import type { FeaturedProject } from './types';
import { PERSONAL_INFO } from './data/portfolioData';

export function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<FeaturedProject | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    showToast(`Copied ${PERSONAL_INFO.email} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#222222] flex flex-col selection:bg-[#2b4b7c] selection:text-white relative">
      
      {/* Global Minimal 3D Interactive Cursor */}
      <CustomCursor />

      {/* Minimal Artistic Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. 3D Editorial Hero with Real-Time Bust Scene & Text Interlacing */}
        <Hero
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedEmail}
        />

        {/* 2. Projects Section with 3D Card Showcase & Filters */}
        <Projects onSelectCaseStudy={(project) => setSelectedCaseStudy(project)} />

        {/* 3. Lab / Creative 3D & Canvas Experiments */}
        <Lab />

        {/* 4. Experience Timeline with 3D Depth Elevation */}
        <Experience />

        {/* 5. Skills with Interactive 3D Typography */}
        <Skills />

        {/* 6. About with 3D Geometric Sculpture */}
        <About onContactClick={scrollToContact} />

        {/* 7. What I Build / Services Grid */}
        <Services />

        {/* 8. Resume Qualifications */}
        <Resume />

        {/* 9. Minimal Contact with Magnetic CTA */}
        <Contact
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedEmail}
        />
      </main>

      {/* Minimal Footer */}
      <Footer onCopyEmail={handleCopyEmail} />

      {/* Deep-Dive Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Interactive Toast Notification */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

    </div>
  );
}

export default App;
