'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Trash2, MessageCircle, ExternalLink } from 'lucide-react';
import { useSavedPieces } from './SavedPiecesContext';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './PlaceholderImage';
import { buildWhatsAppLink } from '@/lib/business';

interface SavedPiecesDrawerProps {
  whatsapp?: string;
}

export function SavedPiecesDrawer({ whatsapp = '+251 93 032 9010' }: SavedPiecesDrawerProps) {
  const { savedItems, savedCount, isDrawerOpen, closeDrawer, removeSaved, clearSaved, openDrawer } = useSavedPieces();
  const { language, t, getLocalized } = useLanguage();

  const handleSendListWhatsApp = () => {
    if (savedItems.length === 0) return;

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://imdfurniture.com';
    let text = '';

    if (language === 'am') {
      text = `ሰላም አይኤምዲ ፈርኒቸር (IMD Furniture)!\nከማዕከለ-ስዕላትዎ የሚከተሉትን ${savedItems.length} የተመረጡ የቤት እቃዎች ወድጄ አስቀምጫለሁ፡\n\n`;
      savedItems.forEach((item, idx) => {
        text += `${idx + 1}. ${getLocalized(item.title)} — ${origin}/gallery/${item.slug}\n`;
      });
      text += `\nእባክዎን ለእነዚህ እቃዎች የምክክርና የዋጋ መረጃ ይስጡኝ።`;
    } else if (language === 'om') {
      text = `Nagaa IMD Faarnichar!\nGaallarii keessanirraa meeshaalee armaan gadii ${savedItems.length} filadheen ture:\n\n`;
      savedItems.forEach((item, idx) => {
        text += `${idx + 1}. ${getLocalized(item.title)} — ${origin}/gallery/${item.slug}\n`;
      });
      text += `\nMarii fi gatii meeshaalee kanaa natti himaa.`;
    } else {
      text = `Hello IMD Furniture & Design!\nI have saved these ${savedItems.length} pieces from your showcase website:\n\n`;
      savedItems.forEach((item, idx) => {
        text += `${idx + 1}. ${getLocalized(item.title)} — ${origin}/gallery/${item.slug}\n`;
      });
      text += `\nI would love to arrange a bespoke consultation at Century Mall for these pieces.`;
    }

    const url = buildWhatsAppLink(whatsapp, text);
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating "Saved (n)" Trigger Button */}
      {savedCount > 0 && !isDrawerOpen && (
        <div className="fixed bottom-6 left-6 z-40">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openDrawer}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#141414] border border-[#C9A24B]/60 text-[#C9A24B] shadow-[0_0_20px_rgba(201,162,75,0.25)] hover:bg-[#1C1C1C] hover:border-[#E0BB63] transition-all font-serif text-xs font-bold uppercase tracking-wider"
            aria-label="Open Saved Pieces Drawer"
          >
            <Heart className="w-4 h-4 fill-[#C9A24B]" />
            <span>Saved ({savedCount})</span>
          </motion.button>
        </div>
      )}

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-[#0B0B0B]/80 backdrop-blur-sm"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="w-screen max-w-md bg-[#141414] border-l border-[#C9A24B]/30 flex flex-col shadow-2xl text-[#F5F1E8]"
              >
                {/* Header */}
                <div className="p-6 border-b border-[#1C1C1C] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-5 h-5 text-[#C9A24B] fill-[#C9A24B]" />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                        {t.savedDrawer.title}
                      </h3>
                      <span className="text-xs text-[#9A9588]">
                        {savedCount} {t.savedDrawer.itemCount}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="p-2 text-[#9A9588] hover:text-[#C9A24B] rounded-full hover:bg-[#1C1C1C] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {savedItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#9A9588]">
                      <Heart className="w-12 h-12 text-[#C9A24B]/30 mb-4 stroke-1" />
                      <p className="text-sm font-light leading-relaxed">
                        {t.savedDrawer.empty}
                      </p>
                    </div>
                  ) : (
                    savedItems.map((item) => {
                      const title = getLocalized(item.title);

                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-[#0B0B0B] border border-[#1C1C1C] hover:border-[#C9A24B]/40 transition-colors group"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-16 h-16 flex-shrink-0 bg-[#141414] overflow-hidden border border-[#C9A24B]/20">
                            <ImageWithFallback
                              src={item.image}
                              alt={title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-semibold text-[#F5F1E8] truncate group-hover:text-[#E0BB63] transition-colors">
                              <Link href={`/gallery/${item.slug}`} onClick={closeDrawer}>
                                {title}
                              </Link>
                            </h4>
                            <span className="text-[10px] uppercase tracking-wider text-[#C9A24B] block mt-0.5">
                              {item.category.replace('-', ' ')}
                            </span>
                          </div>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => removeSaved(item.id)}
                            className="p-2 text-[#68645C] hover:text-red-400 transition-colors"
                            aria-label="Remove item from saved"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Actions */}
                {savedItems.length > 0 && (
                  <div className="p-6 border-t border-[#1C1C1C] bg-[#0E0E0E] space-y-3">
                    <button
                      type="button"
                      onClick={handleSendListWhatsApp}
                      className="w-full py-3.5 px-4 bg-[#C9A24B] hover:bg-[#E0BB63] text-[#0B0B0B] font-serif text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-glow transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.savedDrawer.sendWhatsApp}</span>
                    </button>

                    <button
                      type="button"
                      onClick={clearSaved}
                      className="w-full py-2 text-xs text-[#9A9588] hover:text-red-400 font-light text-center transition-colors"
                    >
                      {t.savedDrawer.clearAll}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
