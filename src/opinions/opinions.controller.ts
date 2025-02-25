import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OpinionsService } from './opinions.service';
import { ResOpinionsDto } from './dtos/res-opinions.dto';
import { ApiOpinions } from './opinions.swagger';
import { ResMyOpinionsDto } from './dtos/res-my-opinions.dto';

@ApiTags('opinions')
@Controller('opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  // 전체 문의 조회
  @ApiOpinions.findAllOpinions()
  @Get()
  @UseGuards(AuthGuard('adminAccessToken'))
  async findAllOpinions(): Promise<ResOpinionsDto> {
    const allOpinions = await this.opinionsService.findAllOpinions();
    return allOpinions;
  }
}
