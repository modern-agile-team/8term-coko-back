import { Module } from '@nestjs/common';
import { UserHpModule } from './user-hp.module';
import { UsersModule } from './users.module';
import { UserPointModule } from './user-point.module';
import { UserExperienceModule } from './user-experience.module';

@Module({
  imports: [UserExperienceModule, UserPointModule, UserHpModule, UsersModule],
  exports: [UserHpModule, UsersModule],
})
export class UsersCoreModule {}
