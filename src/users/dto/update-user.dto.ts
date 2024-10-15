import { IsNumber, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  @IsNumber()
  readonly experience?: number;

  @IsOptional()
  @IsNumber()
  readonly point?: number;
}
