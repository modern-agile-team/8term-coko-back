import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PointsModule } from './points/points.module';
import { ExperienceModule } from './experience/experience.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { SectionsModule } from './sections/sections.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    QuizzesModule,
    SectionsModule,
    PrismaModule,
    UsersModule,
    PointsModule,
    ExperienceModule,
    PrismaModule,
    ProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
