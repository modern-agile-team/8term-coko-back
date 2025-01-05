import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';

@Module({
  imports: [],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
