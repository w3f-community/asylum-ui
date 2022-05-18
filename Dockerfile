FROM node:17.9.0 as build

WORKDIR /asylum-ui
COPY ./ ./

RUN yarn install
RUN yarn build


CMD ["yarn seed", "yarn start"]