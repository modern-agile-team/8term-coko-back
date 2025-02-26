import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UpdateExperienceDto } from '../dtos/update-experience.dto';
import { UserExperienceService } from '../services/user-experience.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetExperience } from '../swagger-dacorator/get-user-experience-decorators';
import { ApiUpdateExperience } from '../swagger-dacorator/patch-user-experience-decorators';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { UserInfo } from '../entities/user.entity';
import { User } from 'src/common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('experience')
@Controller('users/me/experience')
export class UserExperienceController {
  constructor(private readonly experienceService: UserExperienceService) {}

  @Get()
  @ApiGetExperience()
  @UseGuards(AuthGuard('accessToken'))
  getUserExperience(@User() user: UserInfo) {
    return this.experienceService.getUserExperience(user.id);
  }

  @Patch()
  @ApiUpdateExperience()
  @UseGuards(AuthGuard('accessToken'))
  updateExperience(
    @User() user: UserInfo,
    @Body() updateExperienceData: UpdateExperienceDto,
  ) {
    return this.experienceService.updateExperience(user, updateExperienceData);
  }
}
