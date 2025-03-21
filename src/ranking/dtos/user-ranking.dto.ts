import { ApiProperty } from '@nestjs/swagger';

export class UserRankingDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 22,
  })
  id: number;

  @ApiProperty({
    description: '사용자 이름',
    example: '이건우',
  })
  name: string;

  @ApiProperty({
    description: '사용자의 point',
    example: 30,
  })
  point: number;

  @ApiProperty({
    description: '사용자의 level',
    example: 10,
  })
  level: number;

  @ApiProperty({
    description: '사용자의 총 출석일',
    example: 17,
  })
  totalAttendance: number;

  @ApiProperty({
    description: '사용자의 총 정답수',
    example: 28,
  })
  totalCorrectAnswer: number;
}
