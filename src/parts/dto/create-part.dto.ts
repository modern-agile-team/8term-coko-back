import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreatePartDto {
  @ApiProperty({
    description: '상위 섹션 id',
    example: 1,
  })
  @IsInt()
  @Min(0)
  readonly sectionId: number;

  @ApiProperty({
    description: '파트 이름',
    example: 1,
  })
  @IsString()
  readonly name: string;
}
