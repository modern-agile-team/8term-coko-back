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
export class FirstItemBuyChallengesService {
  private readonly challengeType = ChallengeTypeValues.FIRST_ITEM_PURCHASE;

  constructor(
    private readonly sectionsRepository: SectionsRepository,
    private readonly challengesRepository: ChallengesRepository,
    private readonly partProgressRepository: PartProgressRepository,
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  async completedChallenge(userId: number) {
    //userChallengesRepository 조회
    //userChallengesRepository 업데이트
    return;
  }
}
