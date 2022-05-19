FROM node:17.9.0 as build

WORKDIR /asylum-ui
COPY ./ ./

ENV ENDPOINT_URL=ws://host.docker.internal:9944
ENV IPFS_ENDPOINT_URL=http://host.docker.internal:5001

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn seed", "yarn start"]