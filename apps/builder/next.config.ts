import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database"],
  turbopack: {
    root: "../..",
  },
};

export default nextConfig;
