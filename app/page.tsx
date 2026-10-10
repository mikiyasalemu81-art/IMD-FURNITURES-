import React, { Suspense } from 'react';
import { siteSettings, categories, furnitureItems } from '@/content/site';
import { HeroSlideshow } from '@/components/HeroSlideshow';
import { OurStory } from '@/components/OurStory';
import { MorphingShowcase } from '@/components/MorphingShowcase';
import { GallerySection } from '@/components/GallerySection';
import { CraftProcess } from '@/components/CraftProcess';
import { ContactLocation } from '@/components/ContactLocation';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-[#0B0B0B] text-[#F5F1E8]">
      {/* a) HERO SECTION (#home) */}
      <HeroSlideshow settings={siteSettings} />

      {/* b) OUR STORY SECTION (#story) */}
      <OurStory settings={siteSettings} />

      {/* Morphing Geometry Pinned Transition */}
      <MorphingShowcase />

      {/* c) GALLERY SHOWCASE (#gallery) with deep-linking & lightbox */}
      <Suspense fallback={<div id="gallery" className="min-h-[600px] bg-[#0B0B0B]" />}>
        <GallerySection
          furniture={furnitureItems}
          categories={categories}
          whatsapp={siteSettings.whatsapp}
        />
      </Suspense>

      {/* d) CRAFT PROCESS TIMELINE (#process) */}
      <CraftProcess steps={siteSettings.craftSteps} />

      {/* e) CONTACT & CENTURY MALL LOCATIONS (#contact) */}
      <ContactLocation settings={siteSettings} />
    </div>
  );
}
