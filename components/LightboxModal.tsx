'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MessageCircle, Share2, Heart, Check, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './PlaceholderImage';
import { useLanguage } from './LanguageContext';
import { useSavedPieces } from './SavedPiecesContext';
import { FurnitureItem } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/business';

interface LightboxModalProps {
  items: FurnitureItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  whatsapp?: string;
}

export function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
  whatsapp = '+251 93 032 9010',
}: LightboxModalProps) {
  const { language, t, getLocalized } = useLanguage();
  const { isSaved, toggleSave } = useSavedPieces();
  const [copied, setCopied] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      // Swiped Left -> Next
      if (currentIndex !== null) onNavigate((currentIndex + 1) % items.length);
    } else if (diff < -50) {
      // Swiped Right -> Prev
      if (currentIndex !== null) onNavigate((currentIndex - 1 + items.length) % items.length);
    }
    setTouchStart(null);
  };

  if (!isOpen || !currentItem) return null;

  const title = getLocalized(currentItem.title);
  const desc = getLocalized(currentItem.description);
  const saved = isSaved(currentItem.id);

  const pieceUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?item=${currentItem.slug}#gallery`
    : `https://imdfurniture.com/?item=${currentItem.slug}#gallery`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} | IMD Furniture & Design`,
          text: desc,
          url: pieceUrl,
        });
        return;
      } catch {
        // user cancelled or share unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(pieceUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleOrderSimilar = () => {
    let text = '';
    if (language === 'am') {
      text = `ሰላም አይኤምዲ ፈርኒቸር!\nበማዕከለ-ስዕላትዎ ላይ የተመለከትኩትን "${title}" (${pieceUrl}) የመሰለ ልዩ እቃ ማሰራት እፈልጋለሁ።`;
    } else if (language === 'om') {
      text = `Nagaa IMD Faarnichar!\nGaallarii keessanirraa meeshaa "${title}" (${pieceUrl}) jedhu kanaan kan wal fakkaatu hojjechiisuun barbaada.`;
    } else {
      text = `Hello IMD Furniture & Design!\nI am interested in commissioning a bespoke piece similar to "${title}" (${pieceUrl}).`;
    }

    window.open(buildWhatsAppLink(whatsapp, text), '_blank');
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#070707]/95 backdrop-blur-xl select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Controls Bar */}
        <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between text-[#F5F1E8]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xs uppercase tracking-widest text-[#C9A24B]">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="text-xs text-[#9A9588] hidden sm:inline">
              · Century Mall Atelier Showcase
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Heart Button */}
            <button
              type="button"
              onClick={() => toggleSave(currentItem)}
              className={`p-2.5 rounded-full border transition-all ${
                saved
                  ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0B0B0B]'
                  : 'bg-[#141414] border-[#C9A24B]/30 text-[#F5F1E8] hover:text-[#C9A24B]'
              }`}
              aria-label="Save piece"
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-full bg-[#141414] border border-[#C9A24B]/30 text-[#F5F1E8] hover:text-[#C9A24B] transition-colors relative"
              aria-label="Share piece"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close Lightbox */}
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#141414] border border-[#C9A24B]/30 text-[#F5F1E8] hover:text-[#C9A24B] transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
          className="absolute left-3 sm:left-6 z-40 p-3 rounded-full bg-[#141414]/80 border border-[#C9A24B]/30 text-[#F5F1E8] hover:text-[#C9A24B] hover:border-[#E0BB63] transition-all backdrop-blur-sm"
          aria-label="Previous piece"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate((currentIndex + 1) % items.length)}
          className="absolute right-3 sm:right-6 z-40 p-3 rounded-full bg-[#141414]/80 border border-[#C9A24B]/30 text-[#F5F1E8] hover:text-[#C9A24B] hover:border-[#E0BB63] transition-all backdrop-blur-sm"
          aria-label="Next piece"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Center Lightbox Card */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl w-full max-h-[85vh] flex flex-col lg:flex-row bg-[#141414] border border-[#C9A24B]/40 shadow-2xl overflow-hidden my-auto"
        >
          {/* Main Photo Area (60%) */}
          <div className="relative w-full lg:w-3/5 h-[340px] sm:h-[420px] lg:h-[560px] bg-[#0B0B0B] flex items-center justify-center overflow-hidden">
            <ImageWithFallback
              src={currentItem.image}
              alt={title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Piece Details Sidebar (40%) */}
          <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#C9A24B]/20 bg-[#141414] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-serif font-semibold bg-[#0B0B0B] text-[#C9A24B] border border-[#C9A24B]/30">
                  {currentItem.category.replace('-', ' ')}
                </span>
                <span className="text-xs text-[#9A9588]">
                  IMD Original
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1E8] leading-tight">
                {title}
              </h2>

              <p className="text-sm text-[#9A9588] font-light leading-relaxed">
                {desc}
              </p>

              {/* Specs pill list if present */}
              {currentItem.specs && (
                <div className="pt-2 border-t border-[#1C1C1C] space-y-2 text-xs">
                  {currentItem.specs.dimensions && (
                    <div className="flex justify-between py-1 border-b border-[#1C1C1C]/60">
                      <span className="text-[#9A9588]">Dimensions:</span>
                      <span className="text-[#F5F1E8] font-light">{currentItem.specs.dimensions}</span>
                    </div>
                  )}
                  {currentItem.specs.materials && (
                    <div className="flex justify-between py-1 border-b border-[#1C1C1C]/60">
                      <span className="text-[#9A9588]">Timber & Materials:</span>
                      <span className="text-[#F5F1E8] font-light">{currentItem.specs.materials}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={handleOrderSimilar}
                className="w-full py-3.5 px-4 bg-[#C9A24B] hover:bg-[#E0BB63] text-[#0B0B0B] font-serif text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-glow transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.gallery.orderSimilar}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="w-full py-2.5 px-4 bg-[#1C1C1C] hover:bg-[#252525] border border-[#C9A24B]/30 text-[#F5F1E8] text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>{copied ? t.gallery.linkCopied : t.gallery.share}</span>
              </button>

              {copied && (
                <div className="text-center text-xs text-emerald-400 font-light">
                  {t.gallery.linkCopied}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
