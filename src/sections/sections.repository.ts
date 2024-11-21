import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from '@prisma/client';
import { SectionDto } from './dto/section.dto';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSections() {
    return this.prisma.section.findMany();
  }

  async findOneSectionById({ id }) {
    return this.prisma.section.findUnique({
      where: { id },
    });
  }

  async findSectionWithPartsById({ id }) {
    return this.prisma.section.findUnique({
      where: { id },
      include: { part: true },
    });
  }

  async findOneSectionByName({ name }) {
    return this.prisma.section.findUnique({
      where: { name },
    });
  }

  async createSection(data: CreateSectionDto) {
    return this.prisma.section.create({
      data,
    });
  }

  async updateSectionById({ id, ...data }: SectionDto) {
    return this.prisma.section.update({
      where: { id },
      data,
    });
  }

  async deleteSectionById({ id }) {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
