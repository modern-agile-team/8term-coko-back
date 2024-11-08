import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  readonly providerId: number;

  @ApiProperty({
    type: String,
    description: '유저 닉네임',
    example: 'gwgw99',
    minimum: 2,
    maximum: 10,
  })
  @IsOptional()
  @IsString()
  @Length(2, 10)
  readonly name?: string;

  @ApiProperty({
    type: String,
    description: '유저 프로필 이미지지',
    example: 'image.jpg',
  })
  @IsOptional()
  @IsString()
  readonly profileImage?: string;
}
