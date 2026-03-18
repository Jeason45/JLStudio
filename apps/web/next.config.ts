import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jlstudio/database"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
