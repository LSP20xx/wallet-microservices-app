
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY common-utils /app/microservices/order/common-utils

WORKDIR /app/microservices/order

COPY ./microservices/order/package*.json ./

RUN npm install

COPY ./microservices/order .

EXPOSE 3001

CMD ["node", "index.js"]
  