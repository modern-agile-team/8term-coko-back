FROM node:20-alpine
WORKDIR /coko
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npx prisma generate
CMD ["npm","run","start:dev"]
