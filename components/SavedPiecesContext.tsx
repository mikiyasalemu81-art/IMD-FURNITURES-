'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FurnitureItem } from '@/lib/types';

interface SavedPiecesContextType {
  savedItems: FurnitureItem[];
  isSaved: (id: string) => boolean;
  toggleSave: (item: FurnitureItem) => void;
  removeSaved: (id: string) => void;
  clearSaved: () => void;
  savedCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const SavedPiecesContext = createContext<SavedPiecesContextType | undefined>(undefined);
const STORAGE_KEY = 'imd_saved_furniture_pieces';

export function SavedPiecesProvider({ children }: { children: React.ReactNode }) {
  const [savedItems, setSavedItems] = useState<FurnitureItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch {
      // localStorage fallback
    }
  }, []);

  const saveToStorage = (items: FurnitureItem[]) => {
    setSavedItems(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const isSaved = (id: string) => {
    return savedItems.some((item) => item.id === id);
  };

  const toggleSave = (item: FurnitureItem) => {
    if (isSaved(item.id)) {
      const next = savedItems.filter((i) => i.id !== item.id);
      saveToStorage(next);
    } else {
      const next = [...savedItems, item];
      saveToStorage(next);
    }
  };

  const removeSaved = (id: string) => {
    const next = savedItems.filter((i) => i.id !== id);
    saveToStorage(next);
  };

  const clearSaved = () => {
    saveToStorage([]);
  };

  return (
    <SavedPiecesContext.Provider
      value={{
        savedItems,
        isSaved,
        toggleSave,
        removeSaved,
        clearSaved,
        savedCount: savedItems.length,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </SavedPiecesContext.Provider>
  );
}

export function useSavedPieces() {
  const context = useContext(SavedPiecesContext);
  if (!context) {
    throw new Error('useSavedPieces must be used within SavedPiecesProvider');
  }
  return context;
}
