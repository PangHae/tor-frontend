FROM node:16.15.1

RUN mkdir /app

WORKDIR /app

COPY ./package.json ./package.json

RUN yarn

COPY ./.next ./.next

EXPOSE 3000

CMD yarn run start
