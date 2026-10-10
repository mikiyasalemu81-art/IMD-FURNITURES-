export type Language = 'en' | 'am' | 'om';

export interface LocalizedText {
  en: string;
  am: string;
  om: string;
}

export interface FurnitureSpecs {
  dimensions?: string;
  materials?: string;
  finish?: string;
  leadTime?: string;
}

export interface FurnitureItem {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: string;
  featured: boolean;
  order: number;
  image: string;
  additionalImages?: string[];
  specs?: FurnitureSpecs;
  createdAt: string;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: LocalizedText;
  order: number;
}

export interface LocationItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  mapUrl: string;
  isPrimary?: boolean;
}

export interface CraftStep {
  step: number;
  key: 'consult' | 'design' | 'build' | 'deliver';
  title: LocalizedText;
  description: LocalizedText;
  iconName: string;
}

export interface BusinessHours {
  regularOpen: string;  // "08:30"
  regularClose: string; // "20:00"
  sundayOpen: string;   // "10:00"
  sundayClose: string;  // "18:00"
  displayText: LocalizedText;
}

export interface BusinessSettings {
  brandName: string;
  tagline: LocalizedText;
  heroSentence: LocalizedText;
  storyImage: string;
  storyParagraphs: {
    en: string[];
    am: string[];
    om: string[];
  };
  phoneCall: string;
  whatsapp: string;
  email: string;
  address: LocalizedText;
  hours: BusinessHours;
  googleRating: {
    score: number;
    reviewCount: number;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  heroImages: string[];
  locations: LocationItem[];
  craftSteps: CraftStep[];
}

export interface AppData {
  settings: BusinessSettings;
  categories: CategoryItem[];
  furniture: FurnitureItem[];
}
