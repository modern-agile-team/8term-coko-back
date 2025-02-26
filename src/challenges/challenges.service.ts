import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChallengesDto } from './dto/create-challenges.dto';
import { UpdateChallengesDto } from './dto/update-challenges.dto';
import { ChallengesRepository } from './challenges.repository';
import { QueryChallengesDto } from './dto/query-challenges.dto';
import { Challenge, PaginationChallenges } from './challenges.interface';
import { UsersRepository } from 'src/users/repositories/users.reposirory';

@Injectable()
export class ChallengesService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly challengesRepository: ChallengesRepository,
  ) {}

  async findAllByPageAndLimit(
    query: QueryChallengesDto,
  ): Promise<PaginationChallenges> {
    const { page, limit, challengeType } = query;
    const allChallengesCount =
      await this.challengesRepository.getTotalChallengesCount();

    const challenges =
      await this.challengesRepository.findSelectedPageChallengesInfo(
        page,
        limit,
        challengeType,
      );

    return {
      totalCount: allChallengesCount,
      currentPage: page,
      limit,
      contents: challenges,
    };
  }

  async findOne(challengeId: number): Promise<Challenge> {
    const challenges = await this.challengesRepository.findOneById(challengeId);

    if (!challenges) {
      throw new NotFoundException(
        `도전과제 ${challengeId}를 찾을 수 없습니다.`,
      );
    }

    return challenges;
  }

  async chackedBadgeName(badgeName: string): Promise<Challenge> {
    const challenges =
      await this.challengesRepository.findOneByBadgeName(badgeName);

    if (challenges) {
      throw new ConflictException(`벳지이름은 유니크 해야합니다.`);
    }

    return challenges;
  }

  async create(body: CreateChallengesDto): Promise<Challenge> {
    const { badgeName } = body;

    await this.chackedBadgeName(badgeName);

    const allUsers = await this.usersRepository.findAllUsers();

    const defaultUserChallenges = allUsers.map((user) => {
      return { userId: user.id };
    });

    return this.challengesRepository.createChallenge(
      body,
      defaultUserChallenges,
    );
  }

  async update(
    challengeId: number,
    body: UpdateChallengesDto,
  ): Promise<Challenge> {
    const { badgeName } = body;

    await this.findOne(challengeId);

    badgeName && (await this.chackedBadgeName(badgeName));

    return await this.challengesRepository.updateChallengesById(
      challengeId,
      body,
    );
  }

  async remove(challengeId: number): Promise<Challenge> {
    await this.findOne(challengeId);

    return await this.challengesRepository.deleteChallengesById(challengeId);
  }
}
