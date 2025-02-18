import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UserPointModule } from './users/modules/user-point.module';
import { UserExperienceModule } from './users/modules/user-experience.module';
import { UserItemsModule } from './users/modules/user-items.module';
import { PrismaModule } from './prisma/prisma.module';
import { SectionsModule } from './sections/sections.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersCoreModule } from './users/modules/users-core.module';
import { AdminsModule } from './admin/admin.module';
import { PaginationModule } from './pagination/pagination.module';
import { DailyQuestsModule } from './daily-quests/daily-quests.module';
import { RankingsModule } from './ranking/rankings.module';
import { AttendanceModule } from './attendance/attendance.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChallengesModule } from './challenges/challenges.module';
import { SseModule } from './sse/sse.module';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [
    ItemsModule,
    SectionsModule,
    PrismaModule,
    UserItemsModule,
    UserPointModule,
    UserExperienceModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RankingsModule,
    UsersCoreModule,
    SectionsModule,
    AuthModule,
    AdminsModule,
    PaginationModule,
    DailyQuestsModule,
    AttendanceModule,
    EventEmitterModule.forRoot(),
    ChallengesModule,
    SseModule,
    ChallengeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
