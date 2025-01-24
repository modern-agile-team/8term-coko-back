import { Injectable, NotFoundException } from '@nestjs/common';
import { RankingsRepository } from './rankings.repository';
import { UsersRepository } from 'src/users/repositories/users.reposirory';
import { PAGE_SIZE } from 'src/common/constants/rankings-constants';
import { ResRankingsDto } from './dtos/res-rankings.dto';
import { ResMyRankingDto } from './dtos/res-my-ranking.dto';
import { UserInfo } from 'src/users/entities/user.entity';
import { createFilterType } from 'src/common/util/filter-utils';
import { createOrderBy } from 'src/common/util/sort-utils';

@Injectable()
export class RankingsService {
  constructor(
    private readonly rankingsRepository: RankingsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  /**
   * 해당 페이지의 랭킹정보들을 가져옴
   * @param sort
   * @param page
   * @returns
   */
  async getSelectedPageRankings(
    sort: string,
    page: number,
  ): Promise<ResRankingsDto> {
    // 랭킹 정보 정렬 조건
    const orderBy = createOrderBy(sort);

    const pageSize = PAGE_SIZE; // 페이지 사이즈 조정 가능
    const totalCount = await this.rankingsRepository.getTotalUserCount();
    const totalPages = Math.ceil(totalCount / pageSize);

    const rankings = await this.rankingsRepository.getSelectedPageRankingsInfo(
      page,
      pageSize,
      orderBy,
    );

    return new ResRankingsDto({
      totalCount,
      totalPages,
      currentPage: page,
      rankings,
    });
  }

  /**
   * 나의 순위를 가져옴
   * @param sort
   * @param userId
   * @returns
   */
  async getMyRanking(sort: string, user: UserInfo): Promise<ResMyRankingDto> {
    // 나보다 높은 순위의 유저를 세기 위한 조건
    const filterType = createFilterType(sort, user);

    const higherRankCount =
      await this.rankingsRepository.getHigherRankCount(filterType);

    const myRanking = higherRankCount + 1;

    return new ResMyRankingDto({ myRanking });
  }
}
