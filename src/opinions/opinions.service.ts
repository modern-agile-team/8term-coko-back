import { Injectable } from '@nestjs/common';
import { OpinionsRepository } from './opinions.repository';
import { CreateOpinionDto } from './dtos/create-opinion.dto';
import { ResOpinionsDto } from './dtos/res-opinions.dto';
import { ResMyOpinionsDto } from './dtos/res-my-opinions.dto';
import { UsersRepository } from 'src/users/users.repository';
import { Opinion } from './opinion.interface';

@Injectable()
export class OpinionsService {
  constructor(
    private readonly opinionsRepository: OpinionsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  // 모든 opinions 조회
  async findAllOpinions(): Promise<ResOpinionsDto> {
    const totalCount = await this.opinionsRepository.calculateTotalCount();
    const allOpinions = await this.opinionsRepository.findAllOpinions();

    // 모든 opinion에 대해 사용자 정보를 병렬로 조회하여 email을 추가
    const opinionsWithEmails = await Promise.all(
      allOpinions.map(async (opinion) => {
        const userInfo = await this.usersRepository.getUserInfo(opinion.userId);
        return { ...opinion, email: userInfo.email };
      }),
    );

    return ResOpinionsDto.fromArray(totalCount, opinionsWithEmails);
  }

  // 나의 opinions 조회
  async findMyOpinions(userId: number): Promise<ResMyOpinionsDto[]> {
    const myOpinions = await this.opinionsRepository.findMyOpinions(userId);

    return ResMyOpinionsDto.fromArray(myOpinions);
  }

  // opinion 추가
  async createOpinion(userId: number, body: CreateOpinionDto): Promise<void> {
    await this.opinionsRepository.createOpinion(userId, body);
  }

  // opinions 삭제
  async deleteOpinion(opinionId: number): Promise<void> {
    await this.opinionsRepository.deleteOpinion(opinionId);
  }
}
