import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  getUsersExperience() {
    return this.experienceService.getUsersExperience();
  }

  @Get(':id')
  getUserExperience(@Param('id') id: number) {
    return this.experienceService.getUserExperience(id);
  }

  @Patch(':id')
  updateExperience(
    @Param('id') id: number,
    @Body() updateExperienceData: UpdateExperienceDto,
  ) {
    return this.experienceService.updateExperience(id, updateExperienceData);
  }
}
