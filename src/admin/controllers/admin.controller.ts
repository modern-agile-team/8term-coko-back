import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { LoginAdminDto } from '../dtos/login-admin.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // admin 로그인
  @ApiTags('admins')
  @Post('login')
  async loginAdmin(@Body() loginAdminInfo: LoginAdminDto) {
    return await this.adminService.loginAdmin(loginAdminInfo);
  }
}
