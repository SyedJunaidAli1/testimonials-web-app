import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // increase limit (can be '2mb', '10mb', '50mb', etc.)
    },
  },
};

export default nextConfig;
