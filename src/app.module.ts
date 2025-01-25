import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { SectionsModule } from './sections/sections.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersCoreModule } from './users/modules/users-core.module';
import { AdminModule } from './admin/admin.module';
import { PaginationModule } from './pagination/pagination.module';
import { DailyQuestsModule } from './daily-quests/daily-quests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersCoreModule,
    SectionsModule,
    ItemsModule,
    AuthModule,
    AdminModule,
    PaginationModule,
    DailyQuestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
