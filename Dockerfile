FROM node:24.4.0

RUN npm install -g npm@11.6.2

RUN mkdir /srv/app && chown node:node /srv/app

USER node

WORKDIR /srv/app
