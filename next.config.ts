import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Turbopack config (silence warning)
  turbopack: {},
};

export default withPWA(nextConfig);
