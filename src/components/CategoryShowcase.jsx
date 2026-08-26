import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { archiveCategories } from '../data/portfolioData';
import { Sparkles, ArrowRight, Eye, Layers } from 'lucide-react';

export default function CategoryShowcase({ onSelectImage }) {
  const [activeCategory, setActiveCategory] = useState(archiveCategories[0].id);

  const currentCategory = archiveCategories.find(c => c.id === activeCategory) || archiveCategories[0];

  return (
    <section id="archive" className="py-24 px-6 sm:px-8 bg-white border-t border-b border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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

        {/* Numbered Category Navigation Tabs (Matching Figma Frame 66:884) */}
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto pb-4 hide-scrollbar mb-16">
          {archiveCategories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="flex flex-col items-center gap-2 group flex-shrink-0 focus:outline-none"
              >
                {/* Number Circle Badge (Matching Figma design) */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-extrabold text-sm sm:text-base transition-all duration-300 shadow-md ${
                    isActive
                      ? 'bg-brand-pink text-white scale-110 ring-4 ring-pink-100'
                      : 'bg-white text-gray-700 border-2 border-gray-200 group-hover:border-brand-pink group-hover:text-brand-pink'
                  }`}
                >
                  {category.number}
                </div>

                {/* Category Title */}
                <span
                  className={`text-xs font-bold tracking-tight text-center max-w-[90px] transition-colors ${
                    isActive ? 'text-brand-pink font-extrabold' : 'text-gray-600 group-hover:text-gray-900'
                  }`}
                >
                  {category.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FAFAFC] rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-sm"
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
              <div>
                <span className="text-xs font-bold text-brand-pink uppercase tracking-wider">
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
