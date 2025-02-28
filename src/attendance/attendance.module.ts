import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AttendanceRepository } from './attendance.repository';
import { UsersCoreModule } from 'src/users/modules/users-core.module';

@Module({
  imports: [UsersCoreModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository],
  exports: [AttendanceRepository],
})
export class AttendanceModule {}
