import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/users.entity';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dtos/create-opinion.dto';
import { ApiOpinions } from './opinions.swagger';
import { ResMyOpinionsDto } from './dtos/res-my-opinions.dto';

@ApiTags('opinions')
@Controller('users/me/opinions')
export class UserOpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  // 나의 문의 조회
  @ApiOpinions.findMyOpinions()
  @Get()
  @UseGuards(AuthGuard('accessToken'))
  async findMyOpinions(@User() user: UserInfo): Promise<ResMyOpinionsDto[]> {
    const myInquries = await this.opinionsService.findMyOpinions(user.id);
    return myInquries;
  }

  // 문의 추가
  @ApiOpinions.createOpinion()
  @Post()
  @HttpCode(204)
  @UseGuards(AuthGuard('accessToken'))
  async createOpinion(
    @User() user: UserInfo,
    @Body() body: CreateOpinionDto,
  ): Promise<void> {
    await this.opinionsService.createOpinion(user.id, body);
  }

  // 문의 삭제
  @ApiOpinions.deleteOpinion()
  @Delete(':opinionId')
  @HttpCode(204)
  @UseGuards(AuthGuard('adminAccessToken'))
  async deleteOpinion(@Param('opinionId') opinionId: number): Promise<void> {
    await this.opinionsService.deleteOpinion(opinionId);
  }
}
