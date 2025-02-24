import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengesRepository } from './challenges.repository';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { UpdateUserChallengesDto } from './user-challenges/dto/update-user-challenges.dto';
import { ChallengeTypeValues } from './const/challenges.constant';

@Injectable()
export class LevelClearChallengesService {
  private readonly challengeType = ChallengeTypeValues.LEVEL_CLEAR;

  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  async chackedByUserLevel(userId: number, completedLevel: number) {
    const challenge = await this.challengesRepository.findOneByTypeAndCondition(
      this.challengeType,
      completedLevel,
    );
    if (!challenge) {
      throw new NotFoundException('해당 레벨 도전과제가 존재하지 않습니다.');
    }

    // 이미 완료된 도전과제라면, 추가 업데이트 없이 반환
    const userChallenge =
      await this.userChallengesRepository.findOneByChallenge(
        userId,
        challenge.id,
      );
    if (userChallenge) {
      throw new NotFoundException('유저에게 도전과제가 없습니다.');
    }
    if (userChallenge.completed) {
      return null;
    }

    //없으면 완료 처리
    const updateData: UpdateUserChallengesDto = {
      completed: true,
      completedDate: new Date(),
    };

    return this.userChallengesRepository.updateUserChallengesByUserId(
      userId,
      challenge.id,
      updateData,
    );
  }
}
