import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.youtube.com'],
  },
  output: 'standalone',
};

export default nextConfig;
