import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectionDto } from './dto/section.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from '@prisma/client';

@Injectable()
export class SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSections(): Promise<Section[]> {
    return this.prisma.section.findMany();
  }

  async findOneSectionById({ id }: SectionDto): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { id },
    });
  }

  async findSectionWithPartsById({ id }: SectionDto) {
    return this.prisma.section.findUnique({
      where: { id },
      include: { part: true },
    });
  }

  async findOneSectionByName({ name }: CreateSectionDto): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { name },
    });
  }

  async findOnePartBySectionId({ id }: SectionDto): Promise<Section> {
    return this.prisma.part.findFirst({
      where: { sectionId: id },
    });
  }

  async createSection(data: CreateSectionDto): Promise<void> {
    await this.prisma.section.create({
      data,
    });
  }

  async updateSectionById({ id, ...data }: SectionDto): Promise<void> {
    await this.prisma.section.update({
      where: { id },
      data,
    });
  }

  async deleteSectionById({ id }: SectionDto): Promise<void> {
    await this.prisma.section.delete({
      where: { id },
    });
  }
}
