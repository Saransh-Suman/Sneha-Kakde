import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, FileText, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Philosophy', href: '#interests' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      
      setMobileMenuOpen(false);

      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const navOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          try {
            window.history.pushState(null, '', href);
          } catch (err) {}
        }
      }, 50);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 focus:outline-none cursor-pointer"
        >
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-brand-dark group-hover:text-brand-pink transition-colors">
            {personalInfo.initials}
          </span>
          <span className="w-2 h-2 rounded-full bg-brand-pink group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-gray-700 hover:text-brand-pink transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-pink hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Old/2025 Portfolio Pill Button (Matching Figma) */}
          <a
            href="#archive"
            onClick={(e) => scrollToSection(e, '#archive')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-dark hover:bg-black rounded-full transition-all hover:shadow-lg hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span>View 2025 Archive</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:text-brand-pink hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-nav border-b border-gray-200 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-base font-semibold text-gray-800 hover:text-brand-pink transition-colors py-2 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                <a
                  href="#archive"
                  onClick={(e) => scrollToSection(e, '#archive')}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-semibold text-white bg-brand-dark cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>View 2025 Archive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
