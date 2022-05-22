FROM node:17.9.0 as build

WORKDIR /asylum-ui
COPY ./ ./

ENV ENDPOINT_URL=ws://172.17.0.1:9944
ENV IPFS_ENDPOINT_URL=http://172.17.0.1:5001

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn seed", "yarn start"]