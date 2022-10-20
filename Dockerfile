FROM node:latest

ENV APP_HOME /app

WORKDIR $APP_HOME

COPY package.json .
RUN npm install

COPY . .

USER user

RUN sudo chown -R 1000140000:0 "/.npm"

CMD ["npm", "start"]