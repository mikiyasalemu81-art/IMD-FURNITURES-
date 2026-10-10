'use client';

import React from 'react';
import { CinematicScrollEngine } from './CinematicScrollEngine';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CinematicScrollEngine />
      {children}
    </>
  );
}
