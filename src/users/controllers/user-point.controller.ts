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

@Controller('points')
export class UserPointController {
  constructor(private readonly pointsService: UserPointService) {}

  @Get()
  getUsersPoint() {
    return this.pointsService.getUsersPoint();
  }

  @Get(':id')
  getUserPoint(@Param('id', ParseIntPipe) id: number) {
    return this.pointsService.getUserPoint(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updatePointData: UpdatePointDto,
  ) {
    return this.pointsService.updatePoint(userId, updatePointData);
  }
}
