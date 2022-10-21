FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g npm@latest

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --unsafe-perm --allow-root --ignore-scripts -d


COPY . .

RUN chown -R 1000140000:0 /.npm

CMD ["npm", "start"]