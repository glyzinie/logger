# get node
FROM node:18.5.0-buster-slim

# Create app directory
WORKDIR /usr/src/app

# Get app dependencies
COPY package*.json ./

# building app
RUN npm i --omit=dev --verbose

# Bundle app source
COPY . .

# start up command for bot
CMD [ "npm", "start" ]