
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY common-utils /app/microservices/blockchain/common-utils

WORKDIR /app/microservices/blockchain

COPY ./microservices/blockchain/package*.json ./

RUN npm install

COPY ./microservices/blockchain .

EXPOSE 3004

CMD ["node", "index.js"]
  