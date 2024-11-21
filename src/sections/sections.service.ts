import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsRepository } from './sections.repository';
import { SectionDto } from './dto/section.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly sectionsRepository: SectionsRepository) {}

  async findAll() {
    return this.sectionsRepository.findAllSections();
  }

  async findOne(sectionDto: SectionDto) {
    const section =
      await this.sectionsRepository.findSectionWithPartsById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }

  async create(CreateSectionDto: CreateSectionDto): Promise<void> {
    const section =
      await this.sectionsRepository.findOneSectionByName(CreateSectionDto);

    if (section) {
      throw new ConflictException();
    }

    await this.sectionsRepository.createSection(CreateSectionDto);
  }

  async update(sectionDto: SectionDto): Promise<void> {
    const section =
      await this.sectionsRepository.findOneSectionById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    await this.sectionsRepository.updateSectionById(sectionDto);
  }

  async remove(sectionDto: SectionDto): Promise<void> {
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
