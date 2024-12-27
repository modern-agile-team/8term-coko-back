import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartProgressRepository } from './part-progress.repository';
import { PartsService } from 'src/parts/parts.service';
import {
  PartProgress,
  PartStatus,
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
      throw new NotFoundException();
    }

    return user;
  }
  //

  async findAll(userId: number): Promise<PartProgress[]> {
    await this.findUserById(userId);

    return this.partProgressRepository.findAllByUserId(userId);
  }

  async createOrUpdate(
    userId: number,
    partId: number,
    body: CreatePartProgressDto,
  ): Promise<PartProgress> {
    await this.findUserById(userId);

    await this.partsService.findOne(partId);

    return this.partProgressRepository.upsertPartProgress(userId, partId, body);
  }

  async createAllDefault(userId: number) {
    await this.findUserById(userId);

    const parts = await this.partsService.findAll();

    const insertParts = parts.map((part) => {
      let defaultStatus: PartStatus;

      if (part.order === 1) {
        defaultStatus = PartStatusValues.STARTED;
      } else {
        defaultStatus = PartStatusValues.LOCKED;
      }

      return {
        userId,
        partId: part.id,
        status: defaultStatus,
      };
    });

    return this.partProgressRepository.createAllDefaultPartProgressByUserId(
      insertParts,
    );
  }
}
