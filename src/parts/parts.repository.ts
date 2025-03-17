import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { Injectable } from '@nestjs/common';
import { Part } from './entities/part.entity';
import { PartStatus } from 'src/part-progress/entities/part-progress.entity';

@Injectable()
export class PartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPart(): Promise<Part[]> {
    return this.prisma.part.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findAllPartBySectionId(sectionId: number): Promise<Part[]> {
    return this.prisma.part.findMany({
      where: { sectionId },
      orderBy: { order: 'asc' },
    });
  }

  async findOnePartById(id: number): Promise<Part> {
    return this.prisma.part.findUnique({
      where: { id },
    });
  }

  async findOnePartByName(name: string): Promise<Part> {
    return this.prisma.part.findUnique({
      where: { name },
    });
  }

  async findOnePartBySectionId(sectionId: number): Promise<Part> {
    return this.prisma.part.findFirst({
      where: { sectionId },
    });
  }

  async findOnePartByOrder(order: number): Promise<Part | null> {
    return this.prisma.part.findFirst({
      where: { order },
    });
  }

  /**
   *
   * @param sectionId - 섹션 아이디 별 파트 개수를 검색
   * @returns order를 리턴합니다. 파트가 하나도 없으면 0을 리턴
   */
  async aggregateBySectionId(sectionId: number): Promise<number> {
    const result = await this.prisma.part.aggregate({
      where: { sectionId },
      _max: { order: true },
    });
    return result._max.order ?? 0;
  }

  async createPartWithPartProgress(
    body: CreatePartDto,
    order: number,
    defaultPartProgress: { userId: number; status: PartStatus }[],
  ): Promise<Part> {
    return this.prisma.part.create({
      data: {
        ...body,
        order,
        PartProgress: {
          create: defaultPartProgress,
        },
      },
    });
  }

  async updateSectionById(id: number, data: CreatePartDto) {
    return this.prisma.part.update({
      where: { id },
      data,
    });
  }

  async deletePartById(id: number): Promise<Part> {
    return this.prisma.part.delete({
      where: { id },
    });
  }
}
