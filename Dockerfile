FROM ubuntu:22.04

# ENV NODE_ENV=production

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm    

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

# RUN chown -R 1000140000:0 /.npm

RUN mkdir /app/node_modules/.cache
# RUN npm config set prefix "/app/.npm-global"
# ENV PATH="/app/.npm-global/bin:${PATH}"

CMD ["npm", "start"]