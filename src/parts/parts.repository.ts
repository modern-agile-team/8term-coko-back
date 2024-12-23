import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { Injectable } from '@nestjs/common';
import { Part } from './entities/part.entity';

@Injectable()
export class PartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPart(): Promise<Part[]> {
    return this.prisma.part.findMany();
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

  async findPartMaxOrder(): Promise<number> {
    const result = await this.prisma.part.aggregate({
      _max: { order: true },
    });
    return result._max.order ?? 0;
  }

  async createPartById(data): Promise<Part> {
    return this.prisma.part.create({
      data,
    });
  }

  async deletePartById(id: number): Promise<Part> {
    return this.prisma.part.delete({
      where: { id },
    });
  }
}
