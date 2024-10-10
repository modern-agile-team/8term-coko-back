import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  create(@Body() createPointDto: CreatePointDto) {
    return this.pointsService.create(createPointDto);
  }

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

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pointsService.remove(+id);
  }
}
