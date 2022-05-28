FROM node:alpine

WORKDIR /app

ENV NODE_OPTIONS=--max_old_space_size=4096

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","run","server"]