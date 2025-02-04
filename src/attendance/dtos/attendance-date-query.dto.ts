import { IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AttendanceDateDto {
  @ApiPropertyOptional({
    description: '몇 년도인지 선택',
    example: '2025',
  })
  @IsString()
  readonly year: string;

  @ApiPropertyOptional({
    description: '몇 월인지 선택',
    example: '2',
  })
  @IsString()
  readonly month: string;
}
