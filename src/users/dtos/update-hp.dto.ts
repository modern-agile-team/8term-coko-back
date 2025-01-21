import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateHpDto {
  @ApiProperty({
    description: `
      유저의 현재 생명력 수치,
      1. 문제를 틀리면 -1씩 줄어들 수치,
      2. 유저는 최소 0, 최대 hpStorage값 까지만 hp값을 가질 수 있음
    `,
    example: 4,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly hp?: number;

  @ApiProperty({
    description:
      '유저의 최대 생명력 수치, 디폴트 5이기 때문에 최소 5값을 가져야함',
    example: 5,
    minimum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(5)
  readonly hpStorage?: number;
}
