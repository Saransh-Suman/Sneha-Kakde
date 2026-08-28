import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { featuredProjects } from '../data/portfolioData';
import { ArrowRight, Layers, Eye } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(p => p.category.toLowerCase().includes(filter));

  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FBFBFC] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header (Matching Figma "Projects") */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200/60 text-gray-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <Layers className="w-3.5 h-3.5 text-brand-pink" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
              Projects
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-xs sm:text-base">
            Curated UX case studies, interactive learning systems, brand identity guidelines, and AI product experiences.
          </p>
        </div>

        {/* Projects Grid (Matching Figma 2x2 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Card Thumbnail Container */}
              <div className="relative w-full aspect-[16/10] bg-[#E2E4E8] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:-translate-y-1.5 transition-all duration-400 ease-out border border-gray-200/70">
                
                {/* Background Project Image */}
                <ImageWithSkeleton
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Floating Tag Top Right */}
                <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-10">
                  <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] sm:text-xs font-bold text-gray-800 shadow-md">
                    {project.category.split('&')[0]}
                  </span>
                </div>

                {/* Bottom Overlay Info (Matching Figma layout with bold Arrow) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 lg:p-8 z-10 flex items-end justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight flex items-center gap-2 group-hover:text-pink-300 transition-colors">
                      <span>{project.title}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300 text-brand-pink flex-shrink-0" />
                    </h3>
                  </div>

                  {/* View Button Indicator */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-pink group-hover:text-white transition-all flex-shrink-0">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>

              </div>

              {/* Card Meta & Summary Below Thumbnail (Matching Figma text block) */}
              <div className="pt-3 sm:pt-4 px-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-pink">
                    {project.tagline ? project.tagline.split('-')[0] : project.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed line-clamp-2">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 sm:mt-3">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
