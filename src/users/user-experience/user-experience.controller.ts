import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UpdateExperienceDto } from './dtos/update-experience.dto';
import { UserExperienceService } from './user-experience.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ApiGetExperience } from './swagger-decorators/get-user-experience-decorators';
import { ApiUpdateExperience } from './swagger-decorators/patch-user-experience-decorators';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { UserInfo } from '../users.entity';
import { User } from 'src/common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ResponseExperienceDto } from './dtos/response-experience.dto';

@ApiTags('experience')
@Controller('users/me/experience')
export class UserExperienceController {
  constructor(private readonly experienceService: UserExperienceService) {}

  @Get()
  @ApiGetExperience()
  @UseGuards(AuthGuard('accessToken'))
  getUserExperience(@User() user: UserInfo): Promise<ResponseExperienceDto> {
    return this.experienceService.getUserExperience(user.id);
  }

  @Patch()
  @ApiUpdateExperience()
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('accessToken'))
  updateExperience(
    @User() user: UserInfo,
    @Body() updateExperienceData: UpdateExperienceDto,
  ): Promise<ResponseExperienceDto> {
    return this.experienceService.updateExperience(user, updateExperienceData);
  }
}
