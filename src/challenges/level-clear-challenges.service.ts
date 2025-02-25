import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengesRepository } from './challenges.repository';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { UpdateUserChallengesDto } from './user-challenges/dto/update-user-challenges.dto';
import { ChallengeTypeValues } from './const/challenges.constant';
import { UserInfo } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/repositories/users.reposirory';

@Injectable()
export class LevelClearChallengesService {
  private readonly challengeType = ChallengeTypeValues.LEVEL_CLEAR;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly challengesRepository: ChallengesRepository,
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  async chackedByUserLevel(userId: number, completedLevel: number) {
    //const userId = user.id;
    //const completedLevel = level || user.level; // 이걸 잘 사용해봐도 좋을거 같음

    const challenge = await this.challengesRepository.findOneByTypeAndCondition(
      this.challengeType,
      completedLevel,
    );
    if (!challenge) {
      return null;
    }

    // 이미 완료된 도전과제라면, 추가 업데이트 없이 반환
    const userChallenge =
      await this.userChallengesRepository.findOneByChallenge(
        userId,
        challenge.id,
      );
    if (!userChallenge) {
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
