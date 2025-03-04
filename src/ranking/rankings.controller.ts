import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { ApiRankings } from './rankings.swagger';
import { RankingQueryDto } from './dtos/ranking-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { RankingPaginationResponseDto } from './dtos/ranking-pagination-res.dto';

@ApiTags('rankings')
@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  // 랭킹 페이지 조회
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
  getNextSeasonEndTime() {
    return {
      seasonEndTime: this.rankingsService.getNextSeasonEndTime(),
    };
  }

  // top 3 랭킹 정보 테스트 api
  @Get('rankertest')
  async updateWeeklySeasonResults() {
    return await this.rankingsService.updateWeeklySeasonResults();
  }

  // 주간 랭킹 집계 테스트
  @Get('test-weekly')
  async testUpdateWeeklySeasonResults() {
    return await this.rankingsService.updateWeeklySeasonResults();
  }
}
