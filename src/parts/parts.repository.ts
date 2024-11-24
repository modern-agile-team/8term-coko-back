import { PrismaService } from 'src/prisma/prisma.service';
import { ReqPartDto } from './dto/req-part.part.dto';

export class PartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOnePartById({ id }: ReqPartDto): Promise<void> {
    await this.prisma.part.findUnique({
      where: { id },
    });
  }
}
