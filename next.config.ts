import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "worldcup26.ir" },
      { protocol: "https", hostname: "**.worldcup26.ir" },
      { protocol: "https", hostname: "**.espncdn.com" },
      { protocol: "https", hostname: "**.api-sports.io" },
    ],
  },
};

export default nextConfig;
