'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function MorphingShowcase() {
  const { language } = useLanguage();

  const titleByLang = {
    en: 'Where Heirloom Timber Meets Master Joinery',
    am: 'የኢትዮጵያ ምርጥ እንጨት ከላቀ የስነ-ህንፃ ጥበብ ጋር የሚገናኝበት',
    om: 'Iddoo Mukti Qulqulluun Ogummaa Harkaatiin Faayamu',
  };

  const subtitleByLang = {
    en: 'Every signature commission is hand-sculpted in Addis Ababa using seasoned Wanza and Tid, mortise-and-tenon construction, and hand-rubbed organic finishes.',
    am: 'እያንዳንዱ ልዩ እቃ በአዲስ አበባ በዋንዛ እና ጥድ እንጨቶች፣ ጠንካራ መገጣጠሚያዎች እና ተፈጥሯዊ ዘይቶች በባለሙያ እጅ ይሰራል።',
    om: 'Hojiiwwan keenya hundi Finfinnee keessatti mukeen Waanzaa fi Xidiitiin harka ogeessaatiin qulqullinaan hojjatamu.',
  };

  return (
    <div className="morphing-geometry-trigger relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#070707] perspective-[1200px]">
      {/* Expanding Morphing Card */}
      <div className="morphing-geometry-card relative h-[80vh] max-h-[720px] overflow-hidden border border-[#C9A24B]/40 bg-[#0B0B0B] flex flex-col justify-between items-center text-center will-change-transform">
        {/* Full-Bleed Background Imagery */}
        <div className="morphing-geometry-backdrop absolute inset-0 w-full h-full will-change-transform will-change-opacity">
          <Image
            src="/hero/hero-2.jpg"
            alt="IMD Furniture Atelier Interior Architecture"
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[1.1] contrast-[1.08]"
            priority={false}
          />
          {/* Subtle Luminous Gold Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/95 via-[#0B0B0B]/55 to-[#070707]/80" />
        </div>

        {/* Top Floating Badge */}
        <div className="relative z-10 pt-8 sm:pt-12 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-[#C9A24B]/50 backdrop-blur-md shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#F5F1E8] font-serif font-medium">
              Century Mall Flagship Atelier
            </span>
          </div>
        </div>

        {/* Center Kinetic Statement */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 my-auto">
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F1E8] tracking-tight mb-4 sm:mb-6 leading-[1.15] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {titleByLang[language] || titleByLang.en}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#F5F1E8]/85 max-w-2xl mx-auto font-light leading-relaxed font-serif drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {subtitleByLang[language] || subtitleByLang.en}
          </p>
        </div>

        {/* Bottom Seal Strip */}
        <div className="relative z-10 pb-8 sm:pb-12 px-6 flex items-center gap-6 text-[#9A9588] text-[11px] uppercase tracking-widest font-serif">
          <span className="flex items-center gap-1.5 text-[#C9A24B]">
            <Compass className="w-3.5 h-3.5" />
            <span>Mortise & Tenon</span>
          </span>
          <span className="hidden sm:inline text-[#C9A24B]/40">·</span>
          <span className="hidden sm:inline">Seasoned Ethiopian Hardwoods</span>
          <span className="hidden sm:inline text-[#C9A24B]/40">·</span>
          <span>Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </div>
  );
}
