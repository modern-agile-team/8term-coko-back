import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeRepository } from './challenge.repository';
import { QueryChallengeDto } from './dto/query-challenge.dto';
import { ResChallengePaginationDto } from './dto/res-challenge-pagination.dto';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async findAll(query: QueryChallengeDto) {
    const { page, limit } = query;
    const totalCount = await this.challengeRepository.getTotalChallengeCount();

    const contents =
      await this.challengeRepository.findSelectedPageChallengesInfo(
        page,
        limit,
      );

    // return new ResChallengePaginationDto({
    //   totalCount,
    //   currentPage: page,
    //   limit,
    //   contents,
    // });
  }

  async findOne(challengeId: number) {
    const challenge = await this.challengeRepository.findOneById(challengeId);

    if (!challenge) {
      throw new NotFoundException(`도전과제를 찾을 수 없습니다.${challengeId}`);
    }

    return challenge;
  }

  async create(body: CreateChallengeDto) {
    return await this.challengeRepository.createChallenge(body);
  }

  async update(challengeId: number, body: UpdateChallengeDto) {
    await this.findOne(challengeId);

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
