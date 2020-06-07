# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=12.10.0
# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.2

# Build container
FROM node:${NODE_VERSION}-alpine AS build
ARG DUMB_INIT_VERSION

WORKDIR /home/node

RUN apk add --no-cache build-base python2 yarn \
    && yarn add nodemon \
    && yarn add pm2

ADD . /home/node
RUN yarn install && yarn cache clean

# Runtime container
FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node

# COPY --from=build /home/node /home/node

EXPOSE 3000
CMD ["yarn", "dev"]