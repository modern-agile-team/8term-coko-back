import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserChallengesDto } from './dto/create-user-challenges.dto';
import { UserChallengesRepository } from './user-challenges.repository';
import {
  PaginationUserChallenges,
  UserChallenge,
} from './user-challenges.interface';
import { QueryUserChallengesDto } from './dto/query-user-challenges.dto';

@Injectable()
export class UserChallengesService {
  constructor(
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  async findAllByPageAndLimit(
    userId: number,
    query: QueryUserChallengesDto,
  ): Promise<PaginationUserChallenges> {
    const { page, limit, challengeType, completed } = query;
    const allUserChallengessCount =
      await this.userChallengesRepository.getTotalUserChallengesCount(
        userId,
        query,
      );

    const userChallengess =
      await this.userChallengesRepository.findSelectedPageUserChallengessInfo(
        userId,
        page,
        limit,
        challengeType,
        completed,
      );

    return {
      totalCount: allUserChallengessCount,
      currentPage: page,
      limit,
      contents: userChallengess,
    };
  }

  async findOne(userChallengesId: number): Promise<UserChallenge> {
    const userChallenges =
      await this.userChallengesRepository.findOneById(userChallengesId);

    if (!userChallenges) {
      throw new NotFoundException(
        `ID: ${userChallengesId}를 찾을 수 없습니다.`,
      );
    }

    return userChallenges;
  }

  async create(body: CreateUserChallengesDto): Promise<UserChallenge> {
    return this.userChallengesRepository.createUserChallenges(body);
  }
}
