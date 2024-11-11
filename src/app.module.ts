import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserPointModule } from './users/modules/user-point.module';
import { UserExperienceModule } from './users/modules/user-experience.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/modules/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { SectionsModule } from './sections/sections.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    QuizzesModule,
    SectionsModule,
    PrismaModule,
    UsersModule,
    UserPointModule,
    UserExperienceModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
