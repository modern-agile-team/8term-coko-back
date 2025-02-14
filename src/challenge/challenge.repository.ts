import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `페이지네이션으로 구현되야함`;
  }

  findOneById(id: number) {
    return this.prisma.challenge.findUnique({
      where: { id },
    });
  }

  createChallenge(data: CreateChallengeDto) {
    return this.prisma.challenge.create({
      data,
    });
  }

  updateChallengeById(id: number, data: UpdateChallengeDto) {
    return this.prisma.challenge.update({
      where: { id },
      data,
    });
  }

  deleteChallengeById(id: number) {
    return this.prisma.challenge.delete({
      where: { id },
    });
  }
}
