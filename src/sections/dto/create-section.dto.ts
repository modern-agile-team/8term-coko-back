import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({
    description: '섹션 이름',
    example: 'function',
  })
  @IsString()
  readonly name: string;
}
