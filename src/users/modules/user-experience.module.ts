import { Module } from '@nestjs/common';
import { UserExperienceService } from '../services/user-experience.service';
import { UserExperienceController } from '../controllers/user-experience.controller';

@Module({
  controllers: [UserExperienceController],
  providers: [UserExperienceService],
})
export class UserExperienceModule {}
