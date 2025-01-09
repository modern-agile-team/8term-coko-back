import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AdminUser } from '@prisma/client';

@Injectable()
export class AdminsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string): Promise<AdminUser> {
    return this.prisma.adminUser.findUnique({ where: { email } });
  }
}
