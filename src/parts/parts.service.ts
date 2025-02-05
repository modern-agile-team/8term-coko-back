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
import {
  PartStatus,
  PartStatusValues,
} from 'src/part-progress/entities/part-progress.entity';
import { PartProgressRepository } from 'src/part-progress/part-progress.repository';

@Injectable()
export class PartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sectionsService: SectionsService,
    private readonly partsRepository: PartsRepository,
    private readonly partProgressRepository: PartProgressRepository,
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
   * 이 메소드는 모든 유저에게 추가된 파트의 상태가 어떻게 들어가게 될지 정해지는 메소드 입니다.
   * 1. 비동기, 트랜잭션으로 작동합니다.
   * 2. 기본적으로 LOCKED로 설정됩니다.
   * 3. 추가된 파트의 순서가 첫번째일때 STARTED로 설정됩니다,
   * 4. 유저의 마지막 순서의 파트가 COMPLETED일때 STARTED로 설정됩니다.
   *
   * 기본적으로 파트 생성시 모든 유저에게 생성된 파트의 진행도를 넣어 줍니다.
   * 지금은 매우 적은 유저가 있을꺼라 생각해서 그냥 다 불러오는데
   * 언젠가 수많은 유저가 생성되면 해당로직을 고쳐야합니다.
   */
  private async appendPartStatusForAllUsers(sectionId: number, order: number) {
    return this.prisma.$transaction(async (tx) => {
      // 모든 유저 조회
      const users = await tx.user.findMany();

      // 각 유저의 파트 진행 상태 생성
      return Promise.all(
        users.map(async (user) => {
          //기본적으로 잠김
          let newPartStatus: PartStatus = PartStatusValues.LOCKED;

          //마지막 상태 가져옴
          const lastPartStatus =
            await this.partProgressRepository.findOneBySectionIdAndOrderByDesc(
              user.id,
              sectionId,
              tx,
            );

          //첫번째 파트 일때 열림
          if (order === 1) {
            newPartStatus = PartStatusValues.STARTED;
          }

          //마지막상태가 완료면 열림
          if (lastPartStatus?.status === PartStatusValues.COMPLETED) {
            newPartStatus = PartStatusValues.STARTED;
          }

          return {
            userId: user.id,
            status: newPartStatus,
          };
        }),
      );
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

  /**
   * 같은 섹션아이디의 파트들을 가져옴
   * 만일 중복되는 order가 있으면 에러를 던짐
   * @param sectionId
   * @returns
   */
  async findAllBySectionId(sectionId: number) {
    const parts = await this.partsRepository.findAllPartBySectionId(sectionId);

    const orders = parts.map((part) => part.order);
    const uniqueOrders = new Set(orders);

    if (uniqueOrders.size !== orders.length) {
      throw new ConflictException(
        '같은 섹션 내에 중복된 order 값을 가진 파트가 존재합니다.',
      );
    }

    return parts;
  }

  /**
   * 새로운 파트를 추가하는 함수
   * 1. 섹션아이디와 이름을 디비에서 검증해봐야함
   * 2. 새로운 파트를 추가할때는 유저들에게 이 새로운 파트의 상태가 어떻게 추가 되야할지 고려해야함
   * @param body
   * @returns
   */
  async create(body: CreatePartDto): Promise<Part> {
    const { sectionId, name } = body;

    //섹션아이디 검증
    await this.sectionsService.findOne(sectionId);

    //파트 네이밍 검증
    const part = await this.partsRepository.findOnePartByName(name);

    if (part) {
      throw new ConflictException('part의 이름은 유니크 해야합니다.');
    }

    //1. 추가
    //유저들의 part 상태를 추가하는 함수 실행 -> 리턴은 defaultPartProgress 배열이 나와야함

    // 관련 섹션의 순서를 찾아보기
    const maxOrder = await this.partsRepository.aggregateBySectionId(sectionId);

    // 새로운 순서
    const newOrder = maxOrder + 1;

    // 파트 순서를 보고 모든유저에게 디폴트 진행도 값을 설정
    const AllUsersPartStatus = await this.appendPartStatusForAllUsers(
      sectionId,
      newOrder,
    );

    // 각 값들로 트랜젝션 돌리기
    return this.partsRepository.createPartWithPartProgress(
      body,
      newOrder,
      AllUsersPartStatus,
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
