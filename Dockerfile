FROM node:20-alpine

ARG SPOTIFY_CLIENT_SECRET
ENV SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}

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