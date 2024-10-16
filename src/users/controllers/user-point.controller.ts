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

@Controller('users/:id/point')
export class UserPointController {
  constructor(private readonly pointsService: UserPointService) {}

  @Get()
  getUserPoint(@Param('id', ParseIntPipe) id: number) {
    return this.pointsService.getUserPoint(id);
  }

  @Patch()
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updatePointData: UpdatePointDto,
  ) {
    return this.pointsService.updatePoint(userId, updatePointData);
  }
}
