
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY common-utils /app/microservices/user/common-utils

WORKDIR /app/microservices/user

COPY ./microservices/user/package*.json ./

RUN npm install

COPY ./microservices/user .

EXPOSE 3000

CMD ["node", "index.js"]
  