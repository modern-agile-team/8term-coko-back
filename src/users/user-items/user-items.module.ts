import { Module } from '@nestjs/common';
import { UserItemsService } from './user-items.service';
import { UserItemsController } from './user-items.controller';
import { UserItemsRepository } from './user-items.repository';

@Module({
  controllers: [UserItemsController],
  providers: [UserItemsService, UserItemsRepository],
  exports: [UserItemsRepository],
})
export class UserItemsModule {}
