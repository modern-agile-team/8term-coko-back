import { ApiProperty } from '@nestjs/swagger';
import { PartStatus } from '../entities/part-progress.entity';
import { IsEnum } from 'class-validator';

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
    enum: PartStatus,
  })
  @IsEnum(PartStatus, { message: 'bad status value' })
  readonly status: PartStatus;
}
