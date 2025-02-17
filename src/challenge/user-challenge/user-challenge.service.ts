import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserChallengeDto } from './dto/create-user-challenge.dto';
import { UpdateUserChallengeDto } from './dto/update-user-challenge.dto';
import { UserChallengeRepository } from './user-challenge.repository';
import { QueryChallengeDto } from '../dto/query-challenge.dto';

@Injectable()
export class UserChallengeService {
  constructor(
    private readonly userChallengeRepository: UserChallengeRepository,
  ) {}

  async findAllByPageAndLimit(userId: number, query: QueryChallengeDto) {
    const { page, limit } = query;
    const allUserChallengesCount =
      await this.userChallengeRepository.getTotalUserChallengeCount(userId);

    const userChallenges =
      await this.userChallengeRepository.findSelectedPageUserChallengesInfo(
        userId,
        page,
        limit,
      );

    return {
      totalCount: allUserChallengesCount,
      currentPage: page,
      limit,
      contents: userChallenges,
    };
  }

  async findOne(userChallengeId: number) {
    const userChallenge =
      await this.userChallengeRepository.findOneById(userChallengeId);
    if (!userChallenge) {
      throw new NotFoundException(`ID: ${userChallengeId}를 찾을 수 없습니다.`);
    }
  }

  async create(body: CreateUserChallengeDto) {
    return this.userChallengeRepository.createUserChallenge(body);
  }

  async update(userChallengeId: number, body: UpdateUserChallengeDto) {
    return this.userChallengeRepository.updateUserChallengeById(
      userChallengeId,
      body,
    );
  }
}
