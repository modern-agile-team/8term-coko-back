import { ApiProperty } from '@nestjs/swagger';

export class ResProgressDto {
  @ApiProperty({ example: 20, description: '전체 문제 수' })
  readonly totalQuizCount: number;

  @ApiProperty({ example: 10, description: '맞힌 문제 수 + 틀린 문제 수' })
  readonly totalUserProgressCount: number;

  @ApiProperty({ example: 6, description: '유저가 맞힌 문제 수' })
  readonly correctUserProgressCount: number;

  @ApiProperty({ example: 4, description: '유저가 틀린 문제 수' })
  readonly inCorrectUserProgressCount: number;

  constructor(progress: ResProgressDto) {
    this.totalQuizCount = progress.totalQuizCount;
    this.totalUserProgressCount = progress.totalUserProgressCount;
    this.correctUserProgressCount = progress.correctUserProgressCount;
    this.inCorrectUserProgressCount = progress.inCorrectUserProgressCount;
  }
}
