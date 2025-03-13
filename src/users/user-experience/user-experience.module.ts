import { Module } from '@nestjs/common';
import { UserExperienceService } from '../user-experience/user-experience.service';
import { UserExperienceController } from './user-experience.controller';

@Module({
  controllers: [UserExperienceController],
  providers: [UserExperienceService],
})
export class UserExperienceModule {}
