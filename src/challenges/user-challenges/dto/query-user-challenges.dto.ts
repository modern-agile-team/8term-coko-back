import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { QueryChallengesDto } from 'src/challenges/dto/query-challenges.dto';

export class QueryUserChallengesDto extends QueryChallengesDto {
  @ApiPropertyOptional({
    description: '도전과제 완료부터 받을지 아닐지 정렬, boolean 넣으세용',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === true;
  })
  readonly completed?: boolean;
}
