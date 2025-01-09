import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Coko API')
    .setDescription('Coko API 문서입니다.')
    .setVersion('1.0')
    .addTag('users', 'users 관련 API')
    .addTag('point', 'point 관련 API')
    .addTag('experience', 'experience 관련 API')
    .addTag('items', 'items 관련 API')
    .setTermsOfService('https://modern-agile-official-client.vercel.app/') // 설명 링크 첨부하면 됨
    .setContact(
      '백엔드 팀',
      'https://github.com/modern-agile-team/8term-coko-back',
      'yja208501@gmail.com',
    )
    .setLicense(
      'MIT',
      'https://github.com/git/git-scm.com/blob/gh-pages/MIT-LICENSE.txt',
    )
    .addServer('https://api.cokoedu.com', 'develop') // develop 서버
    .addServer('http://localhost:3000', 'local') // 로컬 서버
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Swagger UI에서 인증 정보를 유지
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'https://localhost:3000',
      'https://cokoedu.com',
      'https://admin.cokoedu.com',
    ],
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
