import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // matikan Turbopack
  },
};

export default nextConfig;
