FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm cache clean --force 

RUN chown -R 1000140000:0 "./npm"

CMD ["npm", "start"]