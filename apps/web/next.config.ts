import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database"],
  turbopack: {
    root: "../..",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
