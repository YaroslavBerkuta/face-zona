FROM node:14.0.0

WORKDIR /app

COPY ./package*.json ./
RUN npm install
RUN npm uninstall -g serve 
RUN npm i -g serve

COPY . .

EXPOSE 3000 3001

CMD ["npm", "start"]