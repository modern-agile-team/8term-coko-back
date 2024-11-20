# FROM node:20-alpine
# WORKDIR /coko
# COPY ./package*.json ./
# RUN npm install
# COPY ./ ./
# RUN npx prisma generate
# CMD ["npm","run","start:dev"]/

FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN rm package-lock.json || true
RUN npm install
# 컨테이너가 실행될 때 애플리케이션이 외부에서 접근할 수 있도록 환경 변수와 포트를 설정합니다.
ENV HOST=0.0.0.0
EXPOSE 3000
# 컨테이너 시작 시 애플리케이션을 실행하는 기본 명령어를 설정합니다.
CMD [ "npm", "run", "start" ]