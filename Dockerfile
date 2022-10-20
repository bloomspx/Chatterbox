FROM node:latest

ENV APP_HOME /app

COPY package.json .
RUN npm install && npm cache clean --force 

COPY . .

RUN chown -R 1000140000:0 /app/.npm

CMD ["npm", "start"]