'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { getAddisAbabaOpenStatus, OpenClosedStatus } from '@/lib/business';
import { BusinessHours } from '@/lib/types';

interface OpenClosedBadgeProps {
  hours?: BusinessHours;
  compact?: boolean;
  className?: string;
}

export function OpenClosedBadge({ hours, compact = false, className = '' }: OpenClosedBadgeProps) {
  const { language } = useLanguage();
  const [status, setStatus] = useState<OpenClosedStatus | null>(null);

  useEffect(() => {
    // Initial evaluation
    setStatus(getAddisAbabaOpenStatus(hours));

    // Refresh every 60 seconds
    const interval = setInterval(() => {
      setStatus(getAddisAbabaOpenStatus(hours));
    }, 60000);

    return () => clearInterval(interval);
  }, [hours]);

  if (!status) {
    // SSR / initial hydration skeleton
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141414] border border-[#C9A24B]/20 text-[11px] text-[#9A9588] ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Addis Ababa (EAT)</span>
      </div>
    );
  }

  const { isOpen, statusText } = status;
  const label = statusText[language] || statusText.en;

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#141414]/90 border ${
          isOpen ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'
        } text-[11px] tracking-wide transition-colors ${className}`}
        title="Evaluated against Addis Ababa time (Africa/Addis_Ababa UTC+3)"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isOpen ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400'
          }`}
        />
        <span className="font-medium text-[#F5F1E8]/90 truncate max-w-[170px] sm:max-w-none">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141414] border ${
        isOpen ? 'border-emerald-500/40 text-emerald-400' : 'border-amber-500/40 text-amber-400'
      } text-xs tracking-wide shadow-sm ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isOpen ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        />
      </span>
      <span className="text-[#F5F1E8] font-medium">{label}</span>
      <span className="text-[10px] text-[#9A9588] border-l border-[#C9A24B]/20 pl-2">
        Century Mall, Addis Ababa
      </span>
    </div>
  );
}
