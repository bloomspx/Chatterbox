FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm install --cache=".npmcache"

CMD ["npm", "start"]