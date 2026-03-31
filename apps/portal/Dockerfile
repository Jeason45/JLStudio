FROM node:20-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# ── Stage 1: Install dependencies ──
FROM base AS deps
WORKDIR /app

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

RUN cd packages/database && npx prisma generate
RUN cd apps/portal && pnpm build

# ── Stage 3: Production ──
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Minimal deps for headless Chrome (no GTK, no Python, no LLVM)
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    openssl ca-certificates wget gnupg \
    libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1 \
    libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 \
    libcairo2 libcups2 libxkbcommon0 libatspi2.0-0 libxshmfence1 \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome for Testing (headless, minimal, ~130MB instead of 921MB)
RUN wget -q https://storage.googleapis.com/chrome-for-testing-public/131.0.6778.204/linux64/chrome-headless-shell-linux64.zip -O /tmp/chrome.zip \
    && apt-get update -y && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/* \
    && unzip -q /tmp/chrome.zip -d /opt \
    && rm /tmp/chrome.zip \
    && ln -s /opt/chrome-headless-shell-linux64/chrome-headless-shell /usr/local/bin/chrome-headless-shell \
    && chmod +x /opt/chrome-headless-shell-linux64/chrome-headless-shell

ENV CHROMIUM_PATH=/usr/local/bin/chrome-headless-shell

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/portal/.next/standalone ./
COPY --from=builder /app/apps/portal/public ./apps/portal/public
COPY --from=builder /app/apps/portal/.next/static ./apps/portal/.next/static

COPY --from=builder /app/packages/database/generated ./packages/database/generated
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma

USER nextjs

EXPOSE 3002

ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/portal/server.js"]
