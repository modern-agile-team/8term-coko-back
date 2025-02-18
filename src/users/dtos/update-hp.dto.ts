import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateHpDto {
  @ApiProperty({
    description: `
      유저의 현재 생명력 수치,
      1. 문제를 틀리면 -1씩 줄어들 수치,
      2. 유저는 최소 0, 최대 hpStorage값 까지만 hp값을 가질 수 있음
    `,
    example: 8,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly hp?: number;

  @ApiProperty({
    description:
      '유저의 최대 생명력 수치, 디폴트 10이기 때문에 최소 10값을 가져야함 (25.02.18)',
    example: 5,
    minimum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(10)
  readonly hpStorage?: number;
}
