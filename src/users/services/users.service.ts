import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getAllUsers(): Promise<ResponseUserDto[]> {
    return this.prisma.user.findMany();
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

  async getUserToken(id: number): Promise<any> {
    const userTokenInfo = await this.prisma.token.findUnique({ where: { id } });
    if (!userTokenInfo) {
      throw new NotFoundException(`id ${id} not found`);
    }
    return userTokenInfo;
  }
}
