import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';
import { PartProgress } from './entities/part-progress.entity';

@Injectable()
export class PartProgressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: number): Promise<PartProgress[]> {
    return this.prisma.partProgress.findMany({
      where: { userId },
    });
  }

  async upsertPartProgress(
    userId: number,
    partId: number,
    body: CreatePartProgressDto,
  ): Promise<PartProgress> {
    return this.prisma.partProgress.upsert({
      where: { userId_partId: { userId, partId } },
      create: { userId, partId, ...body },
      update: { userId, partId, ...body },
    });
  }
}
