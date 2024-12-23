import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSections(): Promise<Section[]> {
    return this.prisma.section.findMany();
  }

  async findOneSectionById(id: number): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { id },
    });
  }

  async findSectionWithPartsById(id: number): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { id },
      include: { part: true },
    });
  }

  async findOneSectionByName(name: string): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { name },
    });
  }

  async findSectionMaxOrder(): Promise<number> {
    const result = await this.prisma.section.aggregate({
      _max: { order: true },
    });
    return result._max.order ?? 0;
  }

  async createSection(data): Promise<Section> {
    return this.prisma.section.create({
      data,
    });
  }

  async updateSectionById(
    id: number,
    data: CreateSectionDto,
  ): Promise<Section> {
    return this.prisma.section.update({
      where: { id },
      data,
    });
  }

  async deleteSectionById(id: number): Promise<Section> {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
