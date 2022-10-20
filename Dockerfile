FROM node:latest

WORKDIR /app

RUN chown node:node ./
USER node

RUN mkdir /root/.npm
RUN chown node /root/.npm .

COPY package.json package-lock.json * ./

RUN npm ci && npm cache clean --force

COPY . .

CMD ["npm", "start"]