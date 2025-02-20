import { Injectable, NotFoundException } from '@nestjs/common';
import { PartStatus } from '@prisma/client';
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

  async chackedByAllPartStatusCompleted(userId: number, sectionId: number) {
    //어떤 도전과제에 대한 내용인지 먼저 찾기
    const challengeType = this.challengeType;

    const { order } =
      await this.sectionsRepository.findOneSectionById(sectionId);

    const chalenge = await this.challengesRepository.findOneByTypeAndCondition(
      challengeType,
      order, //이곳에서 condition은 section의 order
    );

    if (!chalenge) {
      throw new NotFoundException('존재하지 않는 도전과제 입니다.');
    }

    //partProgress중 completed가 아닌 값이 있는지 확인
    const excludedStatus: PartStatus = PartStatusValues.COMPLETED;

    const filteredPartStatus =
      await this.partProgressRepository.findAllExceptStatusValue(
        userId,
        excludedStatus,
      );

    //값이 있으면 리턴
    if (filteredPartStatus.length) {
      return null;
    }

    //없으면 완료 처리
    const data: UpdateUserChallengesDto = {
      completed: true,
      completedDate: new Date(),
    };

    const userChallengeUpdateData =
      await this.userChallengesRepository.updateUserChallengesByUserId(
        userId,
        chalenge.id,
        data,
      );

    return userChallengeUpdateData;
  }
}
