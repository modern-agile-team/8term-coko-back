import { Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    return `This action returns a #${id} userChallenge`;
  }

  async create(createUserChallengeDto: CreateUserChallengeDto) {
    return 'This action adds a new userChallenge';
  }

  async update(id: number, updateUserChallengeDto: UpdateUserChallengeDto) {
    return `This action updates a #${id} userChallenge`;
  }
}
