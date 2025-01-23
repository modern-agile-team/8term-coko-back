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
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSectionOrderDto } from './dto/update-section-order.dto';
import {
  SectionParts,
  SectionPartsPartProgress,
  SectionPartsStatus,
} from 'src/common/type/type';
import { PaginationService } from 'src/pagination/pagination.service';
import { QuerySectionDto } from './dto/query-section.dto';
import { PaginatedResult } from 'src/pagination/pagination.interface';
import { DEFALTE_PAGE_SIZE } from './const/section.const';
import { PartStatusValues } from 'src/part-progress/entities/part-progress.entity';

@Injectable()
export class SectionsService {
  constructor(
    private readonly sectionsRepository: SectionsRepository,
    private readonly partsRepository: PartsRepository,
    private readonly paginationService: PaginationService,
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

  async findAllWithParts(
    query: QuerySectionDto,
  ): Promise<PaginatedResult<SectionPartsStatus>> {
    const { cursor, pageSize = DEFALTE_PAGE_SIZE } = query;

    // 1. 데이터베이스에서 데이터 가져오기
    const sectionPartsPartProgressArray =
      await this.sectionsRepository.findSectionsByCursor(pageSize, cursor);

    // 2. 디폴트 진행도 붙여주기
    const newSectons = sectionPartsPartProgressArray.map((sections) => {
      const { part, ...section } = sections;

      // ropository에서 받은 값 중 part를 정리하는 코드
      const newParts = part.map((part) => {
        return {
          ...part,
          status:
            part.order === 1
              ? PartStatusValues.STARTED
              : PartStatusValues.LOCKED,
        };
      });

      return {
        ...section,
        part: newParts,
      };
    });

    // 3. 페이지네이션 처리
    return this.paginationService.paginateById(newSectons, pageSize);
  }

  async findOne(id: number): Promise<Section> {
    const section = await this.sectionsRepository.findOneSectionById(id);

    if (!section) {
      throw new NotFoundException();
    }

    return section;
  }

  /**
   * 기존 findOneWithParts 에서 parts에 status가 들거가도록 서비스 변경
   */
  async findOneWithParts(id: number): Promise<SectionPartsStatus> {
    const { part, ...section } =
      await this.sectionsRepository.findSectionWithPartsById(id);

    if (!section) {
      throw new NotFoundException();
    }

    // ropository에서 받은 값 중 part를 정리하는 코드
    const newParts = part.map((part) => {
      return {
        ...part,
        status:
          part.order === 1 ? PartStatusValues.STARTED : PartStatusValues.LOCKED,
      };
    });

    return { part: newParts, ...section };
  }

  async findAllWithPartsAndStatus(
    userId: number,
    query: QuerySectionDto,
  ): Promise<PaginatedResult<SectionPartsStatus>> {
    const { cursor, pageSize = DEFALTE_PAGE_SIZE } = query;
    const sectionPartsPartProgressArray =
      await this.sectionsRepository.findSectionWithPartStatusByCursor(
        userId,
        pageSize,
        cursor,
      );

    const newSectons = sectionPartsPartProgressArray.map((sections) => {
      const { part, ...section } = sections;

      // ropository에서 받은 값 중 part를 정리하는 코드
      const newParts = part.map(({ PartProgress, ...orders }) => ({
        ...orders,
        status: PartProgress[0]?.status,
      }));

      return {
        ...section,
        part: newParts,
      };
    });

    return this.paginationService.paginateById(newSectons, pageSize);
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
