import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import CategoryShowcase from '../components/CategoryShowcase';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

export default function ArchivePage({ onBackToHome, onSelectImage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16 sm:pb-20">
      
      {/* Top Banner with Sketch Artwork Background (Matching Figma Frame 66:884) */}
      <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[480px] bg-neutral-200 overflow-hidden pt-16 sm:pt-20">
        
        {/* Background Sketch Image */}
        <ImageWithSkeleton
          src="/assets/archive_banner.webp"
          alt="Sneha Kakde 2025 Sketches Artwork Background"
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-top filter grayscale contrast-105 opacity-90 select-none"
        />

        {/* Subtle Gradient Fade at the Bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Badges & Navigation */}
        <div className="absolute top-20 sm:top-24 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 z-10">
          
          {/* Orange "Portfolio - 2025" Ribbon Badge (Exact Figma Style) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#E64A19] text-white font-extrabold px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-lg md:text-2xl shadow-xl tracking-tight border border-orange-600/30 whitespace-nowrap"
          >
            Portfolio - 2025
          </motion.div>

          {/* Black "View New Portfolio ↗" Button (Exact Figma Style) */}
          <motion.button
            onClick={onBackToHome}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-black hover:bg-neutral-900 text-white px-3.5 sm:px-6 py-2 sm:py-3 rounded-full text-[11px] sm:text-sm font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 group cursor-pointer border border-neutral-800 whitespace-nowrap"
          >
            <span>View New Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>

        </div>

      </div>

      {/* Overlapping Contents & Category Showcase Section */}
      <div className="-mt-14 sm:-mt-24 lg:-mt-32 relative z-20">
        <CategoryShowcase onSelectImage={onSelectImage} />
      </div>

      {/* Bottom Return Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 sm:mt-20 text-center">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-brand-dark hover:bg-black text-white text-sm sm:text-base font-bold transition-all hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Return to 2026 Portfolio</span>
        </button>
      </div>

    </div>
  );
}
