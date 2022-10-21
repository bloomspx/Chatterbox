FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

RUN mkdir -p $WORKDIR/npm

RUN npm config set prefix WORKDIR/npm

COPY . .

# RUN chown -R 1000140000:0 /.npm

CMD ["npm", "start"]