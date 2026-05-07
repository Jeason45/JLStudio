FROM node:20-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# ── Stage 1: Install dependencies ──
FROM base AS deps
WORKDIR /app
# On évite que le postinstall de playwright télécharge chromium ici
# (on le fera dans le builder, à un chemin contrôlé)
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/portal/package.json ./apps/portal/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN pnpm install --frozen-lockfile || pnpm install

# ── Stage 2: Build (compile + télécharge chromium) ──
FROM base AS builder
WORKDIR /app

# Chromium sera téléchargé ici puis copié dans le runner stage
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

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

# Télécharge chromium (version exacte de playwright local) — pas besoin de --with-deps
# car les libs système seront installées dans le stage runner via apt-get
RUN cd apps/portal && npx playwright install chromium

# ── Stage 3: Production ──
FROM node:20-slim AS runner
WORKDIR /app

# Libs système requises par chromium (Debian/slim).
# Liste basée sur `playwright install-deps` pour chromium sur Debian Bookworm.
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libexpat1 \
    libxcb1 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libatspi2.0-0 \
    libxshmfence1 \
    fonts-liberation \
    fonts-noto-color-emoji \
    libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Même chemin que dans le builder pour que playwright trouve le binaire copié
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --home /home/nextjs --shell /bin/bash nextjs

COPY --from=builder /app/apps/portal/.next/standalone ./
COPY --from=builder /app/apps/portal/public ./apps/portal/public
COPY --from=builder /app/apps/portal/.next/static ./apps/portal/.next/static
# Templates Mustache pour la génération PDF (devis-moderne, facture-moderne, contrat-prestation)
COPY --from=builder /app/apps/portal/templates ./apps/portal/templates

COPY --from=builder /app/packages/database/generated ./packages/database/generated
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma

# Copie le chromium téléchargé par le builder (version garantie identique à playwright runtime)
COPY --from=builder /ms-playwright /ms-playwright
RUN chown -R 1001:1001 /ms-playwright

# Pre-create writable cache dir for Next.js image optimization
RUN mkdir -p /app/apps/portal/.next/cache && chown -R 1001:1001 /app/apps/portal/.next

USER nextjs

EXPOSE 3002

ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/portal/server.js"]
