import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminsService } from './admin.service';
import { AdminsRepository } from './admin.repository';

@Module({
  imports: [],
  providers: [AdminsService, AdminsRepository],
  controllers: [AdminController],
})
export class AdminModule {}
