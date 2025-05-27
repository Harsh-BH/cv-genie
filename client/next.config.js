const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Critical for Azure App Service deployment
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
  // Helps with file tracing for standalone builds
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
};

module.exports = nextConfig;