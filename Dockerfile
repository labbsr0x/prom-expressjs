FROM node:12.7.0

ADD . /app/

WORKDIR /app/

RUN npm i

CMD ["npm", "start"]