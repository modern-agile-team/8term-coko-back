import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserPointModule } from './users/modules/user-point.module';
import { UserExperienceModule } from './users/modules/user-experience.module';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/modules/users.module';
import { SectionsModule } from './sections/sections.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { PartProgressModule } from './part-progress/part-progress.module';

@Module({
  imports: [
    SectionsModule,
    PrismaModule,
    UsersModule,
    UserPointModule,
    UserExperienceModule,
    ItemsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PartProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
