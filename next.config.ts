import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { hostname: "substackcdn.com" },
      { hostname: "images.gofundme.com" },
      { hostname: "d2g8igdw686xgo.cloudfront.net" },
    ],
  },
};

export default nextConfig;
