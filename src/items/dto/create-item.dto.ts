import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: '아이템 이름',
    example: 'blue-hat',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '아이템 이미지 URL',
    example: 'blue-hat.png',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: '아이템 가격',
    example: 2000,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: '메인 카테고리 ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  mainCategoryId: number;

  @ApiProperty({
    description: '서브 카테고리 ID',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  subCategoryId?: number;
}
