import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: '유저 email',
    example: 'gwgw123@gmail.com',
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: '유저 프로필 이미지지',
    example:
      'https://lh3.googleusercontent.com/a/ACg8ocK6wP1234RJfzG7BqWeqwerMuxJuIbBhmoYA7gus-EsM=s96-c',
  })
  @IsOptional()
  @IsString()
  readonly picture?: string;

  @ApiProperty({
    type: String,
    description: '유저 닉네임',
    example: 'gwgw99',
    minimum: 2,
    maximum: 10,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: '소셜 액세스 토큰',
    example:
      'ya29.a0AeDClZDZpzSfkfMpmn2qwerJsfaM5JZ0IbvupkAnLDHnwEFL3KtN8Iw7uMrzBdhCkSMDv0DNq9WSmWBBKbE0jzq-9r5g8TJYBhnlELNzzNl7R0A7uADJ5ECZ6WIrUZ3QHWxW7_qqA-OBh6OvHqwerU1gIskGHHvSSpBmaCgYKAaASARESFQ',
  })
  @IsString()
  socialAccessToken: string;

  @ApiProperty({
    type: String,
    description: '소셜 리프레시 토큰',
    example:
      'ya29.a0AeDClZDZpzSfkfMpmn2qwernJsfaM5JZ0IbvupkAnLDHnwEFL3KtN8Iw7uMrzBdhCkSMDv0DNq9WSmWBBKbE0jzq-9r5g8TJYBhnlELNzzNl7R0A7uADJ5ECZ6WIrUZ3QHWxW7_qqA-OBh6OvHsTqwer1gIskGHHvSSpBmaCgYKAaASARESFQ',
  })
  @IsString()
  @IsOptional()
  socialRefeshToken?: string;

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
