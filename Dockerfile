FROM node:20

WORKDIR /usr/scr/app

ENV PORT "3000"
ENV MONGO_DB_CONNECTION "mongodb://test_db:27017"
ENV DB_NAME "test"
ENV JWT_PRIVATE_KEY "key"
ENV JWT_ISSUER "issuer"


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
CMD [ "node", "dist/main.js" ]
