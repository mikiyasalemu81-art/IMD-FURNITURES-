#!/usr/bin/env node
/**
 * IMD Furniture & Design — Assets Import Script
 * Usage:
 *   node scripts/import-assets.mjs
 *   node scripts/import-assets.mjs --zip path/to/photos.zip
 *   node scripts/import-assets.mjs --dir path/to/photos-folder
 * 
 * Strict Image Policy:
 * - Only genuine real photos placed by the owner
 * - Auto-renames into standard structure (/public/logo.png, /public/hero/hero-1..5.jpg, /public/gallery/)
 * - Ensures all destination folders exist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const TARGET_DIRS = [
  path.join(PUBLIC_DIR, 'hero'),
  path.join(PUBLIC_DIR, 'gallery'),
  path.join(PUBLIC_DIR, 'story'),
];

console.log('🏛️  IMD Furniture & Design — Asset Importer');
console.log('--------------------------------------------------');

// 1. Ensure target directories exist
for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${path.relative(ROOT, dir)}`);
  }
}

// 2. Parse command line arguments
const args = process.argv.slice(2);
let sourceZip = null;
let sourceDir = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--zip' && args[i + 1]) {
    sourceZip = args[i + 1];
  } else if (args[i] === '--dir' && args[i + 1]) {
    sourceDir = args[i + 1];
  }
}

// Also check default incoming directory
const defaultIncoming = path.join(ROOT, 'incoming-assets');
if (!sourceDir && !sourceZip && fs.existsSync(defaultIncoming)) {
  sourceDir = defaultIncoming;
}

if (!sourceDir && !sourceZip) {
  console.log(`
ℹ️  No asset source specified.
To import your genuine real photos, you can:
1. Place your real photos in a folder and run:
   npm run import-assets -- --dir "path/to/folder"
2. Or provide a zip archive:
   npm run import-assets -- --zip "path/to/archive.zip"
3. Or manually place real photos into:
   - /public/logo.png
   - /public/hero/hero-1.jpg ... hero-5.jpg
   - /public/gallery/your-piece-name.jpg

Per STRICT IMAGE RULES:
Neutral #141414 placeholder blocks with thin gold borders are active
until you drop your genuine photography into these folders.
`);
  process.exit(0);
}

// 3. Process from directory
if (sourceDir && fs.existsSync(sourceDir)) {
  console.log(`🔍 Scanning real photos in: ${sourceDir}`);
  const files = fs.readdirSync(sourceDir);
  const imageFiles = files.filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));

  if (imageFiles.length === 0) {
    console.log('⚠️  No image files found in directory.');
    process.exit(0);
  }

  let heroIdx = 1;
  for (const file of imageFiles) {
    const srcPath = path.join(sourceDir, file);
    const lower = file.toLowerCase();

    if (lower.includes('logo')) {
      const dest = path.join(PUBLIC_DIR, 'logo.png');
      fs.copyFileSync(srcPath, dest);
      console.log(`✅ Imported Logo -> public/logo.png`);
    } else if (lower.includes('hero') || (heroIdx <= 5 && !lower.includes('gallery'))) {
      const ext = path.extname(file).toLowerCase();
      const dest = path.join(PUBLIC_DIR, 'hero', `hero-${heroIdx}${ext}`);
      fs.copyFileSync(srcPath, dest);
      console.log(`✅ Imported Hero ${heroIdx} -> public/hero/hero-${heroIdx}${ext}`);
      heroIdx++;
    } else {
      const cleanName = file.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
      const dest = path.join(PUBLIC_DIR, 'gallery', cleanName);
      fs.copyFileSync(srcPath, dest);
      console.log(`✅ Imported Gallery Item -> public/gallery/${cleanName}`);
    }
  }

  console.log('\n🎉 Assets successfully imported and renamed.');
}
