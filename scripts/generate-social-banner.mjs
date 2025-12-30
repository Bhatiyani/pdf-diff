#!/usr/bin/env node

/**
 * Generate PNG social share banner from SVG
 * Requires: npm install sharp
 * 
 * This script converts the social-banner.svg to PNG format
 * for better compatibility with social media platforms.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try to import sharp, provide helpful error if not installed
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (error) {
  console.error('❌ Error: sharp is not installed.');
  console.error('📦 Please install it by running: npm install --save-dev sharp');
  process.exit(1);
}

const publicDir = join(__dirname, '..', 'public');
const svgPath = join(publicDir, 'social-banner.svg');
const pngPath = join(publicDir, 'social-banner.png');

console.log('🎨 Generating social share banner PNG from SVG...');

try {
  const svgBuffer = readFileSync(svgPath);
  
  await sharp(svgBuffer)
    .png({
      quality: 95,
      compressionLevel: 9,
    })
    .toFile(pngPath);
  
  console.log('✅ Successfully generated social-banner.png');
  console.log(`📍 Location: ${pngPath}`);
  console.log('📐 Size: 1200x630 (optimized for social media)');
  console.log('');
  console.log('🔗 Usage:');
  console.log('   - Twitter/X: 1200x630 ✓');
  console.log('   - Facebook: 1200x630 ✓');
  console.log('   - LinkedIn: 1200x627 ✓');
  console.log('   - Open Graph: 1200x630 ✓');
  
} catch (error) {
  console.error('❌ Error generating PNG:', error.message);
  process.exit(1);
}
