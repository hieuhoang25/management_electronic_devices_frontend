FROM node:16.16.0

WORKDIR /app

#RUN npm install --save react react-dom react-scripts

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.production .env

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
