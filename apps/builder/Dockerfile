FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# ── Stage 1: Install dependencies ──
FROM base AS deps
WORKDIR /app

# Copy root workspace files for pnpm resolution
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/builder/package.json ./apps/builder/package.json

RUN cd apps/builder && pnpm install --frozen-lockfile || pnpm install

# ── Stage 2: Build ──
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/builder/node_modules ./apps/builder/node_modules
COPY apps/builder/ ./apps/builder/
COPY package.json turbo.json ./

ENV NEXT_TELEMETRY_DISABLED=1
RUN cd apps/builder && npx prisma generate && pnpm build

# ── Stage 3: Production ──
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/builder/public ./public
COPY --from=builder /app/apps/builder/.next/standalone ./
COPY --from=builder /app/apps/builder/.next/static ./.next/static

# Prisma runtime
COPY --from=builder /app/apps/builder/prisma ./prisma
COPY --from=builder /app/apps/builder/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/apps/builder/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
