import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '유저 닉네임',
    example: 'gwgw99',
    minimum: 2,
    maximum: 10,
  })
  @IsString()
  @Length(2, 10)
  readonly nickname: string;

  @ApiProperty({
    type: String,
    description: '유저 프로필 이미지지',
    example: 'image.jpg',
  })
  @IsOptional()
  @IsString()
  readonly profileImage?: string;
}
