import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UserPointService } from './user-point.service';
import { UpdatePointDto } from './dtos/update-point.dto';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ApiUpdatePoint } from './swagger-decorators/patch-user-point-decorators';
import { ApiGetPoint } from './swagger-decorators/get-user-point-decorators';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../users.entity';
import { User } from 'src/common/decorators/get-user.decorator';
import { ResponsePointDto } from './dtos/response-point.dto';

@ApiTags('point')
@Controller('users/me/point')
export class UserPointController {
  constructor(private readonly pointsService: UserPointService) {}

  @Get()
  @ApiGetPoint()
  @UseGuards(AuthGuard('accessToken'))
  getUserPoint(@User() user: UserInfo): Promise<ResponsePointDto> {
    return this.pointsService.getUserPoint(user.id);
  }

  @Patch()
  @ApiUpdatePoint()
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('accessToken'))
  updatePoint(
    @User() user: UserInfo,
    @Body() updatePointData: UpdatePointDto,
  ): Promise<ResponsePointDto> {
    return this.pointsService.updatePoint(user.id, updatePointData);
  }
}
