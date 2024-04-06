FROM node:20-alpine as development

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm
RUN pnpm install
EXPOSE 3000
COPY . .
CMD pnpm dev

FROM node:20-alpine as production

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
EXPOSE 3000
COPY . .
RUN rm -rf ./.next/cache
RUN pnpm build
CMD pnpm start