import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeRepository } from './challenge.repository';
import { QueryChallengeDto } from './dto/query-challenge.dto';
import { ResChallengePaginationDto } from './dto/res-challenge-pagination.dto';
import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { ResChallengeDto } from './dto/res-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async findAllByPageAndLimit(query: QueryChallengeDto) {
    const { page, limit } = query;
    const allChallengesCount =
      await this.challengeRepository.getTotalChallengeCount();

    const challenges =
      await this.challengeRepository.findSelectedPageChallengesInfo(
        page,
        limit,
      );

    return {
      totalCount: allChallengesCount,
      currentPage: page,
      limit,
      contents: challenges,
    };
  }

  async findOne(challengeId: number) {
    const challenge = await this.challengeRepository.findOneById(challengeId);

    if (!challenge) {
      throw new NotFoundException(`도전과제를 찾을 수 없습니다.${challengeId}`);
    }

    return challenge;
  }

  async chackedBadgeName(badgeName: string) {
    const challenge =
      await this.challengeRepository.findOneByBadgeName(badgeName);

    if (challenge) {
      throw new ConflictException(`벳지이름은 유니크 해야합니다.`);
    }

    return challenge;
  }

  async create(body: CreateChallengeDto) {
    const { badgeName } = body;

    await this.chackedBadgeName(badgeName);

    return await this.challengeRepository.createChallenge(body);
  }

  async update(challengeId: number, body: UpdateChallengeDto) {
    const { badgeName } = body;

    await this.findOne(challengeId);

    badgeName && (await this.chackedBadgeName(badgeName));

    return await this.challengeRepository.updateChallengeById(
      challengeId,
      body,
    );
  }

  async remove(challengeId: number) {
    await this.findOne(challengeId);

    return await this.challengeRepository.deleteChallengeById(challengeId);
  }
}
