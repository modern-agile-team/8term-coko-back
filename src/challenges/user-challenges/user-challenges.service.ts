import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserChallengesDto } from './dto/create-user-challenges.dto';
import { UpdateUserChallengesDto } from './dto/update-user-challenges.dto';
import { UserChallengesRepository } from './user-challenges.repository';
import { QueryChallengesDto } from '../dto/query-challenges.dto';

@Injectable()
export class UserChallengesService {
  constructor(
    private readonly userChallengesRepository: UserChallengesRepository,
  ) {}

  async findAllByPageAndLimit(userId: number, query: QueryChallengesDto) {
    const { page, limit } = query;
    const allUserChallengessCount =
      await this.userChallengesRepository.getTotalUserChallengesCount(userId);

    const userChallengess =
      await this.userChallengesRepository.findSelectedPageUserChallengessInfo(
        userId,
        page,
        limit,
      );

    return {
      totalCount: allUserChallengessCount,
      currentPage: page,
      limit,
      contents: userChallengess,
    };
  }

  async findOne(userChallengesId: number) {
    const userChallenges =
      await this.userChallengesRepository.findOneById(userChallengesId);
    if (!userChallenges) {
      throw new NotFoundException(
        `ID: ${userChallengesId}를 찾을 수 없습니다.`,
      );
    }
  }

  async create(body: CreateUserChallengesDto) {
    return this.userChallengesRepository.createUserChallenges(body);
  }

  async update(userChallengesId: number, body: UpdateUserChallengesDto) {
    return this.userChallengesRepository.updateUserChallengesById(
      userChallengesId,
      body,
    );
  }
}
