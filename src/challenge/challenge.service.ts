import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeRepository } from './challenge.repository';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  findAll() {
    return `오프셋 페이지네이션`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  create(body: CreateChallengeDto) {
    return 'This action adds a new challenge';
  }

  update(id: number, body: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
