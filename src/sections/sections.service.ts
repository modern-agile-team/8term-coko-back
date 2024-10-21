import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  private async findSectionById(id: number) {
    const section = await this.prisma.sections.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    return section.id;
  }

  async create(sectionData: CreateSectionDto) {
    const { name } = sectionData;

    const section = await this.prisma.sections.findUnique({
      where: {
        name,
      },
    });

    if (section) {
      throw new ConflictException();
    }

    return this.prisma.sections.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
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

  async update(id: number, sectionData: UpdateSectionDto) {
    const { name } = sectionData;

    await this.findSectionById(id);

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
    await this.findSectionById(id);

    return this.prisma.sections.delete({
      where: {
        id,
      },
    });
  }
}
