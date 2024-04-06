/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-daisyui'],
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/6.x/pixel-art/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/chatilie/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
