// module : service와 controller를 NestJS에 등록한다
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemsRepository } from './items.repository';
@Module({
  imports: [PrismaModule],
  providers: [ItemsService, ItemsRepository],
  controllers: [ItemsController],
})
export class ItemsModule {}
