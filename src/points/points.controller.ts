import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { PointsService } from './points.service';
import { UpdatePointDto } from './dto/update-point.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get()
  getUsersPoint() {
    return this.pointsService.getUsersPoint();
  }

  @Get(':id')
  getUserPoint(@Param('id') id: number) {
    return this.pointsService.getUserPoint(id);
  }

  @Patch(':id')
  update(@Param('id') userId: number, @Body() updatePointData: UpdatePointDto) {
    return this.pointsService.updatePoint(userId, updatePointData);
  }
}
