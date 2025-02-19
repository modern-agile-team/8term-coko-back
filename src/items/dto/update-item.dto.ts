import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty({
    description: '아이템 이름',
    example: 'blue-hat',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: '아이템 이미지 URL',
    example: 'blue-hat.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: '아이템 가격',
    example: 2000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  price?: number;

  @ApiProperty({
    description: '메인 카테고리 ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  mainCategoryId?: number;

  @ApiProperty({
    description: '서브 카테고리 ID',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  subCategoryId?: number;
}
