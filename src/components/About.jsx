import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, interests, craftGallery } from '../data/portfolioData';
import { 
  BookOpen, 
  PenTool, 
  Music, 
  Feather, 
  Camera, 
  Activity, 
  Film, 
  Utensils, 
  Layers, 
  Sparkles, 
  Heart,
  Eye
} from 'lucide-react';

const iconMap = {
  BookOpen,
  PenTool,
  Music,
  Feather,
  Camera,
  Activity,
  Film,
  Utensils,
  Layers
};

export default function About({ onSelectCraft }) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for infinite seamless sliding loop
  const duplicatedGallery = [...craftGallery, ...craftGallery];

  return (
    <section id="about" className="pt-20 pb-12 px-6 sm:px-8 bg-white relative overflow-hidden scroll-mt-20">
      
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-pink-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        
        {/* Section Heading (Matching Figma "A little about me") */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-brand-pink text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>Story & Philosophy</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            A little about me
          </h2>
        </div>

        {/* Top Split: Photo & Personal Narrative (Matching Figma frame 12:333) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Sneha's Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-sm w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200">
                <img
                  src="/assets/sneha_profile.png"
                  alt="Sneha Kakde"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Narrative Bio */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Hi, I’m <span className="text-brand-pink">Sneha</span>
            </h3>

            <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-semibold">
              {personalInfo.extendedBio[0]}
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {personalInfo.extendedBio[1]}
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {personalInfo.extendedBio[2]}
            </p>
          </motion.div>

        </div>

        {/* Interests Cards Grid (Matching Figma Icon Cards) */}
        <div id="interests" className="space-y-8 pt-8 border-t border-gray-100 scroll-mt-20">
          <div className="text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
              Different interests. One curious mind.
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl">
              {personalInfo.interestsPhilosophy}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {interests.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Sparkles;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Clean Minimal Icon (Matching Figma line style) */}
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-pink-50 text-gray-700 group-hover:text-brand-pink flex items-center justify-center mb-5 transition-colors">
                      <IconComponent className="w-6 h-6 stroke-[1.5]" />
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-2 group-hover:text-brand-pink transition-colors">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                    <span>{item.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-brand-pink transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quote Badge Banner (Matching Figma exact pill) */}
        <div className="flex justify-center my-8">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl text-center py-5 sm:py-6 px-6 sm:px-10 rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-gray-800">
              <span className="text-brand-pink font-extrabold">{personalInfo.quoteBadge.part1}</span>
              <span>{personalInfo.quoteBadge.middle1}</span>
              <span className="text-brand-pink font-extrabold">{personalInfo.quoteBadge.part2}</span>
              <span>{personalInfo.quoteBadge.middle2}</span>
              <span className="text-brand-pink font-extrabold">{personalInfo.quoteBadge.part3}</span>
              <span>{personalInfo.quoteBadge.ending}</span>
            </p>
          </motion.div>
        </div>

        {/* Hands-on Crafts & Studio Photo Automatic Smooth Sliding Carousel */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg sm:text-xl font-extrabold text-brand-dark flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-pink" />
              <span>Studio Experiments, Sculptures & Creative Works</span>
            </h4>
            <span className="text-xs text-gray-400 font-semibold hidden sm:inline-block">
              Hover to pause • Click to inspect
            </span>
          </div>

          {/* Smooth Auto-sliding Track */}
          <div 
            className="relative overflow-hidden py-2 -mx-6 sm:-mx-8 px-6 sm:px-8 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-5 sm:gap-6 w-max"
              animate={isPaused ? {} : { x: ['0%', '-50%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 28,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedGallery.map((craft, idx) => (
                <div
                  key={`${craft.id}-${idx}`}
                  onClick={() => onSelectCraft(craft)}
                  className="flex-shrink-0 w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-200 cursor-pointer relative group bg-gray-100 transition-all duration-300 hover:scale-[1.03]"
                >
                  <img
                    src={craft.image}
                    alt={craft.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 self-end">
                      <Eye className="w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-sm">{craft.title}</h5>
                    <p className="text-xs text-gray-300 mt-0.5">{craft.subtitle}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
