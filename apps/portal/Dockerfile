FROM node:20-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# ── Stage 1: Install dependencies ──
FROM base AS deps
WORKDIR /app

# Copy root workspace files for pnpm resolution
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/portal/package.json ./apps/portal/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN pnpm install --frozen-lockfile || pnpm install

# ── Stage 2: Build ──
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/portal/node_modules ./apps/portal/node_modules
COPY --from=deps /app/packages/database/node_modules ./packages/database/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY packages/database/ ./packages/database/
COPY packages/shared/ ./packages/shared/
COPY apps/portal/ ./apps/portal/
COPY package.json turbo.json ./

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Generate Prisma client from centralized package
RUN cd packages/database && npx prisma generate
RUN cd apps/portal && pnpm build

# ── Stage 3: Production ──
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Playwright browsers stored here, accessible by all users
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Install system dependencies for Chromium + openssl
RUN apt-get update -y && apt-get install -y \
    openssl ca-certificates \
    libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1 \
    libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 \
    libcairo2 libcups2 libxkbcommon0 libatspi2.0-0 libxshmfence1 \
    fonts-liberation libappindicator3-1 \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright and ALL chromium variants to shared path
RUN npm install -g playwright@1.50.0 && \
    mkdir -p /ms-playwright && \
    playwright install chromium && \
    playwright install chromium-headless-shell && \
    chmod -R 755 /ms-playwright

# Verify the browsers are installed
RUN echo "=== Installed browsers ===" && \
    find /ms-playwright -name "chrome*" -type f -executable | head -10

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/portal/.next/standalone ./
COPY --from=builder /app/apps/portal/public ./apps/portal/public
COPY --from=builder /app/apps/portal/.next/static ./apps/portal/.next/static

# Prisma generated client from centralized package
COPY --from=builder /app/packages/database/generated ./packages/database/generated
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma

USER nextjs

EXPOSE 3002

ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/portal/server.js"]
