FROM node

WORKDIR /frontend

COPY /package*.json /frontend/

RUN npm i

COPY . /frontend/

EXPOSE 80

CMD npm start