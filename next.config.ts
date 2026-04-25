import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "substackcdn.com" },
      { hostname: "images.gofundme.com" },
      { hostname: "d2g8igdw686xgo.cloudfront.net" },
      { hostname: "media.wired.com" },
      { hostname: "assets.bwbx.io" },
      { hostname: "storage.ghost.io" },
      { hostname: "images.unsplash.com" },
      { hostname: "static.independent.co.uk" },
      { hostname: "theintercept.com" },
      { hostname: "i.guim.co.uk" },
    ],
  },
};

export default nextConfig;
