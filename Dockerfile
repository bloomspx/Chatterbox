FROM node:latest

WORKDIR /app

RUN chown node:node ./
USER node

COPY package.json package-lock.json * ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm install --cache=".npmcache"

CMD ["node", "./src/index.js"]