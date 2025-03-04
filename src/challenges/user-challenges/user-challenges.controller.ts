import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserChallengesService } from './user-challenges.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { ResUserChallengesPaginationDto } from './dto/res-user-challenges-pagination.dto';
import { ApiChallenges } from '../challenges.swagger';
import { QueryUserChallengesDto } from './dto/query-user-challenges.dto';

@ApiTags('challenges')
@Controller('users/me/challenges')
export class UserChallengesController {
  constructor(private readonly userChallengesService: UserChallengesService) {}

  @Get()
  @ApiChallenges.findAllUserChallenges()
  @UseGuards(AuthGuard('accessToken'))
  async findAllUserChallenges(
    @User() user: UserInfo,
    @Query() query: QueryUserChallengesDto,
  ): Promise<ResUserChallengesPaginationDto> {
    const paginationData =
      await this.userChallengesService.findAllByPageAndLimit(user.id, query);
    return new ResUserChallengesPaginationDto(paginationData);
  }
}
