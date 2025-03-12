import { Module } from '@nestjs/common';
import { UserHpModule } from './user-hp.module';
import { UsersModule } from './users.module';
import { UserPointModule } from './user-point.module';
import { UserExperienceModule } from './user-experience.module';
import { UserItemsModule } from './user-items.module';

@Module({
  imports: [
    UserExperienceModule,
    UserPointModule,
    UserHpModule,
    UsersModule,
    UserItemsModule,
  ],
  exports: [UserHpModule, UsersModule, UserPointModule],
})
export class UsersCoreModule {}
