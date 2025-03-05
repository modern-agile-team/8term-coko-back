import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UserPointService } from '../services/user-point.service';
import { UpdatePointDto } from '../dtos/update-point.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiUpdatePoint } from '../swagger-decorator/patch-user-point-decorators';
import { ApiGetPoint } from '../swagger-decorator/get-user-point-decorators';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../entities/user.entity';
import { User } from 'src/common/decorators/get-user.decorator';

@ApiTags('point')
@Controller('users/me/point')
export class UserPointController {
  constructor(private readonly pointsService: UserPointService) {}

  @Get()
  @ApiGetPoint()
  @UseGuards(AuthGuard('accessToken'))
  getUserPoint(@User() user: UserInfo) {
    return this.pointsService.getUserPoint(user.id);
  }

  @Patch()
  @ApiUpdatePoint()
  @UseGuards(AuthGuard('accessToken'))
  updatePoint(@User() user: UserInfo, @Body() updatePointData: UpdatePointDto) {
    return this.pointsService.updatePoint(user.id, updatePointData);
  }
}
