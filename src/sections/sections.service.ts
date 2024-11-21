import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectionsRepository } from './sections.repository';
import { SectionDto } from './dto/section.dto';

@Injectable()
export class SectionsService {
  constructor(
    private readonly sectionsRepository: SectionsRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(CreateSectionDto: CreateSectionDto) {
    const section =
      await this.sectionsRepository.findOneSectionByName(CreateSectionDto);

    if (section) {
      throw new ConflictException();
    }

    return this.sectionsRepository.createSection(CreateSectionDto);
  }

  async findAll() {
    return this.sectionsRepository.findAllSections();
  }

  async findOne(sectionDto: SectionDto) {
    const section =
      await this.sectionsRepository.findOneSectionById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }

  async update(sectionDto: SectionDto) {
    const section =
      await this.sectionsRepository.findOneSectionById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    return this.sectionsRepository.updateSectionById(sectionDto);
  }

  async remove(sectionDto: SectionDto) {
    const section =
      await this.sectionsRepository.findOneSectionById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    //추후 변경
    const part = await this.prisma.part.findFirst({
      where: {
        sectionId: sectionDto.id,
      },
    });

    if (part) {
      throw new ConflictException('섹션을 참조하고 있는 파트가 있음');
    }

    return this.sectionsRepository.deleteSectionById(sectionDto);
  }
}
