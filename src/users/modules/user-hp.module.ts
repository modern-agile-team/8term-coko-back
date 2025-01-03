import { Module } from '@nestjs/common';
import { UserHpController } from '../controllers/user-hp.controller';
import { UserHpService } from '../services/user-hp.service';
import { UserHpRepository } from '../repositories/user-hp.repository';

@Module({
  controllers: [UserHpController],
  providers: [UserHpService, UserHpRepository],
})
export class UserHpModule {}
