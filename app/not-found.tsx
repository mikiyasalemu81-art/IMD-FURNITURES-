import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#0B0B0B] text-[#F5F1E8] flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full bg-[#141414] border border-[#C9A24B]/35 p-8 sm:p-10 text-center shadow-2xl relative">
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C9A24B]/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C9A24B]/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C9A24B]/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C9A24B]/40 pointer-events-none" />

        <div className="w-12 h-12 mx-auto rounded-full border border-[#C9A24B]/30 flex items-center justify-center mb-6 bg-[#0B0B0B]">
          <Sparkles className="w-5 h-5 text-[#C9A24B]" />
        </div>

        <span className="font-serif text-xs text-[#C9A24B] uppercase tracking-widest font-semibold block mb-2">
          404 · Page Not Found
        </span>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1E8] mb-3">
          Piece Not In Atelier
        </h1>

        <p className="text-sm text-[#9A9588] font-light leading-relaxed mb-8">
          The bespoke furniture piece or link you requested is not available. Please return to our main gallery or explore our curated collections.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/gallery"
            className="px-6 py-3 bg-[#C9A24B] hover:bg-[#E0BB63] text-[#0B0B0B] font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-gold-glow inline-flex items-center justify-center gap-2"
          >
            <span>View Gallery</span>
          </Link>

          <Link
            href="/"
            className="px-6 py-3 bg-[#1C1C1C] hover:bg-[#252525] border border-[#C9A24B]/30 text-[#F5F1E8] font-serif text-xs uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
