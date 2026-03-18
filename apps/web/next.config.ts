import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
