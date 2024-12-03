import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartsRepository } from './parts.repository';
import { SectionsRepository } from 'src/sections/sections.repository';

@Injectable()
export class PartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly partsRepository: PartsRepository,
    private readonly sectionsRepository: SectionsRepository,
  ) {}

  async create(data: CreatePartDto) {
    //요기
    const { sectionId, name } = data;

    const section = await this.prisma.section.findUnique({
      where: {
        id: sectionId,
      },
    });
    //

    if (!section) {
      throw new NotFoundException();
    }

    //
    const part = await this.prisma.part.findUnique({
      where: {
        name,
      },
    });
    //

    if (part) {
      throw new ConflictException();
    }

    //
    return this.prisma.part.create({
      data,
    });
    //
  }

  async findAll() {
    //
    return this.prisma.part.findMany();
    //
  }

  async remove(id: number) {
    //
    const part = await this.prisma.part.findUnique({
      where: {
        id,
      },
    });
    //

    if (!part) {
      throw new NotFoundException();
    }

    //
    const quiz = await this.prisma.quiz.findFirst({
      where: {
        partId: id,
      },
    });
    //

    if (quiz) {
      throw new ConflictException('파트를 참조하고 있는 문제데이터가 있음');
    }

    //
    return this.prisma.part.delete({
      where: {
        id,
      },
    });
    //
  }
}
