import { IsOptional, IsString } from 'class-validator';

export class GoogleUserDto {
  @IsString()
  name: string;

  @IsString()
  socialAccessToken: string;

  @IsOptional()
  @IsString()
  socialRefreshToken: string | null;

  @IsString()
  provider: string;

  @IsString()
  providerId: string;
}
