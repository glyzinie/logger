FROM node:lts-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm i --omit=dev --verbose

FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules

COPY . .

CMD [ "node", "index.js" ]