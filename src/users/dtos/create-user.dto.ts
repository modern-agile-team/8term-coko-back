import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '유저 닉네임',
    example: 'gwgw99',
    default: 'nickname',
    minimum: 2,
    maximum: 10,
  })
  @IsString()
  readonly nickname: string;

  @ApiProperty({
    type: String,
    description: '유저 프로필 이미지지',
    example: 'imageurl.jpg',
    default: 'imageurl',
  })
  @IsOptional()
  @IsString()
  readonly profileImage?: string;
}
