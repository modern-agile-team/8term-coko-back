import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ItemsService, PrismaService],
  controllers: [ItemsController],
})
export class ItemsModule {}
