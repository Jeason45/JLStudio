FROM node:20-slim AS base

# Install Playwright/Chromium dependencies
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    openssl ca-certificates \
    libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1 \
    libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 \
    libcairo2 libcups2 libxkbcommon0 libatspi2.0-0 libxshmfence1 \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# ── Stage 1: Install dependencies ──
FROM base AS deps
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/prospector/package.json ./apps/prospector/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN pnpm install --frozen-lockfile || pnpm install

# ── Stage 2: Build ──
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/prospector/node_modules ./apps/prospector/node_modules
COPY --from=deps /app/packages/database/node_modules ./packages/database/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY packages/database/ ./packages/database/
COPY packages/shared/ ./packages/shared/
COPY apps/prospector/ ./apps/prospector/
COPY package.json turbo.json ./

# Generate Prisma client
RUN cd packages/database && npx prisma generate

# Install Playwright Chromium (in builder, with all deps available)
RUN cd apps/prospector && npx playwright install chromium

# ── Stage 3: Production ──
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules + source
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/prospector/node_modules ./apps/prospector/node_modules
COPY --from=deps /app/packages/database/node_modules ./packages/database/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=builder /app/packages/database/generated ./packages/database/generated
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/packages/database/src ./packages/database/src
COPY --from=builder /app/packages/database/package.json ./packages/database/package.json
COPY apps/prospector/ ./apps/prospector/

# Copy Playwright browsers from builder
COPY --from=builder /root/.cache/ms-playwright /root/.cache/ms-playwright

# tsx is needed to run TypeScript directly
RUN npm install -g tsx@4.19.0

CMD ["tsx", "apps/prospector/src/agent.ts"]
