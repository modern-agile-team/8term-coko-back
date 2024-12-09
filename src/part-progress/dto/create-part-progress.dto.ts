import { PartStatus } from '../entities/part-progress.entity';

export class CreatePartProgressDto {
  readonly status: PartStatus;
}
