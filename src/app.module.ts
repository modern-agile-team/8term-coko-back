import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PointsModule } from './points/points.module';
import { ExperienceModule } from './experience/experience.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, PointsModule, ExperienceModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
