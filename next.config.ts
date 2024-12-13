/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"], // If you need to serve images from your backend
  },
  devIndicators: {
    buildActivity: false, // Disable the static indicator
  },
};

module.exports = nextConfig;
