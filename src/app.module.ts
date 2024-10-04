import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [QuestionsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
