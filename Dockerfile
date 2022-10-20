FROM node:alpine

WORKDIR /app

ENV NODE_ENV production

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

USER node

CMD ["npm", "start"]