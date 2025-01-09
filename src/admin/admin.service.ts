import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './login-admin.dto';
import { AdminsRepository } from './admin.repository';
import { TokenService } from 'src/auth/services/token.service';

@Injectable()
export class AdminsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adminsRepository: AdminsRepository,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * admin 로그인 메서드
   * @param loginAdminInfo
   * email과 password
   * @returns
   */
  async loginAdmin(loginAdminInfo: LoginAdminDto) {
    const { email, password } = loginAdminInfo;

    const userInfo = await this.adminsRepository.findOne(email);
    if (!userInfo) {
      throw new NotFoundException('Please check your email.');
    }

    // 비밀번호 복호화
    const isMatch = await this.comparePasswords(password, userInfo.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password does not match.');
    }

    const accessToken = await this.tokenService.createAdminAccessToken('admin');

    return accessToken;
  }

  /**
   * password 복호화 함수
   * @param plainPassword 사용자가 입력한 password 값
   * @param hashedPassword DB에 있는 password 값
   * @returns
   */
  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
