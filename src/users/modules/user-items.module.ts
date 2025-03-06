import { Module } from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { UserItemsController } from '../controllers/user-items.controller';
import { UserItemsRepository } from '../repositories/user-items.repository';

@Module({
  controllers: [UserItemsController],
  providers: [UserItemsService, UserItemsRepository],
  exports: [UserItemsRepository],
})
export class UserItemsModule {}
