FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN npm install
RUN chown -R node.node /app

COPY . .

CMD ["npm", "run", "start"]