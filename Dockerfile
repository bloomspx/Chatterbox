FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g npm@8.14.0

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

# RUN chown -R 1000140000:0 /app/.npm

CMD ["npm", "start"]