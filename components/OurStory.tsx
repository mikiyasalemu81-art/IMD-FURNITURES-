'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ImageWithFallback } from './PlaceholderImage';
import { useLanguage } from './LanguageContext';
import { BusinessSettings } from '@/lib/types';
import { Compass } from 'lucide-react';

interface OurStoryProps {
  settings?: BusinessSettings;
}

export function OurStory({ settings }: OurStoryProps) {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const photoParallax = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-35, 35]
  );

  const storyParagraphs = settings?.storyParagraphs
    ? settings.storyParagraphs[language] || settings.storyParagraphs.en
    : [];

  const storyImage = settings?.storyImage || '/story/story-showroom.jpg';

  return (
    <section
      id="story"
      ref={sectionRef}
      className="parallax-3d-scene py-24 sm:py-32 bg-[#0B0B0B] relative overflow-hidden perspective-[1200px]"
    >
      {/* Subtle architectural ambient background glow */}
      <div className="parallax-depth-bg absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C9A24B]/5 rounded-full blur-3xl pointer-events-none will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="split-plane-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Workshop Photo with split plane & velocity skew */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="split-plane-left lg:col-span-5 relative will-change-transform"
          >
            <div className="velocity-skew relative aspect-[4/5] w-full overflow-hidden border border-[#C9A24B]/30 shadow-2xl group will-change-transform">
              <motion.div
                style={{ y: photoParallax }}
                className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform"
              >
                <ImageWithFallback
                  src={storyImage}
                  alt="IMD Furniture Master Carpentry Workshop Addis Ababa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Inset Gold Border Accent */}
              <div className="absolute inset-3 border border-[#C9A24B]/20 pointer-events-none z-10" />

              {/* Floating Atelier Seal */}
              <div className="parallax-depth-fg absolute bottom-6 left-6 right-6 p-4 bg-[#0B0B0B]/90 backdrop-blur-md border border-[#C9A24B]/30 z-10 will-change-transform">
                <p className="font-serif text-[#C9A24B] text-xs uppercase tracking-widest font-semibold mb-1">
                  Master Joinery Atelier
                </p>
                <p className="text-xs text-[#F5F1E8]/80 font-light">
                  Century Mall · Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Warm, Proud Story with Opposing Split Plane */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="split-plane-right lg:col-span-7 space-y-6 will-change-transform"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#C9A24B]/30 text-xs text-[#C9A24B] font-medium tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.story.badge}</span>
            </div>

            <h2 className="kinetic-text font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight leading-[1.15]">
              {t.story.heading}
            </h2>

            {/* 3 Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[#9A9588] leading-relaxed font-light">
              {storyParagraphs.map((para, index) => (
                <p key={index} className="text-[#F5F1E8]/85">
                  {para}
                </p>
              ))}
            </div>

            {/* Atelier Value Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#1C1C1C]">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#C9A24B]">
                  100%
                </span>
                <span className="text-xs text-[#9A9588] uppercase tracking-wider">
                  Solid Timber & Joinery
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#C9A24B]">
                  5.0 ★
                </span>
                <span className="text-xs text-[#9A9588] uppercase tracking-wider">
                  Verified Google Rating
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#C9A24B]">
                  Bespoke
                </span>
                <span className="text-xs text-[#9A9588] uppercase tracking-wider">
                  Made in Addis Ababa
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
