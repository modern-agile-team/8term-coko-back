import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreatePartDto {
  @ApiProperty({
    required: true,
    description: '섹션 id',
    example: 1,
  })
  @IsInt()
  @Min(0)
  readonly sectionId: number;

  @IsString()
  readonly name: string;
}
