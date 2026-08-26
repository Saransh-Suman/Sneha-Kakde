import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, ArrowDown, Sparkles, GraduationCap } from 'lucide-react';

const TYPEWRITER_PHRASES = [
  'Sneha Kakde',
  'a Visual Designer',
  'a UX Designer',
  'a Creative Storyteller',
  'Sneha Kakde'
];

export default function Hero({ onOpenContact }) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(100);

        if (text.length + 1 === currentPhrase.length) {
          // Pause when word is completely typed
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        // Deleting backwards
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(50);

        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
          setTypingSpeed(300);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, typingSpeed]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 bg-gradient-to-b from-white via-[#FAFAFC] to-white overflow-hidden">
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Mascot Illustration (Matching Figma frame 88:981) */}
        <motion.div 
          className="lg:col-span-6 flex justify-center items-center relative order-2 lg:order-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative group max-w-md sm:max-w-lg lg:max-w-full">
            
            {/* Mascot Image with Sticker Outline & Drop Shadow */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img
                src="/assets/mascot.png"
                alt="Sneha Kakde Character Mascot"
                className="w-full h-auto max-h-[520px] object-contain sticker-effect filter drop-shadow-2xl select-none pointer-events-auto"
                draggable={false}
              />
            </motion.div>

            {/* Floating Tag 1: IIT Guwahati */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-2 right-4 sm:right-10 z-20 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-brand-pink" />
              <span className="text-xs font-bold text-gray-800">{personalInfo.institution}</span>
            </motion.div>

            {/* Floating Tag 2: Available for Projects */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute bottom-6 left-2 sm:left-6 z-20 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-700">Open to design opportunities</span>
            </motion.div>

          </div>
        </motion.div>

        {/* Right Column: Hero Typography & Call-To-Actions */}
        <motion.div 
          className="lg:col-span-6 flex flex-col justify-center text-left order-1 lg:order-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-brand-pink text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Design Portfolio 2026</span>
          </div>

          {/* Main Headline with Typewriter Effect */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.15] mb-4 min-h-[2.4em] sm:min-h-[2.3em]">
            Hi,<br />
            I’m{' '}
            <span className="text-brand-pink inline-block relative font-black">
              {text}
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-brand-pink ml-1.5 animate-cursor rounded-full align-baseline shadow-sm" />
            </span>
          </h1>

          {/* Role Subtitle */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-6 tracking-tight flex items-center gap-2">
            <span>Creative Visual Designer</span>
            <span className="text-brand-pink">|</span>
            <span>UX Designer</span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-10 font-normal">
            {personalInfo.heroBio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* CV Button (Exact Figma Black Pill) */}
            <a
              href={personalInfo.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-dark hover:bg-black text-white text-base font-semibold transition-all hover:shadow-xl hover:scale-105 active:scale-95 group"
            >
              <span>Curriculum Vitae</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            {/* Explore Work */}
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.getElementById('work');
                if (elem) {
                  const navOffset = 80;
                  const pos = elem.getBoundingClientRect().top + window.pageYOffset - navOffset;
                  window.scrollTo({ top: pos, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-base font-semibold transition-all hover:shadow-md hover:border-gray-300 cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 text-brand-pink" />
            </a>
          </div>

          {/* Quick Social Links Bar */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-6 text-sm text-gray-500 font-medium">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Connect:</span>
            <a 
              href={personalInfo.links.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-pink transition-colors"
            >
              LinkedIn ↗
            </a>
            <a 
              href={personalInfo.links.behance} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-pink transition-colors"
            >
              Behance ↗
            </a>
            <a 
              href={personalInfo.links.notion} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-pink transition-colors"
            >
              Notion ↗
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
