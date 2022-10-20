FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm cache clean --force 

CMD ["npm", "start"]