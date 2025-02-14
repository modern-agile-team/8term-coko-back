import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeRepository } from './challenge.repository';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async findAll() {
    return `오프셋 페이지네이션`;
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
