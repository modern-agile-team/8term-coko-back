import { Injectable } from '@nestjs/common';
import { RankingsRepository } from './rankings.repository';
import { RankingPaginationResponseDto } from './dtos/ranking-pagination-res.dto';
import { ResMyRankingDto } from './dtos/res-my-ranking.dto';
import { UserInfo } from 'src/users/entities/user.entity';
import { createFilterType } from 'src/ranking/utils/filter-utils';
import { createOrderBy } from 'src/ranking/utils/sort-utils';
import { Sort } from './entities/ranking.entity';

@Injectable()
export class RankingsService {
  constructor(private readonly rankingsRepository: RankingsRepository) {}

  /**
   * 해당 페이지의 랭킹정보들을 가져옴
   * @param sort
   * @param page
   * @returns
   */
  async findSelectedPageRankings(
    sort: string,
    page: number,
    limit: number,
  ): Promise<RankingPaginationResponseDto> {
    // 랭킹 정보 정렬 조건
    const orderBy = createOrderBy(sort);

    const totalCount = await this.rankingsRepository.getTotalUserCount();

    const contents = await this.rankingsRepository.findSelectedPageRankingsInfo(
      page,
      limit,
      orderBy,
    );

    return new RankingPaginationResponseDto({
      totalCount,
      currentPage: page,
      limit,
      contents,
    });
  }

  /**
   * 나의 순위를 가져옴
   * @param sort
   * @param userId
   * @returns
   */
  async getMyRanking(sort: Sort, user: UserInfo): Promise<ResMyRankingDto> {
    // 나보다 높은 순위의 유저를 세기 위한 조건
    const filterType = createFilterType(sort, user);

    const higherRankCount =
      await this.rankingsRepository.getHigherRankCount(filterType);

    const myRanking = higherRankCount + 1;

    return new ResMyRankingDto({ myRanking });
  }
}
