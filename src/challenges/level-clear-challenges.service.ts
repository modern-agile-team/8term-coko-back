import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengesRepository } from './challenges.repository';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { UpdateUserChallengesDto } from './user-challenges/dto/update-user-challenges.dto';
import { ChallengeTypeValues } from './const/challenges.constant';
import { UserInfo } from 'src/users/entities/user.entity';

@Injectable()
export class LevelClearChallengesService {
  private readonly challengeType = ChallengeTypeValues.LEVEL_CLEAR;

  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  /**
   * 유저의 현재 레벨에 해당하는 모든 milestone(예: 10, 20, 30 등)에 대해
   * 도전과제를 한 번에 처리하는 메서드입니다.
   */
  async completeAllChallengesForUser(user: UserInfo) {
    //목표값 구하기
    const milestones = this.getMilestones(user.level, 10);

    //목표값이 없으면 null
    if (milestones.length === 0) {
      return null;
    }

    // 목표에 해당하는 도전과제들을 조회
    const challenges =
      await this.challengesRepository.findManyByTypeAndConditions(
        this.challengeType,
        milestones,
      );
    if (challenges.length === 0) {
      return null;
    }

    const challengeIds = challenges.map((challenge) => challenge.id);

    // 유저의 도전과제 상태들을 조회
    const userChallenges =
      await this.userChallengesRepository.findManyByUserAndChallengeIds(
        user.id,
        challengeIds,
      );

    if (challenges.length !== userChallenges.length) {
      throw new NotFoundException(
        '도전과제에 대한 유저의 도전과제 목록이 부족합니다.',
      );
    }

    const updateData: UpdateUserChallengesDto = {
      completed: true,
      completedDate: new Date(),
    };

    return await this.userChallengesRepository.updateManyUserChallenges(
      user.id,
      challengeIds,
      updateData,
    );
  }

  /**
   * 주어진 레벨과 간격을 기반으로 달성 가능한 milestone 목록을 반환합니다.
   * 예를 들어, 레벨이 32이고 간격이 10이면 [10, 20, 30]을 반환합니다.
   *
   * @param level 유저의 현재 레벨
   * @param interval milestone 간격 (기본값: 10)
   * @returns milestone 배열
   */
  private getMilestones(level: number, interval: number = 10): number[] {
    const milestones: number[] = [];
    const maxMilestone = Math.floor(level / interval) * interval;
    for (
      let milestone = interval;
      milestone <= maxMilestone;
      milestone += interval
    ) {
      milestones.push(milestone);
    }
    return milestones;
  }
}
