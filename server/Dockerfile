FROM node:20-alpine as development

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm
RUN pnpm install
EXPOSE 8080
COPY . .
CMD pnpm start:dev

FROM node:20-alpine as production

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
EXPOSE 8080
COPY . .
RUN rm -rf ./dist
RUN pnpm build
CMD pnpm start:prod