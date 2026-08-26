import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowUpRight, CheckCircle2, AlertTriangle, Lightbulb, ExternalLink, Image as ImageIcon } from 'lucide-react';
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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex justify-center items-start sm:p-4 md:p-6">
        
        {/* Backdrop click handler */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-white rounded-none sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-0 sm:my-8"
        >
          
          {/* Header Bar */}
          <div className="sticky top-0 z-20 glass-nav px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-pink transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Image / Banner */}
          <div className="relative w-full aspect-[21/9] bg-brand-dark overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-pink text-xs font-bold uppercase tracking-wider mb-2">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-200 mt-1 font-medium">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Key Metrics Bar */}
          {project.metrics && (
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100 divide-x divide-gray-200/80">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 sm:p-5 text-center">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {m.label}
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-brand-dark">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Case Study Body Content */}
          <div className="p-6 sm:p-10 space-y-12 max-w-3xl mx-auto">
            
            {/* 1. Project Abstract */}
            {details.abstract && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-3 flex items-center gap-2">
                  <span>01</span>
                  <span className="w-6 h-[1px] bg-brand-pink" />
                  <span>Project Abstract</span>
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                  {details.abstract}
                </p>
              </section>
            )}

            {/* 2. Problem Statement */}
            {details.problemStatement && (
              <section className="bg-pink-50/50 rounded-2xl p-6 sm:p-8 border border-pink-100">
                <div className="flex items-center gap-2 text-brand-pink font-bold text-sm uppercase tracking-wider mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Core Problem & Design Failure</span>
                </div>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
                  {details.problemStatement}
                </p>
              </section>
            )}

            {/* 3. Systemic Challenges */}
            {details.challenges && details.challenges.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-4 flex items-center gap-2">
                  <span>02</span>
                  <span className="w-6 h-[1px] bg-brand-pink" />
                  <span>Key Friction Points</span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {details.challenges.map((c, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-brand-pink flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">{c.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Solutions & UX Architecture */}
            {details.solutions && details.solutions.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-4 flex items-center gap-2">
                  <span>03</span>
                  <span className="w-6 h-[1px] bg-brand-pink" />
                  <span>Design Solutions & Scaffolding</span>
                </h3>
                <div className="space-y-4">
                  {details.solutions.map((s, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-base mb-2">
                        <Lightbulb className="w-5 h-5 text-emerald-600" />
                        <span>{s.title}</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-7">
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
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-pink mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Visual Showcase & Artifacts</span>
                </h3>
                <div className="space-y-6">
                  {details.gallery.map((g, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                      <img
                        src={g.url}
                        alt={g.caption || "Case study artifact"}
                        className="w-full h-auto object-cover"
                      />
                      {g.caption && (
                        <div className="p-3 text-center text-xs font-semibold text-gray-500 bg-white border-t border-gray-100">
                          {g.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer inside Modal */}
            <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={personalInfo.links.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-brand-pink transition-colors"
              >
                <span>View project on Behance</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-brand-dark text-white text-sm font-semibold hover:bg-black transition-all"
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
