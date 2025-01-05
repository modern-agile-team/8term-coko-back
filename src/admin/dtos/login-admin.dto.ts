import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    description: 'admin 이메일',
    example: 'gwgw123@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'admin 비밀번호',
    example: 'gwpassword123',
  })
  @IsString()
  readonly password: string;
}
