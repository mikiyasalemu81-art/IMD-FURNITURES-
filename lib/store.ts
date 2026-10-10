import { siteSettings, categories, furnitureItems } from '@/content/site';
import { AppData, BusinessSettings, FurnitureItem } from './types';

export const staticAppData: AppData = {
  settings: siteSettings,
  categories,
  furniture: furnitureItems,
};

export async function getAppData(): Promise<AppData> {
  return staticAppData;
}

export async function getFurnitureItemBySlug(slug: string): Promise<FurnitureItem | undefined> {
  return furnitureItems.find((item) => item.slug === slug);
}
