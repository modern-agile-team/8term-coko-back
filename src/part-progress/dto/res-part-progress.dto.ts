import { ApiProperty } from '@nestjs/swagger';
import { PartProgress, PartStatus } from '../entities/part-progress.entity';

export class ResPartProgressDto {
  @ApiProperty({ example: 1, description: '유저 아이디' })
  readonly userId: number;

  @ApiProperty({ example: 3, description: '파트 아이디' })
  readonly partId: number;

  @ApiProperty({ example: 'LOCKED', description: '파트 상태' })
  readonly status: PartStatus;

  constructor({ userId, partId, status }: PartProgress) {
    this.userId = userId;
    this.partId = partId;
    this.status = status;
  }

  static fromArray(partProgress: PartProgress[]): ResPartProgressDto[] {
    return partProgress.map(
      (partProgress) => new ResPartProgressDto(partProgress),
    );
  }
}
