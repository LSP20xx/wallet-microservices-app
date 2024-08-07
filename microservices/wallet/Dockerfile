
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY common-utils /app/microservices/wallet/common-utils

WORKDIR /app/microservices/wallet

COPY ./microservices/wallet/package*.json ./

RUN npm install

COPY ./microservices/wallet .

EXPOSE 3003

CMD ["node", "index.js"]
  