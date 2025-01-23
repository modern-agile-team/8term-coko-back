import { Injectable, NotFoundException } from '@nestjs/common';
import { RankingsRepository } from './rankings.repository';
import { UsersRepository } from 'src/users/repositories/users.reposirory';
import { PAGE_SIZE } from 'src/common/constants/rankings-constants';
import { ResRankingsDto } from './dtos/res-rankings.dto';
import { ResMyRankingDto } from './dtos/res-my-ranking.dto';
import { UserInfo } from 'src/users/entities/user.entity';

@Injectable()
export class RankingsService {
  constructor(
    private readonly rankingsRepository: RankingsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  /**
   * 해당 페이지의 랭킹정보들을 가져옴
   * @param sortType
   * @param pageNumber
   * @returns
   */
  async getSelectedPageRankings(
    sortType: string,
    pageNumber: number,
  ): Promise<ResRankingsDto> {
    let orderBy = {};

    if (sortType === 'point') {
      orderBy = orderBy = [
        { point: 'desc' },
        {
          level: 'desc',
        },
        {
          experience: 'desc',
        },
      ];
    } else if (sortType === 'level') {
      orderBy = [
        { level: 'desc' },
        {
          experience: 'desc',
        },
      ];
    }

    const pageSize = PAGE_SIZE; // 페이지 사이즈 조정 가능
    const totalCount = await this.rankingsRepository.getTotalUserCount();
    const totalPages = Math.ceil(totalCount / pageSize);

    const rankings = await this.rankingsRepository.getSelectedPageRankingsInfo(
      pageNumber,
      pageSize,
      orderBy,
    );

    return { totalCount, totalPages, currentPage: pageNumber, rankings };
  }

  /**
   * 나의 순위를 가져옴
   * @param sortType
   * @param userId
   * @returns
   */
  async getMyRanking(
    sortType: string,
    user: UserInfo,
  ): Promise<ResMyRankingDto> {
    // 나보다 높은 순위의 유저를 세기 위한 조건
    let filterType = {};

    if (sortType === 'point') {
      filterType = { point: { gt: user.point } };
    } else if (sortType === 'level') {
      filterType = { level: { gt: user.level } };
    }

    const higherRankCount =
      await this.rankingsRepository.getHigherRankCount(filterType);

    const myRanking = higherRankCount + 1;

    return { myRanking };
  }
}
