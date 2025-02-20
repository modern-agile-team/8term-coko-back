import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';
import { PartProgress, PartStatus } from './entities/part-progress.entity';
import { PrismaClientOrTransaction } from 'src/prisma/prisma.type';

@Injectable()
export class PartProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: number): Promise<PartProgress[]> {
    return this.prisma.partProgress.findMany({
      where: { userId },
    });
  }

  async findAllExceptStatusValue(
    userId: number,
    status: PartStatus,
  ): Promise<PartProgress[]> {
    return this.prisma.partProgress.findMany({
      where: { userId, status: { not: status } },
    });
  }

  async findOneByKey(userId: number, partId: number): Promise<PartProgress> {
    return this.prisma.partProgress.findUnique({
      where: { userId_partId: { userId, partId } },
    });
  }

  async findOneBySectionIdAndOrderByDesc(
    userId: number,
    sectionId: number,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ) {
    return txOrPrisma.partProgress.findFirst({
      where: {
        userId,
        part: { sectionId },
      },
      orderBy: {
        part: { order: 'desc' },
      },
    });
  }

  async upsertPartStatus(
    userId: number,
    partId: number,
    body: CreatePartProgressDto,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ): Promise<PartProgress> {
    return txOrPrisma.partProgress.upsert({
      where: { userId_partId: { userId, partId } },
      create: { userId, partId, ...body },
      update: { userId, partId, ...body },
    });
  }
}
