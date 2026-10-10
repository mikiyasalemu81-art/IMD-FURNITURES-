'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { NeutralPlaceholderBlock } from './PlaceholderImage';
import { BusinessSettings } from '@/lib/types';
import { isRealPhotoAvailable, getOptimizedImageUrl } from '@/lib/cloudinary';

interface HeroSlideshowProps {
  settings?: BusinessSettings;
  onOpenCustomOrder?: () => void;
}

export function HeroSlideshow({ settings, onOpenCustomOrder }: HeroSlideshowProps) {
  const { t, getLocalized } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on hero section scroll
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 140]);
  const contentParallaxY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 70]);

  const heroImages =
    settings?.heroImages && settings.heroImages.length > 0
      ? settings.heroImages
      : [
          '/hero/hero-1.jpg',
          '/hero/hero-2.jpg',
          '/hero/hero-3.jpg',
          '/hero/hero-4.jpg',
          '/hero/hero-5.jpg',
        ];

  // Rotate every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const currentImageSrc = heroImages[currentIndex];
  const isFailed = failedImages[currentIndex];
  const isAvailable = isRealPhotoAvailable(currentImageSrc) && !isFailed;
  const optimizedUrl = getOptimizedImageUrl(currentImageSrc);

  const sentence = getLocalized(settings?.heroSentence) || t.hero.defaultSentence;

  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      const top = galleryEl.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', '#gallery');
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-[94vh] min-h-[640px] max-h-[1100px] flex items-center justify-center overflow-hidden bg-[#0B0B0B]"
    >
      {/* Background Slideshow Layer with gentle parallax and slow zoom */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: 1,
              scale: shouldReduceMotion ? 1 : 1.06,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 6, ease: 'linear' },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {isAvailable && optimizedUrl ? (
              <Image
                src={optimizedUrl}
                alt={`IMD Furniture Masterpiece ${currentIndex + 1}`}
                fill
                priority={currentIndex === 0}
                sizes="100vw"
                className="object-cover object-center"
                onError={() => {
                  setFailedImages((prev) => ({ ...prev, [currentIndex]: true }));
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#0B0B0B] p-8">
                <NeutralPlaceholderBlock
                  label={`${t.gallery.photoComingSoon} (Hero 0${currentIndex + 1})`}
                  className="w-full max-w-4xl h-[70vh] rounded-none"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Luxury Dark Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-[#0B0B0B]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B0B0B]/40 to-[#0B0B0B] pointer-events-none" />

      {/* Content Container */}
      <motion.div
        style={{ y: contentParallaxY }}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center will-change-transform"
      >
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-[#C9A24B]/40 mb-6 shadow-gold-glow backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#F5F1E8] font-medium font-sans">
            Century Mall · Addis Ababa, Ethiopia
          </span>
        </motion.div>

        {/* Brand Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F1E8] mb-6 leading-[1.1]"
        >
          IMD <span className="text-[#C9A24B] italic font-normal">Furniture</span> & Design
        </motion.h1>

        {/* The One Elegant Sentence */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-base sm:text-xl md:text-2xl text-[#F5F1E8]/90 max-w-3xl font-light leading-relaxed mb-10 tracking-wide font-serif"
        >
          &ldquo;{sentence}&rdquo;
        </motion.p>

        {/* Action Buttons: "View Gallery" (scrolls to #gallery) and "Custom Order" */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <a
            href="#gallery"
            onClick={scrollToGallery}
            className="w-full sm:w-auto px-8 py-4 rounded-none bg-[#C9A24B] text-[#0B0B0B] font-serif text-xs md:text-sm tracking-widest uppercase font-semibold hover:bg-[#E0BB63] shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>{t.hero.viewGallery}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            type="button"
            onClick={onOpenCustomOrder}
            className="w-full sm:w-auto px-8 py-4 rounded-none bg-[#141414]/90 border border-[#C9A24B]/50 text-[#F5F1E8] font-serif text-xs md:text-sm tracking-widest uppercase font-semibold hover:border-[#E0BB63] hover:text-[#C9A24B] hover:bg-[#1C1C1C] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C9A24B]" />
            <span>{t.hero.customOrder}</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Slide Indicators: 5 slots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-2.5">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-500 rounded-full ${
              currentIndex === idx
                ? 'w-8 h-1.5 bg-[#C9A24B] shadow-[0_0_8px_rgba(201,162,75,0.8)]'
                : 'w-2 h-1.5 bg-[#F5F1E8]/30 hover:bg-[#F5F1E8]/60'
            }`}
            aria-label={`Jump to hero slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
