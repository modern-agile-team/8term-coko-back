import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePointDto } from '../dtos/update-point.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponsePointDto } from '../dtos/response-point.dto';

@Injectable()
export class UserPointService {
  constructor(private prisma: PrismaService) {}

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
  ): Promise<ResponsePointDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`id ${id} not found`);
    } else if (0 > user.point + updatePointData.point) {
      throw new BadRequestException('user points are not enough');
    }

    const userPoint = await this.prisma.user.update({
      where: { id },
      data: { point: { increment: updatePointData.point } },
    });

    return new ResponsePointDto(userPoint);
  }
}
