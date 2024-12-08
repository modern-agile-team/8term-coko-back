import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsRepository } from './sections.repository';
import { ReqSectionDto } from './dto/req-section.dto';
import { ResSectionDto } from './dto/res-section.dto';

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

    return new ResSectionDto(section);
  }

  async create(createSectionDto: CreateSectionDto): Promise<ResSectionDto> {
    const section =
      await this.sectionsRepository.findOneSectionByName(createSectionDto);

    if (section) {
      throw new ConflictException();
    }

    const newSection =
      await this.sectionsRepository.createSection(CreateSectionDto);
    return new ResSectionDto(newSection);
  }

  async update(sectionDto: ReqSectionDto): Promise<ResSectionDto> {
    const section =
      await this.sectionsRepository.findOneSectionById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    const updateSection =
      await this.sectionsRepository.updateSectionById(sectionDto);
    return new ResSectionDto(updateSection);
  }

  async remove(sectionDto: ReqSectionDto): Promise<ResSectionDto> {
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

    const deleteSectionInfo =
      await this.sectionsRepository.deleteSectionById(sectionDto);
    return new ResSectionDto(deleteSectionInfo);
  }
}
