import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsRepository } from './sections.repository';
import { ReqSectionDto } from './dto/req-section.dto';
import { ResSectionDto } from './dto/res-section.dto';
import { ResSectionWithPartDto } from './dto/res-section-with-part.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly sectionsRepository: SectionsRepository) {}

  async findAll() {
    const sections = await this.sectionsRepository.findAllSections();
    return ResSectionDto.fromArray(sections);
  }

  async findOne(sectionDto: ReqSectionDto) {
    const section =
      await this.sectionsRepository.findSectionWithPartsById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    return ResSectionWithPartDto.from(section);
  }

  async create(CreateSectionDto: CreateSectionDto): Promise<void> {
    const section =
      await this.sectionsRepository.findOneSectionByName(CreateSectionDto);

    if (section) {
      throw new ConflictException();
    }

    await this.sectionsRepository.createSection(CreateSectionDto);
  }

  async update(sectionDto: ReqSectionDto): Promise<void> {
    const section =
      await this.sectionsRepository.findOneSectionById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    await this.sectionsRepository.updateSectionById(sectionDto);
  }

  async remove(sectionDto: ReqSectionDto): Promise<void> {
    const section =
      await this.sectionsRepository.findOneSectionById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    const part =
      await this.sectionsRepository.findOnePartBySectionId(sectionDto);

    if (part) {
      throw new ConflictException('섹션을 참조하고 있는 파트가 있음');
    }

    await this.sectionsRepository.deleteSectionById(sectionDto);
  }
}
