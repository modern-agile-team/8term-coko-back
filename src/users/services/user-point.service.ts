import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePointDto } from '../dtos/update-point.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponsePointDto } from '../dtos/response-point.dto';
import { PrismaClientOrTransaction } from 'src/prisma/prisma.type';

@Injectable()
export class UserPointService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserPoint(id: number): Promise<ResponsePointDto> {
    const userPoint = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userPoint) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return new ResponsePointDto(userPoint);
  }

  async updatePoint(
    id: number,
    updatePointData: UpdatePointDto,
    txOrPrisma: PrismaClientOrTransaction = this.prisma,
  ): Promise<ResponsePointDto> {
    const user = await txOrPrisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`id ${id} not found`);
    } else if (0 > user.point + updatePointData.point) {
      throw new BadRequestException('user points are not enough');
    }

    const userPoint = await txOrPrisma.user.update({
      where: { id },
      data: { point: { increment: updatePointData.point } },
    });

    return new ResponsePointDto(userPoint);
  }
}
