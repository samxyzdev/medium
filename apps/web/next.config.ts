import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = {
  images: {
    remotePatterns: [new URL("https://miro.medium.com/**")],
  },
};

module.exports = {
  publicRuntimeConfig: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/",
  },
};

export default nextConfig;

// v2/resize:fit:720/format:webp/0*00pyIw1vc-Sg692B.jpg
