import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserChallengeService } from './user-challenge.service';
import { QueryChallengeDto } from '../dto/query-challenge.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';

@ApiTags('users/me/challenges')
@Controller('user-challenge')
export class UserChallengeController {
  constructor(private readonly userChallengeService: UserChallengeService) {}

  @Get()
  //@ApiUserChallenge.findAll()
  @UseGuards(AuthGuard('accessToken'))
  async findAll(@User() user: UserInfo, @Query() query: QueryChallengeDto) {
    const paginationData =
      await this.userChallengeService.findAllByPageAndLimit(user.id, query);
    return paginationData;
  }
}
