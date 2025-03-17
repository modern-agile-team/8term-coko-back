import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SocialUserInfoDto {
  @IsString()
  name: string;

  @IsString()
  socialAccessToken: string;

  @IsOptional()
  @IsString()
  socialRefreshToken: string | null;

  @IsString()
  provider: string;

  // kakao 로그인시 providerId 값이 number 타입으로 들어와서 타입 변경
  @IsString()
  @Transform(({ value }) => String(value))
  providerId: string;

  @IsEmail()
  email: string;
}
