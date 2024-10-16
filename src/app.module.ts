import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PointModule } from './users/modules/user-point.module';
import { ExperienceModule } from './users/modules/user-experience.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/modules/users.module';

@Module({
  imports: [UsersModule, PointModule, ExperienceModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
