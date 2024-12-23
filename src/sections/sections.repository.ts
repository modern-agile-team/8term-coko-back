import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './entities/section.entity';
import { ResSectionDto } from './dto/res-section.dto';

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

  async findSectionWithPartsById(id: number): Promise<ResSectionDto> {
    return this.prisma.section.findUnique({
      where: { id },
      include: { part: true },
    });
  }

  async findSectionWithPartStatus(userId: number, id: number) {
    return this.prisma.section.findUnique({
      where: { id },
      include: {
        part: {
          include: {
            PartProgress: {
              where: { userId },
              select: { status: true },
            },
          },
        },
      },
    });
  }

  async findOneSectionByName(name: string): Promise<Section> {
    return this.prisma.section.findUnique({
      where: { name },
    });
  }

  async createSection(data: CreateSectionDto): Promise<Section> {
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
