'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { OpenClosedBadge } from './OpenClosedBadge';
import { useLanguage } from './LanguageContext';
import { Language, BusinessHours } from '@/lib/types';
import { buildTelLink } from '@/lib/business';

interface NavbarProps {
  hours?: BusinessHours;
  phoneCall?: string;
  whatsapp?: string;
}

export function Navbar({ hours, phoneCall = '+251984795010' }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to highlight current active section while scrolling
  useEffect(() => {
    const sectionIds = ['home', 'story', 'gallery', 'process', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { id: 'home', href: '#home', label: t.nav.home },
    { id: 'story', href: '#story', label: t.nav.story },
    { id: 'gallery', href: '#gallery', label: t.nav.gallery },
    { id: 'process', href: '#process', label: t.nav.process },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'am', label: 'Amharic', native: 'አማርኛ' },
    { code: 'om', label: 'Afan Oromo', native: 'Afaan Oromoo' },
  ];

  const currentLangLabel = languages.find((l) => l.code === language)?.code.toUpperCase() || 'EN';

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-400 ${
        scrolled
          ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#C9A24B]/20 shadow-[0_4px_30px_rgba(0,0,0,0.85)]'
          : 'bg-[#0B0B0B]/80 backdrop-blur-sm border-b border-[#C9A24B]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-22">
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Anchor Links with Smooth Gold Underline Sweep */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToAnchor(e, link.href)}
                  className={`relative px-3.5 py-2 font-serif text-xs lg:text-sm tracking-widest uppercase transition-colors duration-300 ${
                    isActive
                      ? 'text-[#C9A24B] font-semibold'
                      : 'text-[#F5F1E8]/75 hover:text-[#E0BB63]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#C9A24B] via-[#E0BB63] to-[#C9A24B] shadow-[0_0_8px_rgba(201,162,75,0.7)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Live Open Badge, Language Switcher, and Gold Call Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <OpenClosedBadge hours={hours} compact />

            {/* Language Switcher Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141414] border border-[#C9A24B]/30 text-xs font-medium text-[#F5F1E8] hover:border-[#E0BB63] hover:text-[#C9A24B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B]"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span className="tracking-wider">{currentLangLabel}</span>
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 rounded-md bg-[#141414] border border-[#C9A24B]/35 shadow-2xl py-1 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                          language === lang.code
                            ? 'bg-[#C9A24B]/15 text-[#C9A24B] font-semibold'
                            : 'text-[#F5F1E8] hover:bg-[#1C1C1C] hover:text-[#E0BB63]'
                        }`}
                      >
                        <span>{lang.native}</span>
                        <span className="text-[10px] text-[#9A9588] uppercase">{lang.code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Gold Call Now Button */}
            <a
              href={buildTelLink(phoneCall)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A24B] hover:bg-[#E0BB63] text-[#0B0B0B] font-serif text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(201,162,75,0.25)] hover:shadow-[0_4px_24px_rgba(201,162,75,0.45)]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.nav.call}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Compact Open Badge + Hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            <OpenClosedBadge hours={hours} compact className="text-[10px] py-0 px-2" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-[#141414] border border-[#C9A24B]/20 text-[#F5F1E8] hover:text-[#C9A24B]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A24B]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer with Smooth Slide-In */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden bg-[#0B0B0B]/98 border-b border-[#C9A24B]/25 px-5 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToAnchor(e, link.href)}
                    className={`font-serif text-base tracking-widest uppercase py-2.5 border-b border-[#1C1C1C] flex items-center justify-between transition-colors ${
                      isActive
                        ? 'text-[#C9A24B] font-semibold pl-2 border-[#C9A24B]/40'
                        : 'text-[#F5F1E8]/80 hover:text-[#E0BB63]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="text-[#C9A24B] text-xs">◆</span>}
                  </a>
                );
              })}

              {/* Language Switcher in Mobile Drawer */}
              <div className="pt-3">
                <span className="text-xs uppercase tracking-widest text-[#9A9588] block mb-2 font-serif">
                  Language / ቋንቋ
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`py-2 px-2 rounded border text-xs text-center transition-all ${
                        language === lang.code
                          ? 'border-[#C9A24B] bg-[#C9A24B]/15 text-[#C9A24B] font-semibold'
                          : 'border-[#1C1C1C] bg-[#141414] text-[#F5F1E8]'
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Gold Call Action Button */}
              <div className="pt-4">
                <a
                  href={buildTelLink(phoneCall)}
                  className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#C9A24B] text-[#0B0B0B] font-serif text-xs font-bold uppercase tracking-wider hover:bg-[#E0BB63] shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.nav.call}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
