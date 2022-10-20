FROM node:latest

WORKDIR /app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY package.json package-lock.json * ./

RUN npm install && npm cache clean --force

COPY . .

USER node

CMD ["npm", "start"]