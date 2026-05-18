FROM node:20-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# ── Stage 1: Install dependencies ──
# Le postinstall de puppeteer télécharge automatiquement chromium dans
# /root/.cache/puppeteer/. Ce cache sera copié tel quel dans le runner.
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
FROM base AS runner
WORKDIR /app

# Libs système requises par chromium bundled de Puppeteer (Debian Bookworm slim)
# Liste éprouvée — identique à Flamme qui tourne en prod sans souci.
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    openssl ca-certificates fonts-liberation \
    libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 \
    libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
    xdg-utils libxss1 libxtst6 \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --home /home/nextjs --ingroup nodejs nextjs

# Standalone Next.js + assets
COPY --from=builder --chown=nextjs:nodejs /app/apps/portal/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/portal/public ./apps/portal/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/portal/.next/static ./apps/portal/.next/static

# Templates Mustache pour la génération PDF (devis, facture, contrat)
COPY --from=builder --chown=nextjs:nodejs /app/apps/portal/templates ./apps/portal/templates

# Prisma client généré
COPY --from=builder /app/packages/database/generated ./packages/database/generated
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma

# Prisma CLI (pour `prisma db push` au démarrage du container)
# Next.js trace ne le copie pas car ce n'est pas un import JS de l'app.
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Puppeteer : les modules JS sont déjà dans le standalone (Next.js trace les
# imports et les copie dans .next/standalone/node_modules/). On copie juste
# le cache chromium qui vit en dehors de node_modules.
#
# ★ La ligne magique : cache chromium téléchargé au stage deps, copié dans le home du user nextjs
COPY --from=deps /root/.cache/puppeteer /home/nextjs/.cache/puppeteer
RUN chown -R nextjs:nodejs /home/nextjs

# Pre-create writable cache dir for Next.js image optimization
RUN mkdir -p /app/apps/portal/.next/cache && chown -R nextjs:nodejs /app/apps/portal/.next

USER nextjs

EXPOSE 3002

ENV PORT=3002
ENV HOSTNAME="0.0.0.0"
# HOME explicite pour que puppeteer trouve ~/.cache/puppeteer
ENV HOME=/home/nextjs

# Migration auto au démarrage :
#   - `db push --skip-generate` synchronise la DB avec schema.prisma (additif)
#   - Pas de `--accept-data-loss` → un changement destructif (suppression de
#     colonne/table) fait échouer le push, le serveur démarre quand même mais
#     les logs Coolify alertent. Il faut alors faire la migration manuellement.
#   - Client Prisma déjà généré au build → on saute la régénération.
CMD sh -c "node ./node_modules/prisma/build/index.js db push \
    --schema=./packages/database/prisma/schema.prisma \
    --skip-generate 2>&1 \
  || echo '[startup] prisma db push échoué — vérifier les logs ci-dessus. Le serveur démarre quand même.'; \
  exec node apps/portal/server.js"
