'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Compass, Hammer, Truck, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CraftStep } from '@/lib/types';

interface CraftProcessProps {
  steps?: CraftStep[];
}

export function CraftProcess({ steps }: CraftProcessProps) {
  const { t, getLocalized } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    MessageSquare: <MessageSquare className="w-6 h-6 text-[#C9A24B]" />,
    Compass: <Compass className="w-6 h-6 text-[#C9A24B]" />,
    Hammer: <Hammer className="w-6 h-6 text-[#C9A24B]" />,
    Truck: <Truck className="w-6 h-6 text-[#C9A24B]" />,
  };

  const processItems = steps && steps.length > 0
    ? steps.map((s) => ({
        step: s.step,
        title: getLocalized(s.title),
        desc: getLocalized(s.description),
        icon: iconMap[s.iconName] || <Sparkles className="w-6 h-6 text-[#C9A24B]" />,
      }))
    : [
        {
          step: 1,
          title: t.craft.step1Title,
          desc: t.craft.step1Desc,
          icon: <MessageSquare className="w-6 h-6 text-[#C9A24B]" />,
        },
        {
          step: 2,
          title: t.craft.step2Title,
          desc: t.craft.step2Desc,
          icon: <Compass className="w-6 h-6 text-[#C9A24B]" />,
        },
        {
          step: 3,
          title: t.craft.step3Title,
          desc: t.craft.step3Desc,
          icon: <Hammer className="w-6 h-6 text-[#C9A24B]" />,
        },
        {
          step: 4,
          title: t.craft.step4Title,
          desc: t.craft.step4Desc,
          icon: <Truck className="w-6 h-6 text-[#C9A24B]" />,
        },
      ];

  return (
    <section
      id="process"
      className="py-24 sm:py-32 bg-[#0E0E0E] relative border-t border-b border-[#C9A24B]/15 overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C9A24B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#C9A24B]/30 text-xs text-[#C9A24B] font-medium tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.craft.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight">
            {t.craft.heading}
          </h2>
          <p className="mt-4 text-base text-[#9A9588] font-light leading-relaxed">
            {t.craft.subheading}
          </p>
        </motion.div>

        {/* Timeline Grid (4 steps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Subtle connecting line across desktop */}
          <div className="hidden lg:block absolute top-14 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/30 to-transparent pointer-events-none" />

          {processItems.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
              className="relative flex flex-col items-center text-center p-8 bg-[#141414] border border-[#C9A24B]/20 hover:border-[#C9A24B]/60 transition-colors duration-400 hover:shadow-gold-glow group"
            >
              {/* Icon Container with glowing gold border */}
              <div className="relative w-16 h-16 rounded-full bg-[#0B0B0B] border border-[#C9A24B]/50 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-[#E0BB63] transition-transform duration-300 shadow-[0_0_15px_rgba(201,162,75,0.15)]">
                {item.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C9A24B] text-[#0B0B0B] text-xs font-serif font-bold flex items-center justify-center">
                  {item.step}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#F5F1E8] mb-3 group-hover:text-[#E0BB63] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-[#9A9588] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
