import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { QueryProgressDto } from './dto/query-progress.dto';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiProgress } from './progress.swagger';
import { ResProgressDto } from './dto/res-progress.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';

@ApiTags('progress')
@Controller('users/me/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @ApiProgress.findAll()
  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async findAll(@User() user: UserInfo, @Query() query: QueryProgressDto) {
    const progress = await this.progressService.findAll(user.id, query);
    return new ResProgressDto(progress);
  }

  @ApiProgress.createOrUpdate()
  @Put('quizzes/:quizId')
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async createOrUpdate(
    @User() user: UserInfo,
    @Param('quizId', PositiveIntPipe) quizId: number,
    @Body() body: CreateProgressDto,
  ) {
    await this.progressService.createOrUpdate(user.id, quizId, body);
  }
}
