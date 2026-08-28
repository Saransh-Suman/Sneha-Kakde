import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowUpRight, AlertTriangle, Lightbulb, Image as ImageIcon } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function CaseStudyModal({ project, onClose, onSelectNext }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const { details } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex justify-center items-start p-0 sm:p-4 md:p-6">
        
        {/* Backdrop click handler */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-white rounded-none sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-0 sm:my-8 min-h-screen sm:min-h-0"
        >
          
          {/* Header Bar */}
          <div className="sticky top-0 z-20 glass-nav px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-100">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-brand-pink transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Image / Banner */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] bg-brand-dark overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-brand-pink text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2">
                {project.category}
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-base text-gray-200 mt-1 font-medium line-clamp-2">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Key Metrics Bar */}
          {project.metrics && (
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100 divide-x divide-gray-200/80">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 sm:p-5 text-center">
                  <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1">
                    {m.label}
                  </div>
                  <div className="text-xs sm:text-base font-extrabold text-brand-dark">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Case Study Body Content */}
          <div className="p-4 sm:p-8 lg:p-10 space-y-8 sm:space-y-12 max-w-3xl mx-auto">
            
            {/* 1. Project Abstract */}
            {details.abstract && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-2 sm:mb-3 flex items-center gap-2">
                  <span>01</span>
                  <span className="w-6 h-[1px] bg-brand-pink" />
                  <span>Project Abstract</span>
                </h3>
                <p className="text-sm sm:text-lg text-gray-700 leading-relaxed font-normal">
                  {details.abstract}
                </p>
              </section>
            )}

            {/* 2. Problem Statement */}
            {details.problemStatement && (
              <section className="bg-pink-50/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-pink-100">
                <div className="flex items-center gap-2 text-brand-pink font-bold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>The Core Problem & Challenge</span>
                </div>
                <p className="text-sm sm:text-lg text-gray-800 leading-relaxed font-medium">
                  {details.problemStatement}
                </p>
              </section>
            )}

            {/* 3. Systemic Challenges */}
            {details.challenges && details.challenges.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-3 sm:mb-4 flex items-center gap-2">
                  <span>02</span>
                  <span className="w-6 h-[1px] bg-brand-pink" />
                  <span>Key Friction Points</span>
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {details.challenges.map((c, i) => (
                    <div key={i} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 flex gap-3 sm:gap-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 text-brand-pink flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">{c.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Solutions & UX Architecture */}
            {details.solutions && details.solutions.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-3 sm:mb-4 flex items-center gap-2">
                  <span>03</span>
                  <span className="w-6 h-[1px] bg-brand-pink" />
                  <span>Design Solutions & Scaffolding</span>
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {details.solutions.map((s, i) => (
                    <div key={i} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-emerald-50/50 border border-emerald-100">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base mb-1.5 sm:mb-2">
                        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                        <span>{s.title}</span>
                      </div>
                      <p className="text-xs sm:text-base text-gray-700 leading-relaxed pl-6 sm:pl-7">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Image & Artifact Gallery */}
            {details.gallery && details.gallery.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-3 sm:mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Visual Showcase & Artifacts</span>
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {details.gallery.map((g, i) => (
                    <div key={i} className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                      <img
                        src={g.url}
                        alt={g.caption || "Case study artifact"}
                        className="w-full h-auto object-cover"
                      />
                      {g.caption && (
                        <div className="p-2.5 sm:p-3 text-center text-[11px] sm:text-xs font-semibold text-gray-500 bg-white border-t border-gray-100">
                          {g.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer inside Modal */}
            <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <a
                href={personalInfo.links.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800 hover:text-brand-pink transition-colors"
              >
                <span>View project on Behance</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-brand-dark text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all cursor-pointer"
              >
                Done Reading
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
