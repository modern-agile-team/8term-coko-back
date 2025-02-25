import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { RankingsService } from './rankings.service';
import { ApiRankings } from './rankings.swagger';
import { ApiTags } from '@nestjs/swagger';
import { ResMyRankingDto } from './dtos/res-my-ranking.dto';
import { RankingSortDto } from './dtos/ranking-sort.dto';

@ApiTags('rankings')
@Controller('users')
export class UsersRankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  // 자신의 랭킹 조회
  @ApiRankings.findMyRanking()
  @Get('me/rankings')
  @UseGuards(AuthGuard('accessToken'))
  async getMyRanking(
    @User() user: UserInfo,
    @Query() rankingSortDto: RankingSortDto,
  ): Promise<ResMyRankingDto> {
    const { sort } = rankingSortDto;
    const myRanking = await this.rankingsService.getMyRanking(sort, user);

    return myRanking;
  }
}
