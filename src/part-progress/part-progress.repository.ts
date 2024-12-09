import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartProgressRepository {
  constructor(private readonly prisma: PrismaService) {}
}
