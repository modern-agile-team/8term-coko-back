import { IsInt, IsNumber, Min } from 'class-validator';

export class JwtDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsNumber()
  exp: number;
}
