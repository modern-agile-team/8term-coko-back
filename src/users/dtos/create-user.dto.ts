import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: '소셜 이름',
    example: '이건우',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @ApiProperty({
    type: String,
    description: '소셜 액세스 토큰',
    example:
      'ya29.a0AeDClZDZpzSfkfMpmn2qwerJsfaM5JZ0IbvupkAnLDHnwEFL3KtN8Iw7uMrzBdhCkSMDv0DNq9WSmWBBKbE0jzq-9r5g8TJYBhnlELNzzNl7R0A7uADJ5ECZ6WIrUZ3QHWxW7_qqA-OBh6OvHqwerU1gIskGHHvSSpBmaCgYKAaASARESFQ',
  })
  @IsString()
  readonly socialAccessToken: string;

  @ApiProperty({
    type: String,
    description: '소셜 리프레시 토큰',
    example:
      'ya29.a0AeDClZDZpzSfkfMpmn2qwernJsfaM5JZ0IbvupkAnLDHnwEFL3KtN8Iw7uMrzBdhCkSMDv0DNq9WSmWBBKbE0jzq-9r5g8TJYBhnlELNzzNl7R0A7uADJ5ECZ6WIrUZ3QHWxW7_qqA-OBh6OvHsTqwer1gIskGHHvSSpBmaCgYKAaASARESFQ',
  })
  @IsString()
  @IsOptional()
  readonly socialRefeshToken?: string;

  @ApiProperty({
    type: String,
    description: '소셜 서비스 제공자',
    example: 'google',
  })
  @IsString()
  readonly provider: string;

  @ApiProperty({
    type: String,
    description: '소셜 서비스 고유 id',
    example: '559911816891376',
  })
  @IsInt()
  readonly providerId: string;
}
