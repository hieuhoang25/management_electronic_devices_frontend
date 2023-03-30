FROM node:16.16.0

WORKDIR /app

COPY package*.json ./

COPY ./ ./

RUN npm install

COPY .env.production .env

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]

