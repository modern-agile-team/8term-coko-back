import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserPointService } from '../services/user-point.service';
import { UpdatePointDto } from '../dtos/update-point.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiUpdatePoint } from '../swagger-dacorator/patch-user-point-decorators';
import { ApiGetPoint } from '../swagger-dacorator/get-user-point-decorators';

@ApiTags('point')
@Controller('users/:id/point')
export class UserPointController {
  constructor(private readonly pointsService: UserPointService) {}

  @Get()
  @ApiGetPoint()
  getUserPoint(@Param('id', ParseIntPipe) userId: number) {
    return this.pointsService.getUserPoint(userId);
  }

  @Patch()
  @ApiUpdatePoint()
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updatePointData: UpdatePointDto,
  ) {
    return this.pointsService.updatePoint(userId, updatePointData);
  }
}
