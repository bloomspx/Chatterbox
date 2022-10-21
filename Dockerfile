FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

# RUN chown -R 1000140000:0 /.npm

CMD ["npm", "start"]