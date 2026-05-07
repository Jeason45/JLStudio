import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@jlstudio/database", "@jlstudio/shared"],
  // Force puppeteer à rester external (pas bundlé) → path resolution vers
  // ~/.cache/puppeteer/ et le binaire chromium reste correct au runtime.
  serverExternalPackages: ["puppeteer", "puppeteer-core"],
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

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: false,
});
