import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateUsersDailyQuestDto {
  @ApiPropertyOptional({
    description: '현재 퀘스트완료 진행도, 예를들어 0/5 일때 0부분임',
    example: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly conditionProgress?: number;

  @ApiPropertyOptional({
    description: '유저 일일 퀘스트 완료여부, 완료면 true',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly completed?: boolean;
}
