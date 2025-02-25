import { Injectable } from '@nestjs/common';
import { OpinionsRepository } from './opinions.repository';
import { CreateOpinionDto } from './dtos/create-opinion.dto';
import { ResOpinionsDto } from './dtos/res-opinions.dto';
import { ResMyOpinionsDto } from './dtos/res-my-opinions.dto';

@Injectable()
export class OpinionsService {
  constructor(private readonly opinionsRepository: OpinionsRepository) {}

  async findAllOpinions(): Promise<ResOpinionsDto> {
    const totalCount = await this.opinionsRepository.calculateTotalCount();
    const allOpinions = await this.opinionsRepository.findAllOpinions();

    return ResOpinionsDto.fromArray(totalCount, allOpinions);
  }

  async findMyOpinions(userId: number): Promise<ResMyOpinionsDto[]> {
    const myOpinions = await this.opinionsRepository.findMyOpinions(userId);

    return ResMyOpinionsDto.fromArray(myOpinions);
  }

  async createOpinion(userId: number, body: CreateOpinionDto): Promise<void> {
    await this.opinionsRepository.createOpinion(userId, body);
  }

  async deleteOpinion(opinionId: number): Promise<void> {
    await this.opinionsRepository.deleteOpinion(opinionId);
  }
}
