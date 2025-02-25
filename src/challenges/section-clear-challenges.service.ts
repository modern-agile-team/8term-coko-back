import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengesRepository } from './challenges.repository';
import { PartProgressRepository } from 'src/part-progress/part-progress.repository';
import { PartStatusValues } from 'src/part-progress/entities/part-progress.entity';
import { UserChallengesRepository } from './user-challenges/user-challenges.repository';
import { UpdateUserChallengesDto } from './user-challenges/dto/update-user-challenges.dto';
import { ChallengeTypeValues } from './const/challenges.constant';
import { SectionsRepository } from 'src/sections/sections.repository';

@Injectable()
export class SectionsChallengesService {
  private readonly challengeType = ChallengeTypeValues.SECTION_CLEAR;

  constructor(
    private readonly sectionsRepository: SectionsRepository,
    private readonly challengesRepository: ChallengesRepository,
    private readonly partProgressRepository: PartProgressRepository,
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  async checkAndCompleteSectionChallenge(userId: number, sectionId: number) {
    // 섹션 정보를 가져와서 order 값을 확인.
    const section = await this.sectionsRepository.findOneSectionById(sectionId);
    if (!section) {
      throw new NotFoundException('존재하지 않는 섹션입니다.');
    }

    // 섹션 order를 조건으로 도전과제를 조회.
    const challenge = await this.challengesRepository.findOneByTypeAndCondition(
      this.challengeType,
      section.order,
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

    // 사용자의 partProgress 중, COMPLETED가 아닌 항목들을 조회.
    const incompleteParts =
      await this.partProgressRepository.findAllExceptStatusValue(
        userId,
        PartStatusValues.COMPLETED,
      );

    // 미완료 항목이 있다면 업데이트 없이 종료.
    if (incompleteParts.length) {
      return null;
    }

    // 모든 part가 완료되었으므로, 도전과제를 완료.
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
