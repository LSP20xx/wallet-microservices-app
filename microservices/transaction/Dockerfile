
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY common-utils /app/microservices/transaction/common-utils

WORKDIR /app/microservices/transaction

COPY ./microservices/transaction/package*.json ./

RUN npm install

COPY ./microservices/transaction .

EXPOSE 3002

CMD ["node", "index.js"]
  