/**
 * Cloudinary image delivery & optimization helper.
 * Strictly adheres to IMD Image Rules:
 * - Only genuine real photos placed in /public/ or uploaded to Cloudinary
 * - If absent, cleanly signals missing so components render the neutral #141414 placeholder block
 */

export interface OptimizeImageOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  crop?: 'fill' | 'scale' | 'fit';
}

export function getOptimizedImageUrl(
  imagePath: string | null | undefined,
  options: OptimizeImageOptions = {}
): string | null {
  if (!imagePath || imagePath.trim() === '') {
    return null;
  }

  const cleanPath = imagePath.trim();

  // If it's already a Cloudinary URL, apply transformations
  if (cleanPath.includes('cloudinary.com')) {
    const { width, height, quality = 'auto', crop = 'fill' } = options;
    const transforms: string[] = ['f_auto', `q_${quality}`];
    
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    if (width || height) transforms.push(`c_${crop}`);

    const transformStr = transforms.join(',');
    
    // Insert transformations after /upload/
    if (cleanPath.includes('/upload/') && !cleanPath.includes('/upload/f_auto')) {
      return cleanPath.replace('/upload/', `/upload/${transformStr}/`);
    }
    return cleanPath;
  }

  // Local static file path (e.g. /hero/hero-1.jpg, /gallery/sofa-1.jpg, /logo.png)
  return cleanPath;
}

export function isRealPhotoAvailable(imagePath: string | null | undefined): boolean {
  if (!imagePath) return false;
  const p = imagePath.trim().toLowerCase();
  if (p === '' || p === 'null' || p === 'undefined' || p.includes('placeholder')) {
    return false;
  }
  return true;
}
