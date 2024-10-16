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
  getUserExperience(@Param('id', ParseIntPipe) id: number) {
    return this.experienceService.getUserExperience(id);
  }

  @Patch()
  updateExperience(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExperienceData: UpdateExperienceDto,
  ) {
    return this.experienceService.updateExperience(id, updateExperienceData);
  }
}
