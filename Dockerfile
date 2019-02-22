FROM node

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN npm i -g yarn
RUN yarn install

COPY ./build ./build
COPY ./ormconfig.json .

RUN ls

EXPOSE 4000

ENV NODE_ENV="production"

CMD ["node", "build/index.js"]