import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePartDto) {
    const { sectionId, name } = data;

    const section = await this.prisma.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      throw new NotFoundException();
    }

    const part = await this.prisma.part.findUnique({
      where: {
        name,
      },
    });

    if (part) {
      throw new ConflictException();
    }

    return this.prisma.part.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.part.findMany();
  }

  async remove(id: number) {
    const part = await this.prisma.part.findUnique({
      where: {
        id,
      },
    });

    if (!part) {
      throw new NotFoundException();
    }

    return this.prisma.part.delete({
      where: {
        id,
      },
    });
  }
}
