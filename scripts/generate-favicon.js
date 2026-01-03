/**
 * Generate proper favicon.ico for TaxTracker NG
 * Uses png-to-ico CLI
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const APP_DIR = path.join(__dirname, '..', 'app');
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons');

function generateFavicon() {
  console.log('Generating favicon.ico...');
  
  try {
    // Use multiple sizes for the ICO file
    const pngFiles = [
      path.join(ICONS_DIR, 'icon-16.png'),
      path.join(ICONS_DIR, 'icon-32.png'),
      path.join(ICONS_DIR, 'icon-48.png'),
    ];
    
    // Check if all files exist
    for (const file of pngFiles) {
      if (!fs.existsSync(file)) {
        console.error(`Missing file: ${file}`);
        process.exit(1);
      }
    }
    
    const appFaviconPath = path.join(APP_DIR, 'favicon.ico');
    const publicFaviconPath = path.join(PUBLIC_DIR, 'favicon.ico');
    
    // Generate ICO using CLI
    execSync(`npx png-to-ico ${pngFiles.join(' ')} > ${appFaviconPath}`);
    console.log('  ✓ app/favicon.ico');
    
    // Copy to public
    fs.copyFileSync(appFaviconPath, publicFaviconPath);
    console.log('  ✓ public/favicon.ico');
    
    console.log('\n✅ Favicon generated successfully!\n');
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();
