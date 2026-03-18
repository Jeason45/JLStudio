import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database", "@jlstudio/shared"],
  turbopack: {
    root: "../..",
  },
};

export default nextConfig;
