import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
