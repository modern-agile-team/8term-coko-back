import { PartProgress, PartStatus } from '../entities/part-progress.entity';

export class ResPartProgressDto {
  readonly userId: number;
  readonly partId: number;
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
