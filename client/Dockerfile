FROM node:20-alpine

WORKDIR /app/client

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install

EXPOSE 3000

COPY . .

CMD pnpm dev
