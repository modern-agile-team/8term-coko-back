import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpinionDto } from './dtos/create-opinion.dto';
import { ResOpinionsDto } from './dtos/res-opinions.dto';
import { Opinion } from './opinion.interface';

@Injectable()
export class OpinionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllOpinions(): Promise<Opinion[]> {
    return this.prisma.opinion.findMany();
  }

  findMyOpinions(userId: number): Promise<Opinion[]> {
    return this.prisma.opinion.findMany({ where: { userId } });
  }

  createOpinion(userId: number, body: CreateOpinionDto): Promise<Opinion> {
    return this.prisma.opinion.create({ data: { userId, ...body } });
  }

  deleteOpinion(opinionId: number): Promise<Opinion> {
    return this.prisma.opinion.delete({ where: { id: opinionId } });
  }

  calculateTotalCount(): Promise<number> {
    return this.prisma.opinion.count();
  }
}
