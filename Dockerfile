FROM node:22.12.0

RUN npm install -g npm@11.5.1

RUN mkdir /srv/app && chown node:node /srv/app

USER node

WORKDIR /srv/app
