FROM node:24.4.0

RUN npm install -g npm@11.7.0

RUN mkdir /srv/app && chown node:node /srv/app

USER node

WORKDIR /srv/app
