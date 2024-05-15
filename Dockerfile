FROM node:lts-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --omit=dev --verbose

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

COPY . .

CMD [ "npm", "start" ]