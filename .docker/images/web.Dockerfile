## base
FROM node:18 as base

WORKDIR /opt/app

## Build
FROM base as build

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build:web


## Production
FROM nginx as production

COPY --from=build /opt/app/dist/apps/web /usr/share/nginx/html
