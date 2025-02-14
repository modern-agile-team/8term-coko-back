import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengeRepository {
  findAll() {
    return `This action returns all challenge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  create(createChallengeDto: CreateChallengeDto) {
    return 'This action adds a new challenge';
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
