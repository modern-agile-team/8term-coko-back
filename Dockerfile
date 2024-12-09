FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npx prisma generate

# 컨테이너가 실행될 때 애플리케이션이 외부에서 접근할 수 있도록 환경 변수와 포트를 설정
# 여기서의 포트는 실제 기능은 없음. 이런 포트를 사용하는 것을 알려주는 용도
ENV HOST=0.0.0.0
EXPOSE 3000
CMD [ "npm", "run", "start" ]