import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles } from 'lucide-react';

export default function CraftGalleryModal({ item, onClose }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-center p-4 sm:p-6">
        
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl max-h-[90vh] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl z-10 border border-neutral-800 flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[70vh]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-neutral-950 text-white border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Craft & Artifact</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">{item.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all self-end sm:self-auto"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
