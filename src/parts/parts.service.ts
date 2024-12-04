import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartsRepository } from './parts.repository';
import { SectionsRepository } from 'src/sections/sections.repository';
import { ResPartDto } from './dto/res-part.part.dto';
import { ReqPartDto } from './dto/req-part.part.dto';

@Injectable()
export class PartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly partsRepository: PartsRepository,
    private readonly sectionsRepository: SectionsRepository,
  ) {}

  async create(createPartDto: CreatePartDto) {
    const { sectionId } = createPartDto;

    const section = await this.sectionsRepository.findOneSectionById({
      id: sectionId,
    });

    if (!section) {
      throw new NotFoundException();
    }

    const part = await this.partsRepository.findOnePartByName(createPartDto);

    if (part) {
      throw new ConflictException(); //수정사항
    }

    const newPart = await this.partsRepository.createPartById(createPartDto);
    return new ResPartDto(newPart);
  }

  async findAll() {
    const parts = await this.partsRepository.findAllPart();
    return ResPartDto.fromArray(parts);
  }

  async remove(partDto: ReqPartDto) {
    const { id } = partDto;

    const part = await this.partsRepository.findOnePartById(partDto);

    if (!part) {
      throw new NotFoundException(); //수정사항
    }

    // 수정사항
    const quiz = await this.prisma.quiz.findFirst({
      where: {
        partId: id,
      },
    });
    //

    if (quiz) {
      throw new ConflictException('파트를 참조하고 있는 문제데이터가 있음');
    }

    const deletePartInfo = await this.partsRepository.deletePartById(partDto);
    return new ResPartDto(deletePartInfo);
  }
}
