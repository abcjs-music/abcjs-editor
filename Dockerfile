FROM node:20.18.2

RUN npm install -g npm@10.8.2

RUN mkdir /srv/app && chown node:node /srv/app

USER node

WORKDIR /srv/app
