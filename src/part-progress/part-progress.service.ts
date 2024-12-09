import { Injectable } from '@nestjs/common';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PartProgressRepository } from './part-progress.repository';

@Injectable()
export class PartProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly partProgressRepository: PartProgressRepository,
  ) {}
  create(createPartProgressDto: CreatePartProgressDto) {
    return 'This action adds a new partProgress';
  }

  findAll() {
    return `This action returns all partProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partProgress`;
  }

  update(id: number, updatePartProgressDto: CreatePartProgressDto) {
    return `This action updates a #${id} partProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} partProgress`;
  }
}
