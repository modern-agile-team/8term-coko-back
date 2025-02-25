import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOpinionDto {
  @ApiProperty({
    description: '최소 0글자 이상',
    example: '코코 아이템 문의',
    minLength: 0,
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: '최소 0글자 이상',
    example: '코코가 신을 신발을 만들어주세요',
    minLength: 0,
  })
  @IsString()
  @MaxLength(255)
  readonly content: string;
}
