import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePointDto {
  @IsOptional()
  @IsString()
  readonly nickname?: string;

  @IsNumber()
  readonly point: number;
}
