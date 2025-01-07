import { Module } from '@nestjs/common';
import { UserItemService } from '../services/user-item.service';
import { UserItemController } from '../controllers/user-item.controller';

@Module({
  controllers: [UserItemController],
  providers: [UserItemService],
})
export class UserItemModule {}
