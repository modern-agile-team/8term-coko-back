import { ApiProperty } from '@nestjs/swagger';
import { PartStatus } from '../entities/part-progress.entity';

export class CreatePartProgressDto {
  @ApiProperty({
    description: `
        part의 status 값 넣기
        1. LOCKED
        2. STARTED
        3. IN_PROGRESS
        4. COMPLETED
        `,
    example: 'LOCKED',
  })
  readonly status: PartStatus;
}
