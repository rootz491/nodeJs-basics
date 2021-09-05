FROM node 

WORKDIR /app

ENV PORT=3000

COPY package*.json .

RUN npm i

COPY . .

CMD ["nodemon", "app.js"]