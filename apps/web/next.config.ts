import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database", "@jlstudio/shared"],
  turbopack: {
    root: "../..",
  },
  // Images externes (depuis le CRM portal — l'utilisateur peut coller des URL HTTPS
  // pour les images des sections éditées)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async headers() {
    return [
      // Autorise portal.jlstudio.dev à iframer /preview (aperçu CRM)
      // via CSP frame-ancestors (mieux supporté que X-Frame-Options ALLOW-FROM)
      {
        source: '/preview',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://portal.jlstudio.dev",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
