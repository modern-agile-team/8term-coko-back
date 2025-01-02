import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import {
  PartStatus,
  PartStatusValues,
} from 'src/part-progress/entities/part-progress.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private async createDefaultPartProgress() {
    const parts = await this.prisma.part.findMany();

    return parts.map((part) => {
      let defaultStatus: PartStatus;

      if (part.order === 1) {
        defaultStatus = PartStatusValues.STARTED;
      } else {
        defaultStatus = PartStatusValues.LOCKED;
      }

      return {
        partId: part.id,
        status: defaultStatus,
      };
    });
  }

  getAllUsers(): Promise<ResponseUserDto[]> {
    return this.prisma.user.findMany();
  }

  async createUser(
    provider: string,
    providerId: string,
    name: string,
  ): Promise<ResponseUserDto> {
    // 유저 생성시 디폴트 파트 진행도를 생성
    const defaulPartProgress = await this.createDefaultPartProgress();

    const userResponse = await this.prisma.user.create({
      data: {
        provider,
        providerId,
        name,
        partProgress: {
          create: defaulPartProgress,
        },
      },
    });

    if (!userResponse) {
      throw new NotFoundException();
    }

    return userResponse;
  }

  async getUser(id: number): Promise<ResponseUserDto> {
    const userResponse = await this.prisma.user.findUnique({ where: { id } });
    if (!userResponse) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return new ResponseUserDto(userResponse);
  }

  async updateUser(
    id: number,
    updateUserData: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    if (!(await this.prisma.user.findUnique({ where: { id } }))) {
      throw new NotFoundException(`id ${id} not found`);
    }

    const userResponse = await this.prisma.user.update({
      where: { id },
      data: updateUserData,
    });
    return new ResponseUserDto(userResponse);
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`id ${id} not found`);
    }

    return this.prisma.user.delete({ where: { id } });
  }

  async getUserToken(userId: number): Promise<any> {
    const userTokenInfo = await this.prisma.token.findUnique({
      where: { userId },
    });
    if (!userTokenInfo) {
      throw new NotFoundException(`userId ${userId} not found`);
    }
    return userTokenInfo;
  }
}
