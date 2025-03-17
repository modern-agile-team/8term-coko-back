import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { ApiRankings } from './rankings.swagger';
import { RankingQueryDto } from './dtos/ranking-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { RankingPaginationResponseDto } from './dtos/ranking-pagination-res.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResSeasonEndTimeDto } from './dtos/res-season-end-time.dto';

@ApiTags('rankings')
@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  // 랭킹 페이지 조회 (+ 각 유저의 아이템들까지 가져오기)
  @ApiRankings.findSelectedPageRankings()
  @Get()
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

  /**
   * 시즌 종료 시점 반환
   */
  @ApiRankings.getNextSeasonEndTime()
  @Get('season')
  getNextSeasonEndTime(): ResSeasonEndTimeDto {
    return {
      seasonEndTime: this.rankingsService.getNextSeasonEndTime(),
    };
  }
}
