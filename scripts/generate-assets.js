/**
 * Asset Generation Script for TaxTracker NG
 * Generates all icons, OG images, and PWA assets using Sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons');
const APP_DIR = path.join(__dirname, '..', 'app');

// Icon sizes needed for PWA
const ICON_SIZES = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 384, 512];
const MASKABLE_SIZES = [192, 512];

// Brand colors
const COLORS = {
  primary: '#2B4FE8',
  primaryDark: '#1E3CB0',
  accent: '#22C55E',
  background: '#F5F6FA',
  white: '#FFFFFF'
};

async function ensureDirectories() {
  const dirs = [ICONS_DIR];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  console.log('✓ Directories ensured');
}

async function generateAppIcons() {
  console.log('Generating app icons...');
  
  const logoPath = path.join(SCRIPTS_DIR, 'logo.svg');
  const logoBuffer = fs.readFileSync(logoPath);

  for (const size of ICON_SIZES) {
    await sharp(logoBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(ICONS_DIR, `icon-${size}.png`));
    console.log(`  ✓ icon-${size}.png`);
  }
}

async function generateMaskableIcons() {
  console.log('Generating maskable icons...');
  
  const maskablePath = path.join(SCRIPTS_DIR, 'logo-maskable.svg');
  const maskableBuffer = fs.readFileSync(maskablePath);

  for (const size of MASKABLE_SIZES) {
    await sharp(maskableBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(ICONS_DIR, `icon-maskable-${size}.png`));
    console.log(`  ✓ icon-maskable-${size}.png`);
  }
}

async function generateShortcutIcons() {
  console.log('Generating shortcut icons...');
  
  const addIncomePath = path.join(SCRIPTS_DIR, 'add-income-icon.svg');
  const calculatorPath = path.join(SCRIPTS_DIR, 'calculator-icon.svg');

  await sharp(fs.readFileSync(addIncomePath))
    .resize(96, 96)
    .png()
    .toFile(path.join(ICONS_DIR, 'add-income.png'));
  console.log('  ✓ add-income.png');

  await sharp(fs.readFileSync(calculatorPath))
    .resize(96, 96)
    .png()
    .toFile(path.join(ICONS_DIR, 'calculator.png'));
  console.log('  ✓ calculator.png');
}

async function generateFavicons() {
  console.log('Generating favicons...');
  
  const logoPath = path.join(SCRIPTS_DIR, 'logo.svg');
  const logoBuffer = fs.readFileSync(logoPath);

  // Generate PNG favicon
  await sharp(logoBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-32.png'));
  console.log('  ✓ favicon-32.png');

  await sharp(logoBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-16.png'));
  console.log('  ✓ favicon-16.png');

  // Generate ICO using 32x32 PNG (simple approach)
  await sharp(logoBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(APP_DIR, 'favicon.ico').replace('.ico', '.png'));
  
  // For proper ICO, we create a 32x32 PNG and rename it
  // Most browsers accept PNG for favicon
  fs.copyFileSync(
    path.join(PUBLIC_DIR, 'favicon-32.png'),
    path.join(APP_DIR, 'icon.png')
  );
  console.log('  ✓ app/icon.png (used as favicon)');
}

async function generateOGImage() {
  console.log('Generating OG image...');
  
  const width = 1200;
  const height = 630;
  
  // Create OG image with gradient background and branding
  const svgOG = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2B4FE8"/>
      <stop offset="100%" style="stop-color:#1E3CB0"/>
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4ADE80"/>
      <stop offset="100%" style="stop-color:#22C55E"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="200" fill="rgba(255,255,255,0.03)"/>
  <circle cx="1100" cy="530" r="300" fill="rgba(255,255,255,0.03)"/>
  <circle cx="900" cy="100" r="150" fill="rgba(255,255,255,0.02)"/>
  
  <!-- Chart bars decoration -->
  <g transform="translate(80, 250)">
    <rect x="0" y="0" width="30" height="200" rx="6" fill="rgba(255,255,255,0.1)"/>
    <rect x="50" y="0" width="30" height="280" rx="6" fill="rgba(255,255,255,0.15)"/>
    <rect x="100" y="0" width="30" height="180" rx="6" fill="rgba(255,255,255,0.1)"/>
    <rect x="150" y="0" width="30" height="320" rx="6" fill="url(#accentGradient)" opacity="0.6"/>
  </g>
  
  <!-- Logo icon -->
  <g transform="translate(950, 170)">
    <circle cx="100" cy="100" r="100" fill="rgba(255,255,255,0.1)"/>
    <text x="100" y="120" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="80" font-weight="800" fill="white">₦</text>
  </g>
  
  <!-- Main text -->
  <text x="300" y="280" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="72" font-weight="800" fill="white">TaxTracker NG</text>
  
  <!-- Tagline -->
  <text x="300" y="360" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="400" fill="rgba(255,255,255,0.9)">Track your income. Estimate your taxes.</text>
  
  <!-- Secondary text -->
  <text x="300" y="420" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="400" fill="rgba(255,255,255,0.7)">Under the new Nigerian Tax Act 2026</text>
  
  <!-- Bottom accent line -->
  <rect x="300" y="470" width="200" height="6" rx="3" fill="url(#accentGradient)"/>
  
  <!-- Nigerian flag colors subtle accent -->
  <g transform="translate(300, 520)">
    <rect x="0" y="0" width="60" height="8" rx="2" fill="#008751"/>
    <rect x="70" y="0" width="60" height="8" rx="2" fill="white"/>
    <rect x="140" y="0" width="60" height="8" rx="2" fill="#008751"/>
  </g>
</svg>`;

  await sharp(Buffer.from(svgOG))
    .resize(width, height)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));
  console.log('  ✓ og-image.png (1200x630)');
  
  // Also generate Twitter card image (slightly different dimensions)
  await sharp(Buffer.from(svgOG))
    .resize(1200, 600)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'twitter-image.png'));
  console.log('  ✓ twitter-image.png (1200x600)');
}

async function generateAppleSplashScreens() {
  console.log('Generating Apple splash screens...');
  
  // Common iPhone splash screen sizes
  const splashSizes = [
    { width: 1170, height: 2532, name: 'apple-splash-1170x2532.png' }, // iPhone 12, 13, 14
    { width: 1284, height: 2778, name: 'apple-splash-1284x2778.png' }, // iPhone 12/13/14 Pro Max
    { width: 1179, height: 2556, name: 'apple-splash-1179x2556.png' }, // iPhone 14 Pro
  ];

  for (const { width, height, name } of splashSizes) {
    const splashSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2B4FE8"/>
      <stop offset="100%" style="stop-color:#1E3CB0"/>
    </linearGradient>
  </defs>
  
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  
  <!-- Centered logo -->
  <g transform="translate(${width/2 - 100}, ${height/2 - 150})">
    <circle cx="100" cy="100" r="100" fill="rgba(255,255,255,0.1)"/>
    <text x="100" y="125" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="80" font-weight="800" fill="white">₦</text>
  </g>
  
  <!-- App name below logo -->
  <text x="${width/2}" y="${height/2 + 80}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="700" fill="white">TaxTracker NG</text>
</svg>`;

    await sharp(Buffer.from(splashSvg))
      .resize(width, height)
      .png()
      .toFile(path.join(ICONS_DIR, name));
    console.log(`  ✓ ${name}`);
  }
}

async function copyLogoSVG() {
  console.log('Copying logo SVG...');
  
  fs.copyFileSync(
    path.join(SCRIPTS_DIR, 'logo.svg'),
    path.join(PUBLIC_DIR, 'logo.svg')
  );
  console.log('  ✓ logo.svg');
}

async function main() {
  console.log('\n🎨 TaxTracker NG Asset Generator\n');
  console.log('================================\n');
  
  try {
    await ensureDirectories();
    await generateAppIcons();
    await generateMaskableIcons();
    await generateShortcutIcons();
    await generateFavicons();
    await generateOGImage();
    await generateAppleSplashScreens();
    await copyLogoSVG();
    
    console.log('\n================================');
    console.log('✅ All assets generated successfully!\n');
    
    console.log('Generated files:');
    console.log('  /public/icons/      - All app icons');
    console.log('  /public/og-image.png    - OpenGraph image');
    console.log('  /public/twitter-image.png - Twitter card image');
    console.log('  /public/logo.svg        - Vector logo');
    console.log('  /app/icon.png           - App favicon\n');
    
  } catch (error) {
    console.error('❌ Error generating assets:', error);
    process.exit(1);
  }
}

main();

