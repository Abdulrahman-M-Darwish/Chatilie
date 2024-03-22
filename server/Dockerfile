FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install

EXPOSE 8080

COPY . .

CMD pnpm start:dev