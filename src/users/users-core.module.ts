import { Module } from '@nestjs/common';
import { UserHpModule } from './user-hp/user-hp.module';
import { UsersModule } from './users.module';
import { UserPointModule } from './user-point/user-point.module';
import { UserItemsModule } from './user-items/user-items.module';
import { UserExperienceModule } from './user-experience/user-experience.module';

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
