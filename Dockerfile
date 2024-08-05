FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
RUN npm i --omit=dev

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /src/app

ENV NODE_ENV production
# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 edutrust
RUN adduser --system --uid 1001 nvit

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nvit:edutrust .next

# Automatically leverage output traces to reduce image size
COPY --from=builder /app/next.config.js ./
COPY --from=builder --chown=nvit:edutrust /app/.next/standalone ./
COPY --from=builder --chown=nvit:edutrust /app/.next/static ./.next/static
COPY .env.production ./


USER nvit

EXPOSE 3000

CMD ["node", "server.js"]