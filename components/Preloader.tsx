'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const SESSION_STORAGE_KEY = 'imd_preloader_seen';
const MIN_DISPLAY_MS = 1500;
const MAX_DISPLAY_MS = 4000;

export function Preloader() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Whether the overlay is rendered in the DOM
  const [mounted, setMounted] = useState(false);
  // Whether the overlay is visible (false triggers Framer Motion exit animation)
  const [isVisible, setIsVisible] = useState(false);
  // Fallback state if physical /public/logo.png is not yet present
  const [imgError, setImgError] = useState(false);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      document.documentElement.classList.add('preloader-done');
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

  useEffect(() => {
    // Check if user already saw the preloader in this visit/session
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forcePreview = urlParams.get('preview_preloader') === 'true';
      const alreadySeen = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';

      if (alreadySeen && !forcePreview) {
        document.documentElement.classList.add('preloader-done');
        return;
      }
    } catch {
      // Ignore
    }

    // Mount and show preloader
    setMounted(true);
    setIsVisible(true);

    // Lock page scroll while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    let minTimePassed = false;
    let contentReady = false;
    let dismissed = false;

    const tryDismiss = () => {
      if (dismissed) return;
      if (minTimePassed && contentReady) {
        dismissed = true;
        dismiss();
      }
    };

    // Minimum display timer: 1.5 seconds
    const minTimer = setTimeout(() => {
      minTimePassed = true;
      tryDismiss();
    }, MIN_DISPLAY_MS);

    // Maximum display timer: 4 seconds
    const maxTimer = setTimeout(() => {
      if (!dismissed) {
        dismissed = true;
        dismiss();
      }
    }, MAX_DISPLAY_MS);

    // Detect page & hero image loading
    const handleContentReady = () => {
      contentReady = true;
      tryDismiss();
    };

    // Preload hero image
    const heroImg = new window.Image();
    heroImg.src = '/hero/hero-1.jpg';
    if (heroImg.complete) {
      if (document.readyState === 'complete') {
        handleContentReady();
      } else {
        window.addEventListener('load', handleContentReady, { once: true });
      }
    } else {
      let heroLoaded = false;
      let windowLoaded = document.readyState === 'complete';

      const checkBoth = () => {
        if (heroLoaded && windowLoaded) {
          handleContentReady();
        }
      };

      heroImg.onload = () => {
        heroLoaded = true;
        checkBoth();
      };
      heroImg.onerror = () => {
        // Fail gracefully without stalling
        heroLoaded = true;
        checkBoth();
      };

      if (!windowLoaded) {
        window.addEventListener(
          'load',
          () => {
            windowLoaded = true;
            checkBoth();
          },
          { once: true }
        );
      }
    }

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [dismiss]);

  // Clean up scroll lock when exit animation finishes and unmount
  const handleExitComplete = () => {
    document.body.style.overflow = '';
    setMounted(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          id="imd-preloader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0B0B0B] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle background ambient gold vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,75,0.06)_0%,rgba(11,11,11,0.98)_70%)] pointer-events-none" />

          {/* Central stage for arcs & logo */}
          <div className="relative flex items-center justify-center w-[260px] h-[260px] md:w-[320px] md:h-[320px]">
            {/* Rotating gold circular arcs */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer decorative dashed orbit */}
              <circle
                cx="160"
                cy="160"
                r="148"
                stroke="#C9A24B"
                strokeWidth="0.75"
                strokeDasharray="2 12"
                opacity="0.2"
              />

              {/* Outer Arc: 2px thick, clockwise rotation */}
              <motion.circle
                cx="160"
                cy="160"
                r="136"
                stroke="#C9A24B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="210 644"
                animate={
                  shouldReduceMotion
                    ? { opacity: [0.35, 0.9, 0.35] }
                    : { rotate: 360 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 6.5, repeat: Infinity, ease: 'linear' }
                }
                style={{ transformOrigin: 'center center' }}
                className="drop-shadow-[0_0_8px_rgba(201,162,75,0.45)]"
              />

              {/* Inner Arc: 1.5px thick, counter-clockwise rotation at different speed */}
              <motion.circle
                cx="160"
                cy="160"
                r="118"
                stroke="#C9A24B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="140 601"
                opacity="0.85"
                animate={
                  shouldReduceMotion
                    ? { opacity: [0.8, 0.3, 0.8] }
                    : { rotate: -360 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 4.6, repeat: Infinity, ease: 'linear' }
                }
                style={{ transformOrigin: 'center center' }}
                className="drop-shadow-[0_0_6px_rgba(201,162,75,0.35)]"
              />
            </svg>

            {/* Center Logo with fade-in and scale from 0.92 to 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex items-center justify-center p-3"
            >
              {!imgError ? (
                <div className="relative w-[140px] h-[80px] md:w-[180px] md:h-[100px] flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="IMD Furniture & Design"
                    fill
                    sizes="(max-width: 768px) 140px, 180px"
                    className="object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                    priority
                    onError={() => setImgError(true)}
                  />
                </div>
              ) : (
                /* Neutral luxury dark placeholder with gold border if physical file is not yet copied */
                <div className="w-[140px] md:w-[180px] py-3 px-4 bg-[#141414] border border-[#C9A24B]/50 rounded flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(201,162,75,0.12)]">
                  <span className="font-serif text-[#C9A24B] font-bold text-sm md:text-base tracking-[0.2em] leading-tight">
                    IMD FURNITURE
                  </span>
                  <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-[#9A9588] uppercase mt-1">
                    & DESIGN
                  </span>
                  <span className="text-[7px] text-[#C9A24B]/70 tracking-widest uppercase mt-1.5 border-t border-[#C9A24B]/20 pt-1">
                    Photo coming soon
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Muted translation text below the logo in active language */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="relative z-10 mt-8 flex flex-col items-center gap-2 px-6"
          >
            <p className="text-[#9A9588] text-xs md:text-sm tracking-[0.28em] uppercase font-light text-center">
              {t.preloader.tagline}
            </p>
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/50 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
