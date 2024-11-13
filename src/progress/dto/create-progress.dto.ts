import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProgressDto {
  @ApiProperty({
    description: '유저가 정답을 맞췄는지 여부 , 맞췄을 시 true',
    example: false,
  })
  @IsBoolean()
  readonly isCorrect: boolean;
}
