import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminsService } from './admin.service';
import { AdminsRepository } from './admin.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AdminsService, AdminsRepository],
  controllers: [AdminController],
})
export class AdminModule {}
