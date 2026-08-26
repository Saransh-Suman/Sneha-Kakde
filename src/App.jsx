import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import CategoryShowcase from './components/CategoryShowcase';
import About from './components/About';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
import ContactModal from './components/ContactModal';
import CraftGalleryModal from './components/CraftGalleryModal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#1E1E1E] relative selection:bg-[#E6004C] selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar 
        onOpenContact={() => setIsContactOpen(true)} 
      />

      {/* Main Sections */}
      <main>
        <Hero 
          onOpenContact={() => setIsContactOpen(true)} 
        />
        
        <Projects 
          onSelectProject={(project) => setSelectedProject(project)} 
        />

        <About 
          onSelectCraft={(craft) => setSelectedCraft(craft)} 
        />

        <CategoryShowcase 
          onSelectImage={(item) => setSelectedCraft(item)} 
        />
      </main>

      {/* Footer & Contact Strip */}
      <Footer 
        onOpenContact={() => setIsContactOpen(true)} 
      />

      {/* Interactive Modals */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <CraftGalleryModal
        item={selectedCraft}
        onClose={() => setSelectedCraft(null)}
      />

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-brand-dark hover:bg-black text-white shadow-xl hover:scale-110 active:scale-95 transition-all border border-gray-700"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-pink-400" />
        </button>
      )}

    </div>
  );
}
