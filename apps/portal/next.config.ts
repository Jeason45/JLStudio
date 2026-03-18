import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database"],
  turbopack: {
    root: "../..",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
