import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartProgressRepository } from './part-progress.repository';
import { PartsService } from 'src/parts/parts.service';
import {
  PartProgress,
  PartStatusValues,
} from './entities/part-progress.entity';

@Injectable()
export class PartProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly partsService: PartsService,
    private readonly partProgressRepository: PartProgressRepository,
  ) {}
  /**
   * @todo 추후에 유저서비스에서 연결하는 코드로 변경하기
   * @param id
   * @returns
   */
  private async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`유저아이디 ${id}를 찾을 수 없습니다.`);
    }

    return user;
  }
  //

  async findOne(userId: number, partId: number): Promise<PartProgress> {
    await this.findUserById(userId);

    await this.partsService.findOne(partId);

    const partStatus = await this.partProgressRepository.findOneByKey(
      userId,
      partId,
    );

    if (!partStatus) {
      throw new NotFoundException('유저의 파트상태가 없습니다.');
    }

    return partStatus;
  }

  async findAll(userId: number): Promise<PartProgress[]> {
    await this.findUserById(userId);

    return this.partProgressRepository.findAllByUserId(userId);
  }

  async createOrUpdate(
    userId: number,
    partId: number,
    body: CreatePartProgressDto,
  ): Promise<PartProgress> {
    await this.findOne(userId, partId);

    return this.partProgressRepository.upsertPartStatus(userId, partId, body);
  }

  /**
   * 유저의 파트진행도 상태를 COMPLETED로 만드는 메소드
   * 다음 파트도 STARTED로 변경해줌
   * @param userId
   * @param partId
   * @returns COMPLETED된 파트 리턴해줌
   */
  async createOrUpdateCompleted(
    userId: number,
    partId: number,
  ): Promise<PartProgress> {
    const part = await this.partsService.findOne(partId);

    const { status } = await this.findOne(userId, partId);

    if (status === PartStatusValues.LOCKED) {
      throw new BadRequestException(
        `${status}는 COMPLETED로 변경 할 수 없습니다.`,
      );
    }

    const sectionParts = await this.partsService.findAllBySectionId(
      part.sectionId,
    );

    const nextOrder = part.order + 1;

    const nextPart = sectionParts.find((part) => part.order === nextOrder);

    const completed = new CreatePartProgressDto(PartStatusValues.COMPLETED);

    //다음 순서의 파트가 없으면
    if (!nextPart) {
      return this.partProgressRepository.upsertPartStatus(
        userId,
        partId,
        completed,
      );
    }

    //다음 순서의 파트가 있으면
    return this.prisma.$transaction(async (tx) => {
      const started = new CreatePartProgressDto(PartStatusValues.STARTED);

      //다음 파트의 상태는 STARTED가 됨
      await this.partProgressRepository.upsertPartStatus(
        userId,
        nextPart.id,
        started,
        tx,
      );

      return this.partProgressRepository.upsertPartStatus(
        userId,
        partId,
        completed,
        tx,
      );
    });
  }
}
