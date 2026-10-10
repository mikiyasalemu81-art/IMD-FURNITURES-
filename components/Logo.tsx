'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group transition-opacity hover:opacity-95 ${className}`}>
      {/* If logo.png exists, render it. If not yet added, render the handcrafted luxury gold insignia */}
      {!imgError ? (
        <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="IMD Furniture & Design Logo"
            fill
            sizes="48px"
            className="object-contain"
            onError={() => setImgError(true)}
            priority
          />
        </div>
      ) : (
        <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-sm border border-[#C9A24B]/60 bg-[#141414] flex items-center justify-center p-1 shadow-[0_0_15px_rgba(201,162,75,0.15)] group-hover:border-[#E0BB63] transition-colors">
          {/* Subtle architectural diamond badge */}
          <div className="absolute inset-1 border border-[#C9A24B]/30 rotate-45 pointer-events-none" />
          <span className="font-serif text-[#C9A24B] font-bold text-sm tracking-wider z-10">
            IMD
          </span>
        </div>
      )}

      <div className="flex flex-col min-w-0">
        <span className="font-serif tracking-[0.12em] sm:tracking-[0.18em] text-xs sm:text-sm md:text-base font-semibold text-[#F5F1E8] group-hover:text-[#E0BB63] transition-colors leading-tight truncate">
          IMD FURNITURE
        </span>
        <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.16em] sm:tracking-[0.25em] uppercase text-[#C9A24B] font-light truncate">
          & DESIGN · ADDIS ABABA
        </span>
      </div>
    </Link>
  );
}
