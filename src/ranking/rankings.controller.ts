import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UserInfo } from 'src/users/entities/user.entity';
import { RankingsService } from './rankings.service';
import { ApiRankings } from './ranking.swagger';
import { RankingQueryDto } from './dtos/ranking-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { RankingPaginationResponseDto } from './dtos/ranking-pagination-res.dto';
import { ResMyRankingDto } from './dtos/res-my-ranking.dto';
import { Sort } from './entities/ranking.entity';

@ApiTags('rankings')
@Controller('users')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  // 랭킹 페이지 조회
  @ApiRankings.findSelectedPageRankings()
  @Get('rankings')
  async findSelectedPageRankings(
    @Query() rankingsDto: RankingQueryDto,
  ): Promise<RankingPaginationResponseDto> {
    const { sort, page, limit } = rankingsDto;

    const allRankings = await this.rankingsService.findSelectedPageRankings(
      sort,
      page,
      limit,
    );

    return allRankings;
  }

  // 자신의 랭킹 조회
  @ApiRankings.getMyRanking()
  @Get('me/rankings')
  @UseGuards(AuthGuard('accessToken'))
  async getMyRanking(
    @User() user: UserInfo,
    @Query('sort') sort: Sort,
  ): Promise<ResMyRankingDto> {
    const myRanking = await this.rankingsService.getMyRanking(sort, user);

    return myRanking;
  }
}
