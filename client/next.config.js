const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/material', '@mui/icons-material'],
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dvygtd9el/image/upload/**',
      },
    ],
  },
  // Moved from experimental as per Next.js warning
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;