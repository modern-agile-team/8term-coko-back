import { Injectable } from '@nestjs/common';
import { RankingsRepository } from './rankings.repository';
import { RankingPaginationResponseDto } from './dtos/ranking-pagination-res.dto';
import { ResMyRankingDto } from './dtos/res-my-ranking.dto';
import { UserInfo } from 'src/users/entities/user.entity';
import { createFilterType } from 'src/ranking/utils/filter-utils';
import { createOrderBy } from 'src/ranking/utils/sort-utils';
import { Sort } from './entities/ranking.entity';
import { Subscription, timer } from 'rxjs';
import { UsersRepository } from 'src/users/repositories/users.reposirory';
import { ProgressRepository } from 'src/progress/progress.repository';

@Injectable()
export class RankingsService {
  constructor(
    private readonly rankingsRepository: RankingsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly progressRepository: ProgressRepository,
  ) {}

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

    // 전체 유저 수 조회
    const totalCount = await this.rankingsRepository.getTotalUserCount();

    // 선택한 페이지의 랭킹 정보 탐색
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

    const ranking = higherRankCount + 1;

    return new ResMyRankingDto({ ranking });
  }

  // 타이머 관리 객체 // 키는 userId, value인 sunscription에 구독 정보
  private totalCorrectAnswerUpdateTimers = new Map<number, Subscription>();

  /**
   * 타이머 관리 메서드 ( 이벤트 리스너에서 호출 )
   * @param userId
   * @param totalCorrectAnswer
   * @param delayMs
   */
  async scheduleTotalCorrectAnswerUpdateTimers(
    userId: number,
    isCorrect: boolean,
    delayTime: number,
  ) {
    /**
     * 기존 타이머가 있으면 취소
     * has() - refillTimer에 subscription 있는지 확인
     * get().unsubscribe 가져온 정보의 subscription 취소
     * delete() subscription 삭제
     * 'subscription' 은 '구독 정보' 정도로 생각하면 될 것 같습니다.
     */
    if (this.totalCorrectAnswerUpdateTimers.has(userId)) {
      this.totalCorrectAnswerUpdateTimers.get(userId).unsubscribe();
      this.totalCorrectAnswerUpdateTimers.delete(userId);
    }

    // 총 정답 수 조회
    const totalCorrectAnswer =
      await this.progressRepository.countProgressByQuery(
        userId,
        {},
        { isCorrect },
      );

    console.log('랭킹 서비스단 타이머ㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓ', totalCorrectAnswer);
    // rxjs timer를 사용해 예약
    const timerSubscription = timer(delayTime).subscribe(async () => {
      await this.usersRepository.updateUserTotalCorrectAnswer(
        userId,
        totalCorrectAnswer,
      );

      console.log('타이머 끝 콜백함수 실행 !');
      this.totalCorrectAnswerUpdateTimers.delete(userId);
    });

    // 새 subscription 저장
    this.totalCorrectAnswerUpdateTimers.set(userId, timerSubscription);
  }
}
