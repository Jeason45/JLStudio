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

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Force Playwright à utiliser un chemin connu (sinon il cherche dans $HOME/.cache
# qui pour le user "nextjs" se résout en /nonexistent → chromium introuvable)
ENV PLAYWRIGHT_BROWSERS_PATH=/app/.playwright

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --home /home/nextjs --shell /bin/bash nextjs

COPY --from=builder /app/apps/portal/.next/standalone ./
COPY --from=builder /app/apps/portal/public ./apps/portal/public
COPY --from=builder /app/apps/portal/.next/static ./apps/portal/.next/static
# Templates Mustache pour la génération PDF (devis-moderne, facture-moderne, contrat-prestation)
COPY --from=builder /app/apps/portal/templates ./apps/portal/templates

COPY --from=builder /app/packages/database/generated ./packages/database/generated
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma

# Installe chromium + ses dépendances système pour la génération PDF Playwright
# --with-deps installe les libs (libnss3, libatk, fonts, etc.) en plus du binaire
RUN npx playwright install chromium --with-deps && \
    chown -R 1001:1001 /app/.playwright

# Pre-create writable cache dir for Next.js image optimization
RUN mkdir -p /app/apps/portal/.next/cache && chown -R 1001:1001 /app/apps/portal/.next

USER nextjs

EXPOSE 3002

ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/portal/server.js"]
