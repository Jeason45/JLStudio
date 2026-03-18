import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database", "@jlstudio/shared"],
  turbopack: {
    root: "../..",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
