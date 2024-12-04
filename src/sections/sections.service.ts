import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsRepository } from './sections.repository';
import { ReqSectionDto } from './dto/req-section.dto';
import { ResSectionWithPartDto } from './dto/res-section-with-part.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly sectionsRepository: SectionsRepository) {}

  async findAll() {
    const sections = await this.sectionsRepository.findAllSections();
    return ResSectionWithPartDto.fromArray(sections);
  }

  async findOne(sectionDto: ReqSectionDto) {
    const section =
      await this.sectionsRepository.findSectionWithPartsById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    return new ResSectionWithPartDto(section);
  }

  async create(
    createSectionDto: CreateSectionDto,
  ): Promise<ResSectionWithPartDto> {
    const section =
      await this.sectionsRepository.findOneSectionByName(createSectionDto);

    if (section) {
      throw new ConflictException();
    }

    const newSection =
      await this.sectionsRepository.createSection(CreateSectionDto);
    return new ResSectionWithPartDto(newSection);
  }

  async update(sectionDto: ReqSectionDto): Promise<ResSectionWithPartDto> {
    const section =
      await this.sectionsRepository.findOneSectionById(sectionDto);

    if (!section) {
      throw new NotFoundException();
    }

    const updateSection =
      await this.sectionsRepository.updateSectionById(sectionDto);
    return new ResSectionWithPartDto(updateSection);
  }

  async remove(sectionDto: ReqSectionDto): Promise<ResSectionWithPartDto> {
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

    const deleteSctionInfo =
      await this.sectionsRepository.deleteSectionById(sectionDto);
    return new ResSectionWithPartDto(deleteSctionInfo);
  }
}
