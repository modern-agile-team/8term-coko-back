import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}
  create(name: string) {
    return this.prisma.sections.create({
      data: {
        name,
      },
    });
  }

  findAll() {
    return this.prisma.sections.findMany();
  }

  async findOne(id: number) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }

  async update(id: number, name: string) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return this.prisma.sections.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async remove(id: number) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return this.prisma.sections.delete({
      where: {
        id,
      },
    });
  }
}
