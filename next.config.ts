import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no Image Optimization API server; responsive
    // variants are pre-generated at build time instead (see docs/ARCHITECTURE.md §3.6).
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
