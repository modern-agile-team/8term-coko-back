import { Module } from '@nestjs/common';
import { UserPointService } from '../services/user-point.service';
import { UserPointController } from '../controllers/user-point.controller';

@Module({
  controllers: [UserPointController],
  providers: [UserPointService],
})
export class PointModule {}
