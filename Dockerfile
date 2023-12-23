FROM node:20-alpine

RUN npm install --location=global npm && \
    npm install --location=global pnpm

WORKDIR /usr/src/app

COPY package.json ./

RUN pnpm i

COPY . .

RUN pnpm build && \
    rm -rf node_modules && rm pnpm-lock.yaml && \
    pnpm i --prod && pnpm store prune

CMD [ "pnpm", "start" ]