FROM node:latest

ENV APP_HOME /app

WORKDIR $APP_HOME

RUN useradd -m -r user && \
    chown user /app

COPY package.json .
RUN npm install

COPY . .

USER user

CMD ["npm", "start"]