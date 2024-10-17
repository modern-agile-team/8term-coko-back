import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Coko API')
    .setDescription('Coko API 문서입니다.')
    .setVersion('1.0')
    .addTag('users', 'users 관련 API')
    .addTag('point', 'point 관련 API')
    .addTag('experience', 'experience 관련 API')
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
    .addServer('http://localhost:3000/', 'develop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
