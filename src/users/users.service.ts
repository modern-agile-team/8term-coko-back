import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return await this.prisma.users.findMany();
  }

  async getUser(id: number): Promise<Users> {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`ID ${id} not found`);
    }
    return user;
  }

  async createUser(createUserData: CreateUserDto): Promise<Users> {
    return await this.prisma.users.create({ data: createUserData });
  }

  async updateUser(id: number, updateUserData: UpdateUserDto): Promise<Users> {
    if (!(await this.prisma.users.findUnique({ where: { id } }))) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    const user = await this.prisma.users.update({
      where: { id },
      data: updateUserData,
    });

    return user;
  }

  async deleteUser(id: number): Promise<Users> {
    if (!(await this.prisma.users.findUnique({ where: { id } }))) {
      throw new NotFoundException(`ID ${id} not found`);
    }

    return this.prisma.users.delete({ where: { id } });
  }
}
