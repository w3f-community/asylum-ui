FROM node:17.9.0-alpine as builder

WORKDIR /asylum-ui
COPY ./ ./

ENV ASYLUM_NODE_URL=ws://node-asylum:9944
ENV IPFS_NODE_URL=http://ipfs:5001

RUN apk add --no-cache --virtual .gyp python2 make g++

RUN yarn
RUN yarn build

RUN apk del .gyp

EXPOSE 3000

CMD ["yarn seed", "yarn start"]
