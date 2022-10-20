FROM node:latest

WORKDIR /app

RUN chown node:node ./
USER node

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV


COPY package.json package-lock.json * ./

RUN npm ci && npm cache clean --force

COPY . .

CMD ["node", "./src/index.js"]