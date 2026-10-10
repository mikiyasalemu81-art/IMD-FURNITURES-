'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Filter, Eye } from 'lucide-react';
import { ImageWithFallback } from './PlaceholderImage';
import { LightboxModal } from './LightboxModal';
import { useLanguage } from './LanguageContext';
import { useSavedPieces } from './SavedPiecesContext';
import { FurnitureItem, CategoryItem } from '@/lib/types';

interface GallerySectionProps {
  furniture: FurnitureItem[];
  categories: CategoryItem[];
  whatsapp?: string;
}

export function GallerySection({
  furniture,
  categories,
  whatsapp = '+251 93 032 9010',
}: GallerySectionProps) {
  const { language, t, getLocalized } = useLanguage();
  const { isSaved, toggleSave } = useSavedPieces();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return furniture;
    return furniture.filter((item) => item.category === selectedCategory);
  }, [furniture, selectedCategory]);

  // Deep linking: /?item=slug automatically opens that item's lightbox
  useEffect(() => {
    const itemSlug = searchParams.get('item');
    if (itemSlug) {
      const foundIdx = furniture.findIndex((i) => i.slug === itemSlug);
      if (foundIdx !== -1) {
        setLightboxIndex(foundIdx);
      }
    }
  }, [searchParams, furniture]);

  const handleOpenItem = useCallback((item: FurnitureItem) => {
    const idx = furniture.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
      // Update URL search param seamlessly for sharing
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('item', item.slug);
      newUrl.hash = 'gallery';
      history.pushState(null, '', newUrl.toString());
    }
  }, [furniture]);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('item');
    newUrl.hash = 'gallery';
    history.pushState(null, '', newUrl.toString());
  }, []);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0B0B0B] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#C9A24B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#C9A24B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#C9A24B]/30 text-xs text-[#C9A24B] font-medium tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.gallery.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight mb-4">
            {t.gallery.heading}
          </h2>

          <p className="text-sm sm:text-base text-[#9A9588] font-light leading-relaxed">
            {t.gallery.subheading}
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 sm:px-5 py-2 rounded-full font-serif text-xs uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-[#C9A24B] text-[#0B0B0B] font-bold shadow-gold-glow'
                : 'bg-[#141414] text-[#F5F1E8]/80 border border-[#C9A24B]/20 hover:border-[#C9A24B]/60 hover:text-[#C9A24B]'
            }`}
          >
            {t.gallery.filterAll}
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            const categoryName = getLocalized(cat.name);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 sm:px-5 py-2 rounded-full font-serif text-xs uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#C9A24B] text-[#0B0B0B] font-bold shadow-gold-glow'
                    : 'bg-[#141414] text-[#F5F1E8]/80 border border-[#C9A24B]/20 hover:border-[#C9A24B]/60 hover:text-[#C9A24B]'
                }`}
              >
                {categoryName}
              </button>
            );
          })}
        </motion.div>

        {/* Gallery Masonry Grid with Staggered Reveals */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((piece, index) => {
              const title = getLocalized(piece.title);
              const desc = getLocalized(piece.description);
              const saved = isSaved(piece.id);

              return (
                <motion.div
                  layout
                  key={piece.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 3) * 0.1,
                    ease: 'easeOut',
                  }}
                  className="group relative bg-[#141414] border border-[#C9A24B]/20 hover:border-[#C9A24B]/60 transition-colors duration-400 overflow-hidden flex flex-col"
                >
                  {/* Photo Container */}
                  <div
                    onClick={() => handleOpenItem(piece)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#0B0B0B] cursor-pointer"
                  >
                    <ImageWithFallback
                      src={piece.image}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Save Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(piece);
                      }}
                      className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all ${
                        saved
                          ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0B0B0B]'
                          : 'bg-[#0B0B0B]/70 border-[#C9A24B]/30 text-[#F5F1E8] hover:text-[#C9A24B]'
                      }`}
                      aria-label="Save piece to favorites"
                    >
                      <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                    </button>

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-serif font-semibold bg-[#0B0B0B]/80 text-[#C9A24B] border border-[#C9A24B]/30 backdrop-blur-sm">
                        {piece.category.replace('-', ' ')}
                      </span>
                    </div>

                    {/* View Details Quick Action Badge */}
                    <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0B0B]/90 border border-[#C9A24B]/50 text-[#C9A24B] font-serif text-[11px] tracking-wider uppercase font-medium">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </span>
                    </div>
                  </div>

                  {/* Piece Meta */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => handleOpenItem(piece)}
                        className="font-serif text-lg sm:text-xl font-bold text-[#F5F1E8] group-hover:text-[#E0BB63] transition-colors cursor-pointer mb-2"
                      >
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9A9588] font-light line-clamp-2 leading-relaxed mb-4">
                        {desc}
                      </p>
                    </div>

                    {/* View Button */}
                    <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleOpenItem(piece)}
                        className="text-xs font-serif text-[#C9A24B] hover:text-[#E0BB63] uppercase tracking-wider font-semibold inline-flex items-center gap-1 group/btn"
                      >
                        <span>{t.gallery.viewDetails}</span>
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                      </button>

                      <span className="text-[10px] text-[#68645C] tracking-widest uppercase">
                        Century Mall Atelier
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#9A9588] font-serif text-lg">{t.gallery.emptyState}</p>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        items={furniture}
        currentIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onNavigate={(newIdx) => {
          setLightboxIndex(newIdx);
          const item = furniture[newIdx];
          if (item) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('item', item.slug);
            newUrl.hash = 'gallery';
            history.pushState(null, '', newUrl.toString());
          }
        }}
        whatsapp={whatsapp}
      />
    </section>
  );
}
