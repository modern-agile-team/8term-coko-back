import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UpdateExperienceDto } from '../dtos/update-experience.dto';
import { UserExperienceService } from '../services/user-experience.service';

@Controller('users/:id/experience')
export class UserExperienceController {
  constructor(private readonly experienceService: UserExperienceService) {}

  @Get()
  getUserExperience(@Param('id', ParseIntPipe) userId: number) {
    return this.experienceService.getUserExperience(userId);
  }

  @Patch()
  updateExperience(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateExperienceData: UpdateExperienceDto,
  ) {
    return this.experienceService.updateExperience(
      userId,
      updateExperienceData,
    );
  }
}
