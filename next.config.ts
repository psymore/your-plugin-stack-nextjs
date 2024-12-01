/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"], // If you need to serve images from your backend
  },
};

module.exports = nextConfig;
