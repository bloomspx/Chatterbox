FROM ubuntu:22.04

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm    

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN mkdir /app/node_modules/.cache

CMD ["npm", "start"]