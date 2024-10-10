import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePointDto } from './dto/update-point.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PointsService {
  constructor(private prisma: PrismaService) {}

  async getUsersPoint() {
    const usersPoint = await this.prisma.users.findMany({
      select: {
        id: true,
        point: true,
      },
    });
    return usersPoint;
  }

  async getUserPoint(id: number) {
    const userPoint = await this.prisma.users.findUnique({
      where: { id },
      select: { point: true },
    });
    if (!userPoint) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    return userPoint;
  }

  async updatePoint(id: number, updatePointData: UpdatePointDto) {
    if (!(await this.prisma.users.findUnique({ where: { id } }))) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    const userPoint = await this.prisma.users.update({
      where: { id },
      data: { point: { increment: updatePointData.point } },
      select: {
        id: true,
        point: true,
      },
    });

    return userPoint;
  }
}
