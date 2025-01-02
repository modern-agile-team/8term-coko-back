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

@Injectable()
export class PartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sectionsService: SectionsService,
    private readonly partsRepository: PartsRepository,
    private readonly quizzesRepository: QuizzesRepository,
    private readonly partProgressService: PartProgressService,
  ) {}
  /**
   * 파트 ID 배열을 재배열합니다.
   * @param movingId - 이동하려는 파트 ID
   * @param newOrder - 새로운 순서
   * @returns 재배열된 파트 ID 배열
   */
  private async reorderPartIds(
    movingId: number,
    newOrder: number,
  ): Promise<number[]> {
    const parts = await this.partsRepository.findAllPart();
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

    const maxOrder = await this.partsRepository.findPartMaxOrder();

    const newPart = await this.partsRepository.createPartById({
      ...body,
      order: maxOrder + 1,
    });

    //파트 생성시 모든 유저에게 디폴트 파트진행도 생성
    // 이 부분을 제거하고 트랜젝션에 직접적으로 partProgress 디폴드를 생성할 거임
    await this.partProgressService.createAllDefaultByPart(newPart);

    return newPart;
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
    const updatedPartIds = await this.reorderPartIds(id, body.order);

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
