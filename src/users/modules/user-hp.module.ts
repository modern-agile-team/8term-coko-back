import { Module } from '@nestjs/common';
import { UserHpController } from '../controllers/user-hp.controller';
import { UserHpService } from '../services/user-hp.service';

@Module({
  controllers: [UserHpController],
  providers: [UserHpService],
})
export class UserHpModule {}
