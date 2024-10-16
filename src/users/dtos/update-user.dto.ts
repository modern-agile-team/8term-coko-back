import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  readonly experience?: number;

  @IsOptional()
  @IsNumber()
  readonly point?: number;
}
