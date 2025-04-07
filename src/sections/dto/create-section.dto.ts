import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({
    description: '섹션 이름',
    example: '변수',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
