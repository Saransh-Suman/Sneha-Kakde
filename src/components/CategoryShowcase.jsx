import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { archiveCategories } from '../data/portfolioData';
import { Sparkles, Eye } from 'lucide-react';

const categoryStyles = {
  illustration: {
    color: '#E6004C',
    bg: 'bg-[#E6004C]',
    ring: 'ring-[#E6004C]/30',
    lightBg: 'bg-red-50',
    border: 'border-red-200'
  },
  'graphic-design': {
    color: '#EAA221',
    bg: 'bg-[#EAA221]',
    ring: 'ring-[#EAA221]/30',
    lightBg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  'character-design': {
    color: '#1EA896',
    bg: 'bg-[#1EA896]',
    ring: 'ring-[#1EA896]/30',
    lightBg: 'bg-teal-50',
    border: 'border-teal-200'
  },
  'product-design': {
    color: '#2B78C5',
    bg: 'bg-[#2B78C5]',
    ring: 'ring-[#2B78C5]/30',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  photography: {
    color: '#6C3483',
    bg: 'bg-[#6C3483]',
    ring: 'ring-[#6C3483]/30',
    lightBg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  '3d-animation': {
    color: '#223853',
    bg: 'bg-[#223853]',
    ring: 'ring-[#223853]/30',
    lightBg: 'bg-slate-50',
    border: 'border-slate-200'
  },
  miscellaneous: {
    color: '#0E6251',
    bg: 'bg-[#0E6251]',
    ring: 'ring-[#0E6251]/30',
    lightBg: 'bg-emerald-50',
    border: 'border-emerald-200'
  }
};

export default function CategoryShowcase({ onSelectImage }) {
  const [activeCategory, setActiveCategory] = useState(archiveCategories[0].id);

  const currentCategory = archiveCategories.find(c => c.id === activeCategory) || archiveCategories[0];
  const activeStyle = categoryStyles[currentCategory.id] || categoryStyles.illustration;

  return (
    <section id="archive" className="py-24 px-6 sm:px-8 bg-white border-t border-b border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Archive & Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            Portfolio Contents
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore works across seven specialized disciplines from illustration to 3D character design and physical crafts.
          </p>
        </div>

        {/* Contents Card Container (Matching Figma Frame 66:884) */}
        <div className="bg-[#F5F3ED] rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm relative overflow-hidden">
          
          {/* Orange Ribbon Tag on Left (Matching Figma "Contents") */}
          <div className="mb-8 flex items-center justify-between">
            <div className="bg-[#E64A19] text-white text-xs sm:text-sm font-extrabold px-5 py-1.5 rounded-r-lg shadow-sm -ml-6 sm:-ml-10 uppercase tracking-wider">
              Contents
            </div>
            <span className="text-xs font-semibold text-stone-500 hidden sm:inline-block">
              Click any category to switch works
            </span>
          </div>

          {/* Perfectly Aligned 7 Numbered Circles Row */}
          <div className="flex items-start justify-start lg:justify-between gap-4 sm:gap-6 overflow-x-auto pb-4 hide-scrollbar pt-2">
            {archiveCategories.map((category) => {
              const isActive = category.id === activeCategory;
              const style = categoryStyles[category.id] || categoryStyles.illustration;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex flex-col items-center flex-1 min-w-[110px] max-w-[140px] group focus:outline-none transition-transform"
                >
                  {/* Circle Badge (Top-Aligned Across All Items) */}
                  <div className="relative flex items-center justify-center h-16 w-16 mb-3">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-base text-white transition-all duration-300 shadow-md border-2 border-white ${
                        style.bg
                      } ${
                        isActive
                          ? 'scale-115 ring-4 ring-offset-2 ring-stone-400 shadow-lg'
                          : 'opacity-85 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      {category.number}
                    </div>
                  </div>

                  {/* Category Title (Even Height & Balanced Center Alignment) */}
                  <div className="min-h-[44px] flex items-start justify-center w-full px-1">
                    <span
                      className={`text-xs font-bold text-center leading-snug transition-colors ${
                        isActive ? 'text-stone-900 font-extrabold' : 'text-stone-600 group-hover:text-stone-900'
                      }`}
                    >
                      {category.title}
                    </span>
                  </div>

                  {/* Active Indicator Underline */}
                  <div
                    className={`h-1 rounded-full transition-all duration-300 mt-1 ${
                      isActive ? 'w-8 ' + style.bg : 'w-0 bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>

        </div>

        {/* Active Category Gallery Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-[#FAFAFC] rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm"
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: activeStyle.color }}>
                  Category {currentCategory.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                  {currentCategory.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 max-w-md">
                {currentCategory.description}
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onSelectImage(item)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/80 transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Artifact</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-brand-pink transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
