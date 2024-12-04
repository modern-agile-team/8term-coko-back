import { PrismaService } from 'src/prisma/prisma.service';
import { ResPartDto } from './dto/res-part.part.dto';
import { CreatePartDto } from './dto/create-part.dto';

export class PartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPart(): Promise<ResPartDto[]> {
    return this.prisma.part.findMany();
  }

  async findOnePartById({ id }): Promise<ResPartDto> {
    return this.prisma.part.findUnique({
      where: { id },
    });
  }

  async findOnePartByName({ name }): Promise<ResPartDto> {
    return this.prisma.part.findUnique({
      where: { name },
    });
  }

  async createPartById(data: CreatePartDto): Promise<ResPartDto> {
    return this.prisma.part.create({
      data,
    });
  }

  async deletePartById({ id }): Promise<ResPartDto> {
    return this.prisma.part.delete({
      where: { id },
    });
  }
}
