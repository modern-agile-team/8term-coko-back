FROM node:20-alpine
WORKDIR /coko
COPY ./package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm","run","start:dev"]
