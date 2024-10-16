import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<ResponseUserDto[]> {
    return await this.prisma.users.findMany();
  }

  async getUser(id: number): Promise<ResponseUserDto> {
    const userResponse = await this.prisma.users.findUnique({ where: { id } });
    if (!userResponse) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return new ResponseUserDto(userResponse);
  }

  async createUser(createUserData: CreateUserDto): Promise<ResponseUserDto> {
    const userResponse = await this.prisma.users.create({
      data: createUserData,
    });
    return new ResponseUserDto(userResponse);
  }

  async updateUser(
    id: number,
    updateUserData: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    if (!(await this.prisma.users.findUnique({ where: { id } }))) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    const userResponse = await this.prisma.users.update({
      where: { id },
      data: updateUserData,
    });
    return new ResponseUserDto(userResponse);
  }

  async deleteUser(id: number): Promise<void> {
    if (!(await this.prisma.users.findUnique({ where: { id } }))) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    await this.prisma.users.delete({ where: { id } });
  }
}
