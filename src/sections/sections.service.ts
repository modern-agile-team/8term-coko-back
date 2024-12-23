import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsRepository } from './sections.repository';
import { PartsRepository } from 'src/parts/parts.repository';
import { Section } from './entities/section.entity';
import { ResSectionDto } from './dto/res-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    private readonly sectionsRepository: SectionsRepository,
    private readonly partsRepository: PartsRepository,
  ) {}

  async findAll() {
    return this.sectionsRepository.findAllSections();
  }

  async findOne(id: number): Promise<Section> {
    const section = await this.sectionsRepository.findOneSectionById(id);

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }

  async findOneWithParts(id: number): Promise<ResSectionDto> {
    const sectionWithParts =
      await this.sectionsRepository.findSectionWithPartsById(id);

    if (!sectionWithParts) {
      throw new NotFoundException();
    }

    return sectionWithParts;
  }

  async findOneWithPartsAndStatus(
    userId: number,
    id: number,
  ): Promise<ResSectionDto> {
    const { part, ...section } =
      await this.sectionsRepository.findSectionWithPartStatus(userId, id);

    if (!section) {
      throw new NotFoundException();
    }

    // ropository에서 받은 값 중 part를 정리하는 코드
    const newParts = part.map(
      ({ PartProgress, createdAt, updatedAt, ...orders }) => ({
        ...orders,
        status: PartProgress[0]?.status,
      }),
    );

    return {
      ...section,
      part: newParts,
    };
  }

  async create(body: CreateSectionDto): Promise<Section> {
    const { name } = body;
    const section = await this.sectionsRepository.findOneSectionByName(name);

    if (section) {
      throw new ConflictException();
    }

    return this.sectionsRepository.createSection(body);
  }

  async update(id: number, body: CreateSectionDto): Promise<Section> {
    await this.findOne(id);

    return this.sectionsRepository.updateSectionById(id, body);
  }

  async remove(id: number): Promise<Section> {
    await this.findOne(id);

    const part = await this.partsRepository.findOnePartBySectionId(id);

    if (part) {
      throw new ConflictException('섹션을 참조하고 있는 파트가 있음');
    }

    return this.sectionsRepository.deleteSectionById(id);
  }
}
