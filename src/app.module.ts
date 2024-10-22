import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserPointModule } from './users/modules/user-point.module';
import { UserExperienceModule } from './users/modules/user-experience.module';
import { PrismaModule } from './prisma/prisma.module';
<<<<<<< HEAD
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule],
=======
import { UsersModule } from './users/modules/users.module';
import { PrismaService } from './prisma/prisma.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    QuizzesModule,
    SectionsModule,
    PrismaModule,
    UsersModule,
    UserPointModule,
    UserExperienceModule,
    PrismaModule,
  ],
>>>>>>> fac6412d22fd787741ed23cc2c484c0383ef7f3b
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
