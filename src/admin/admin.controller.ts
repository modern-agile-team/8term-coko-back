import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LoginAdminDto } from './login-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admin.service';
import { ApiAdmins } from './admin.swagger';
import { CookieService } from 'src/auth/services/cookie.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly cookieService: CookieService,
  ) {}

  // admin 로그인
  @ApiAdmins.LoginAdmin()
  @Post('login')
  async loginAdmin(
    @Body() loginAdminInfo: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.adminsService.loginAdmin(loginAdminInfo);
    await this.cookieService.setAdminAccessTokenCookie(res, accessToken);
  }
}
