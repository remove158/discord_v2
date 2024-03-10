FROM node:21-alpine 
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . .

CMD ["npm", "start"]
