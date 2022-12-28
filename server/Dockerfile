FROM node:14.0.0


RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python
RUN npm install -g @nestjs/cli
RUN npm install pm2 -g


RUN mkdir /home/node/app
RUN mkdir /home/node/app/node_modules

COPY ./package.json /home/node/app/package.json

RUN chmod -R 777 /home/node 
USER node

RUN cd /home/node/app && ls


WORKDIR /home/node/app
COPY . /home/node/app

# Install development packages if NODE_ENV is set to "development"
# ARG NODE_ENV
# ENV NODE_ENV $NODE_ENV

# RUN npm install
