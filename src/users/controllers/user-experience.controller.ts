import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UpdateExperienceDto } from '../dtos/update-experience.dto';
import { UserExperienceService } from '../services/user-experience.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetExperience } from '../swagger-dacorator/get-user-experience-decorators';
import { ApiUpdateExperience } from '../swagger-dacorator/patch-user-experience-decorators';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';

@ApiTags('experience')
@Controller('users/:id/experience')
export class UserExperienceController {
  constructor(private readonly experienceService: UserExperienceService) {}

  @Get()
  @ApiGetExperience()
  getUserExperience(@Param('id', PositiveIntPipe) userId: number) {
    return this.experienceService.getUserExperience(userId);
  }

  @Patch()
  @ApiUpdateExperience()
  updateExperience(
    @Param('id', PositiveIntPipe) userId: number,
    @Body() updateExperienceData: UpdateExperienceDto,
  ) {
    return this.experienceService.updateExperience(
      userId,
      updateExperienceData,
    );
  }
}
