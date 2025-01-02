import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PartsRepository } from './parts.repository';
import { SectionsService } from 'src/sections/sections.service';
import { QuizzesRepository } from 'src/quizzes/quizzes.repository';
import { Part } from './entities/part.entity';
import { UpdatePartOrderDto } from './dto/update-part-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartProgressService } from 'src/part-progress/part-progress.service';
import {
  PartStatus,
  PartStatusValues,
} from 'src/part-progress/entities/part-progress.entity';

@Injectable()
export class PartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sectionsService: SectionsService,
    private readonly partsRepository: PartsRepository,
    private readonly quizzesRepository: QuizzesRepository,
  ) {}
  /**
   * 파트 ID 배열을 재배열합니다.
   * @param movingId - 이동하려는 파트 ID
   * @param newOrder - 새로운 순서
   * @returns 재배열된 파트 ID 배열
   */
  private async reorderPartIds(
    { id, sectionId }: Part,
    newOrder: number,
  ): Promise<number[]> {
    const movingId = id;

    const parts = await this.partsRepository.findAllPartBySectionId(sectionId);
    const partIds = parts.map((part) => part.id);
    const currentIndex = partIds.indexOf(movingId);

    if (currentIndex === -1) {
      throw new NotFoundException('요청한 id 가 없습니다.');
    }

    if (newOrder > parts.length) {
      throw new BadRequestException('order 값이 너무 큽니다.');
    }

    partIds.splice(currentIndex, 1);
    partIds.splice(newOrder - 1, 0, movingId);

    return partIds;
  }

  /**
   * 파트 ID 배열을 기반으로 파트 순서를 데이터베이스에 업데이트합니다.
   * @param partIds - 재배열된 파트 ID 배열
   * @todo 이것 또 섹션처럼 비즈니스 로직인거 같은데 또 데이터베이스 관련 로직이라
   * repository로 보낼지 말지 고민 입니다.
   */
  private async updatePartOrders(partIds: number[]): Promise<void> {
    await this.prisma.$transaction(
      partIds.map((id, index) =>
        this.prisma.part.update({
          where: { id },
          data: { order: index + 1 },
        }),
      ),
    );
  }

  /**
   * 기본적으로 파트 생성시 모든 유저에게 생성된 파트의 진행도를 넣어 줍니다.
   * 지금은 매우 적은 유저가 있을꺼라 생각해서 그냥 다 불러오는데
   * 언젠가 수많은 유저가 생성되면 해당로직을 고쳐야합니다.
   */
  private async createDefaultPartProgress(order: number) {
    const users = await this.prisma.user.findMany();

    return users.map((user) => {
      let defaultStatus: PartStatus;

      if (order === 1) {
        defaultStatus = PartStatusValues.STARTED;
      } else {
        defaultStatus = PartStatusValues.LOCKED;
      }

      return {
        userId: user.id,
        status: defaultStatus,
      };
    });
  }

  async findOne(id: number): Promise<Part> {
    const part = await this.partsRepository.findOnePartById(id);

    if (!part) {
      throw new NotFoundException();
    }

    return part;
  }

  async findAll(): Promise<Part[]> {
    return this.partsRepository.findAllPart();
  }

  async create(body: CreatePartDto): Promise<Part> {
    const { sectionId, name } = body;

    await this.sectionsService.findOne(sectionId);

    const part = await this.partsRepository.findOnePartByName(name);

    if (part) {
      throw new ConflictException('part의 이름은 유니크 해야합니다.');
    }

    // 관련 섹션의 순서를 찾아보기
    const maxOrder = await this.partsRepository.aggregateBySectionId(sectionId);

    // 새로운 순서
    const newOrder = maxOrder + 1;

    // 파트 순서를 보고 모든유저에게 디폴트 진행도 값을 설정
    const defaultPartProgress = await this.createDefaultPartProgress(newOrder);

    // 각 값들로 트랜젝션 돌리기
    return this.partsRepository.createPartWithPartProgress(
      body,
      newOrder,
      defaultPartProgress,
    );
  }

  async updateAll(id: number, body: CreatePartDto): Promise<Part> {
    await this.findOne(id);
    return this.partsRepository.updateSectionById(id, body);
  }

  async updateOrder(id: number, body: UpdatePartOrderDto): Promise<Part> {
    const part = await this.findOne(id);

    // 기존 순서와 변경할 순서가 같다면 그대로 반환
    if (part.order === body.order) {
      return part;
    }

    // 파트 순서 재배치를 위한 처리
    const updatedPartIds = await this.reorderPartIds(part, body.order);

    // 데이터베이스의 파트 순서를 업데이트
    await this.updatePartOrders(updatedPartIds);

    // 변경된 섹션 반환
    return this.partsRepository.findOnePartById(id);
  }

  async remove(id: number): Promise<Part> {
    await this.findOne(id);

    const quiz = await this.quizzesRepository.findOneByPartId(id);

    if (quiz) {
      throw new ConflictException('파트를 참조하고 있는 문제가 있음');
    }

    return this.partsRepository.deletePartById(id);
  }
}
