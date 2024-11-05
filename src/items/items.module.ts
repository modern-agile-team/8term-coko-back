// module : service와 controller를 NestJS에 등록한다
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
