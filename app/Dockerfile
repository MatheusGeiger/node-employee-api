FROM node:8.9.3-alpine

EXPOSE 3001

ADD . /app

RUN cd /app && \
    npm install && \
    if [ -f ~/.npmrc ]; then rm ~/.npmrc; fi

VOLUME /app/node_modules

WORKDIR /app

CMD ["npm", "start"]