import { Controller, Get, Query } from '@nestjs/common';
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
}
