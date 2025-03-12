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
import { Cron } from '@nestjs/schedule';
import {
  DAILY_RESET,
  WEEKLY_SEASON_RESET_TIME,
} from 'src/daily-quests/users-daily-quests/const/users-daily-quests.const';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { TopRankerPaginaion } from 'src/common/constants/rankings-constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT } from 'src/common/constants/event-constants';
import { UserItemsRepository } from 'src/users/repositories/user-items.repository';

@Injectable()
export class RankingsService {
  constructor(
    private readonly rankingsRepository: RankingsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly progressRepository: ProgressRepository,
    private readonly userItemsRepository: UserItemsRepository,
    private readonly eventEmitter: EventEmitter2,
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
    // 유저가 가지고 있는 아이템 저장할 배열
    const equippedItems = [];

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

    // contents.length 만큼 반복 = 해당 페이지의 보여줄 사용자 만큼
    for (let i = 0; i < contents.length; i++) {
      equippedItems.push(
        await this.userItemsRepository.findEquippedUserItems({
          userId: contents[i].id,
          isEquipped: true,
        }),
      );
    }

    return new RankingPaginationResponseDto({
      totalCount,
      currentPage: page,
      limit,
      contents,
      equippedItems,
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

    // rxjs timer를 사용해 예약
    const timerSubscription = timer(delayTime).subscribe(async () => {
      await this.usersRepository.updateUserTotalCorrectAnswer(
        userId,
        totalCorrectAnswer,
      );

      this.totalCorrectAnswerUpdateTimers.delete(userId);
    });

    // 새 subscription 저장
    this.totalCorrectAnswerUpdateTimers.set(userId, timerSubscription);
  }

  /**
   * 00시(자정)마다 모든 유저의 총 정답 수 업데이트
   */
  @Cron(DAILY_RESET)
  async dailyUpdateAllUsersTotalCorrectAnswer(): Promise<void> {
    // 모든 유저의 id 조회
    const users = await this.usersRepository.getAllUserIds();
    const userIds = users.map((user) => user.id);

    // 각 작업을 병렬 처리
    await Promise.all(
      userIds.map(async (userId) => {
        // 총 정답 수 조회
        const totalCorrectAnswer =
          await this.progressRepository.countProgressByQuery(
            userId,
            {},
            { isCorrect: true },
          );

        // 유저의 총 정답 수 업데이트
        await this.usersRepository.updateUserTotalCorrectAnswer(
          userId,
          totalCorrectAnswer,
        );
      }),
    );
  }

  /**
   * 다음 시즌 종료 시각(다음 월요일 00:00) 계산
   */
  getNextSeasonEndTime(): string {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    // 현재 시각
    const now = dayjs().tz('Asia/Seoul');

    // 이번 주 월요일 00:00보다 이미 시간이 지났다면 다음 주 월요일 00:00
    // dayjs().day(1) === "월요일 00시" 를 시즌 종료로 계산 (25.02.28)
    let nextEnd = now.day(1).hour(0).minute(0).second(0).millisecond(0);

    // 만약 이미 월요일 00:00을 지난 상태라면 다음 주 월요일로 세팅
    if (now.isAfter(nextEnd)) {
      nextEnd = nextEnd.add(1, 'week');
    }

    return nextEnd.format();
  }

  // 매주 월요일 00시 랭킹 집계
  @Cron(WEEKLY_SEASON_RESET_TIME, { timeZone: 'Asia/Seoul' })
  async updateWeeklySeasonResults(): Promise<void> {
    const levelTopRankers = await this.findSelectedPageRankings(
      'level',
      TopRankerPaginaion.PAGE_NUMBER,
      TopRankerPaginaion.PAGE_LIMIT,
    );
    const pointTopRankers = await this.findSelectedPageRankings(
      'point',
      TopRankerPaginaion.PAGE_NUMBER,
      TopRankerPaginaion.PAGE_LIMIT,
    );
    const attendanceTopRankers = await this.findSelectedPageRankings(
      'totalAttendance',
      TopRankerPaginaion.PAGE_NUMBER,
      TopRankerPaginaion.PAGE_LIMIT,
    );
    const correctAnswerTopRankers = await this.findSelectedPageRankings(
      'totalCorrectAnswer',
      TopRankerPaginaion.PAGE_NUMBER,
      TopRankerPaginaion.PAGE_LIMIT,
    );

    // 랭킹 도전과제 검사 이벤트 4가지 발행
    this.eventEmitter.emit(EVENT.LEVEL_RANKING.ATTAIN, { levelTopRankers });
    this.eventEmitter.emit(EVENT.POINT_RANKING.ATTAIN, { pointTopRankers });
    this.eventEmitter.emit(EVENT.ATTENDANCE_RANKING.ATTAIN, {
      attendanceTopRankers,
    });
    this.eventEmitter.emit(EVENT.CORRECT_ANSWER_RANKING.ATTAIN, {
      correctAnswerTopRankers,
    });
  }
}
