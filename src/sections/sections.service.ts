import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsRepository } from './sections.repository';
import { PartsRepository } from 'src/parts/parts.repository';
import { Section } from './entities/section.entity';
import { ResSectionDto } from './dto/res-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSectionOrderDto } from './dto/update-section-order.dto';

@Injectable()
export class SectionsService {
  constructor(
    private readonly sectionsRepository: SectionsRepository,
    private readonly partsRepository: PartsRepository,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * 섹션 ID 배열을 재배열합니다.
   * @param movingId - 이동하려는 섹션 ID
   * @param newOrder - 새로운 순서
   * @returns 재배열된 섹션 ID 배열
   */
  private async reorderSectionIds(
    movingId: number,
    newOrder: number,
  ): Promise<number[]> {
    const sections = await this.sectionsRepository.findAllSections();
    const sectionIds = sections.map((section) => section.id);
    const currentIndex = sectionIds.indexOf(movingId);

    if (currentIndex === -1) {
      throw new NotFoundException('요청한 id 가 없습니다.');
    }

    if (newOrder > sections.length) {
      throw new BadRequestException('order 값이 너무 큽니다.');
    }

    sectionIds.splice(currentIndex, 1);
    sectionIds.splice(newOrder - 1, 0, movingId);

    return sectionIds;
  }

  /**
   * 섹션 ID 배열을 기반으로 섹션 순서를 데이터베이스에 업데이트합니다.
   * @param sectionIds - 재배열된 섹션 ID 배열
   * @todo 이거 비즈니스 로직인거 같은데 또 데이터베이스 관련 로직이라
   * repository로 보낼지 말지 고민 입니다.
   */
  private async updateSectionOrders(sectionIds: number[]): Promise<void> {
    await this.prisma.$transaction(
      sectionIds.map((id, index) =>
        this.prisma.section.update({
          where: { id },
          data: { order: index + 1 },
        }),
      ),
    );
  }

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

    const maxOrder = await this.sectionsRepository.findSectionMaxOrder();
    const newOrder = maxOrder + 1;

    return this.sectionsRepository.createSection({ ...body, order: newOrder });
  }

  async updateAll(id: number, body: CreateSectionDto): Promise<Section> {
    await this.findOne(id);
    return this.sectionsRepository.updateSectionById(id, body);
  }

  async updateOrder(id: number, body: UpdateSectionOrderDto): Promise<Section> {
    const section = await this.findOne(id);

    // 기존 순서와 변경할 순서가 같다면 그대로 반환
    if (section.order === body.order) {
      return section;
    }

    // 섹션 순서 재배치를 위한 처리
    const updatedSectionIds = await this.reorderSectionIds(id, body.order);

    // 데이터베이스의 섹션 순서를 업데이트
    await this.updateSectionOrders(updatedSectionIds);

    // 변경된 섹션 반환
    return this.sectionsRepository.findOneSectionById(id);
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
