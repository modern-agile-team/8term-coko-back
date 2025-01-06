import { Body, Controller, Post } from '@nestjs/common';
import { LoginAdminDto } from './login-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admin.service';
import { ApiAdmins } from './admin.swagger';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminsService: AdminsService) {}

  // admin 로그인
  @ApiAdmins.LoginAdmin()
  @Post('login')
  async loginAdmin(@Body() loginAdminInfo: LoginAdminDto) {
    return await this.adminsService.loginAdmin(loginAdminInfo);
  }
}
