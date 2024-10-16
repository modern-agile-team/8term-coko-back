import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly nickname: string;

  @IsOptional()
  @IsString()
  readonly profileImage?: string;
}
