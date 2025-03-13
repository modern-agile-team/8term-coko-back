import { Module } from '@nestjs/common';
import { UserPointService } from './user-point.service';
import { UserPointController } from './user-point.controller';

@Module({
  controllers: [UserPointController],
  providers: [UserPointService],
  exports: [UserPointService],
})
export class UserPointModule {}
