FROM node:16-alpine

WORKDIR /app

RUN npm install --save react react-dom react-scripts

COPY package.json .

RUN npm install

COPY . .

COPY .env.production .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
