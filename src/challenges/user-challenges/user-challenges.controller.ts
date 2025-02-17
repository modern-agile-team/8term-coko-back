import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserChallengesService } from './user-challenges.service';
import { QueryChallengesDto } from '../dto/query-challenges.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { ResUserChallengesPaginationDto } from './dto/res-user-challenges-pagination.dto';
import { ApiChallenges } from '../challenges.swagger';

@ApiTags('users/me/challengess')
@Controller('user-challenges')
export class UserChallengesController {
  constructor(private readonly userChallengesService: UserChallengesService) {}

  @Get()
  @ApiChallenges.findAllUserChallenges()
  @UseGuards(AuthGuard('accessToken'))
  async findAllUserChallenges(
    @User() user: UserInfo,
    @Query() query: QueryChallengesDto,
  ) {
    const paginationData =
      await this.userChallengesService.findAllByPageAndLimit(user.id, query);
    return new ResUserChallengesPaginationDto(paginationData);
  }
}
