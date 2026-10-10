'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { isRealPhotoAvailable, getOptimizedImageUrl } from '@/lib/cloudinary';

interface PlaceholderBlockProps {
  className?: string;
  label?: string;
  aspectRatio?: string;
}

/**
 * Neutral placeholder block strictly meeting IMD Image Rules:
 * Dark #141414 with thin gold border and the text "Photo coming soon".
 * Absolutely NO AI images, NO stock photos, NO external business assets.
 */
export function NeutralPlaceholderBlock({
  className,
  label = 'Photo coming soon',
  aspectRatio,
}: PlaceholderBlockProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden bg-[#141414] border border-[#C9A24B]/35 text-center p-6 select-none',
        aspectRatio,
        className
      )}
    >
      {/* Subtle luxury geometric corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C9A24B]/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C9A24B]/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C9A24B]/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C9A24B]/40 pointer-events-none" />

      {/* Minimal luxury monogram seal */}
      <div className="w-10 h-10 rounded-full border border-[#C9A24B]/30 flex items-center justify-center mb-3 bg-[#0B0B0B]/60 shadow-[0_0_15px_rgba(201,162,75,0.08)]">
        <span className="font-serif text-[#C9A24B] text-xs font-semibold tracking-widest">IMD</span>
      </div>

      <p className="font-serif text-sm tracking-wide text-[#F5F1E8]/90 font-medium">
        {label}
      </p>
      <span className="text-[11px] tracking-wider uppercase text-[#9A9588] mt-1">
        Atelier Real Photography
      </span>
    </div>
  );
}

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspectRatioClass?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
  sizes,
  aspectRatioClass,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const isAvailable = isRealPhotoAvailable(src);

  if (!isAvailable || hasError || !src) {
    return (
      <NeutralPlaceholderBlock
        className={cn(fill ? 'absolute inset-0 w-full h-full' : '', className)}
        aspectRatio={aspectRatioClass}
      />
    );
  }

  const optimizedSrc = getOptimizedImageUrl(src) || src;

  if (fill) {
    return (
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        onError={() => setHasError(true)}
        className={cn('object-cover transition-transform duration-500', className)}
      />
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      priority={priority}
      onError={() => setHasError(true)}
      className={cn('object-cover transition-transform duration-500', className)}
    />
  );
}
