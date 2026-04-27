import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Explicitly set Turbopack root to THIS folder only.
  // Without this, Turbopack detects the stray package-lock.json at
  // /Users/prnv_3322/ and treats your entire home directory as root → 10 GB cache!
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,
};

export default nextConfig;
