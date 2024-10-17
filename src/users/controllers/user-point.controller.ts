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
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('point')
@Controller('users/:id/point')
export class UserPointController {
  constructor(private readonly pointsService: UserPointService) {}

  @Get()
  getUserPoint(@Param('id', ParseIntPipe) userId: number) {
    return this.pointsService.getUserPoint(userId);
  }

  @Patch()
  @ApiOkResponse({ description: '성공적으로 포인트가 수정됨' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({
    summary: '포인트 증감 수정',
    description: ` ## 포인트 증감 수정
    0 포인트 밑으로 수정되지 않음`,
    externalDocs: {
      description: 'nest 공식 문서',
      url: 'https://docs.nestjs.com',
    },
  })
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updatePointData: UpdatePointDto,
  ) {
    return this.pointsService.updatePoint(userId, updatePointData);
  }
}
