FROM node:10-alpine

WORKDIR /home/node/app/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]



