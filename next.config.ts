// next.config.ts (or next.config.js if using JS)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any HTTPS hostname (wildcard for all domains)
      },
      // If your thumbnails might use HTTP (rare, but for completeness):
      // {
      //   protocol: "http",
      //   hostname: "**",
      // },
    ],
  },
};

export default nextConfig;