import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { QueryChallengesDto } from 'src/challenges/dto/query-challenges.dto';

export class QueryUserChallengesDto extends QueryChallengesDto {
  @ApiPropertyOptional({
    description: '도전과제 완료된것만 받기, 완료 안된것만 받기',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === true;
  })
  readonly completed?: boolean;
}
