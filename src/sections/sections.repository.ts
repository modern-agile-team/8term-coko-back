import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqSectionDto } from './dto/req-section.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { ResSectionDto } from './dto/res-section.dto';

@Injectable()
export class SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSections(): Promise<ResSectionDto[]> {
    return this.prisma.section.findMany();
  }

  async findOneSectionById({ id }): Promise<ResSectionDto> {
    return this.prisma.section.findUnique({
      where: { id },
    });
  }

  async findSectionWithPartsById({ id }): Promise<ResSectionDto> {
    return this.prisma.section.findUnique({
      where: { id },
      include: { part: true },
    });
  }

  async findOneSectionByName({ name }): Promise<ResSectionDto> {
    return this.prisma.section.findUnique({
      where: { name },
    });
  }

  async findOnePartBySectionId({ id }): Promise<ResSectionDto> {
    return this.prisma.part.findFirst({
      where: { sectionId: id },
    });
  }

  async createSection(data: CreateSectionDto): Promise<ResSectionDto> {
    return this.prisma.section.create({
      data,
    });
  }

  async updateSectionById({
    id,
    ...data
  }: ReqSectionDto): Promise<ResSectionDto> {
    return this.prisma.section.update({
      where: { id },
      data,
    });
  }

  async deleteSectionById({ id }: ReqSectionDto): Promise<ResSectionDto> {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
