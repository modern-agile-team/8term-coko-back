import { Module } from '@nestjs/common';
import { UserItemsService } from '../services/user-items.service';
import { UserItemsController } from '../controllers/user-items.controller';

@Module({
  controllers: [UserItemsController],
  providers: [UserItemsService],
})
export class UserItemsModule {}
