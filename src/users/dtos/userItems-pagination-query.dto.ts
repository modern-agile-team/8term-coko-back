import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserItemsQueryDto } from './userItems-query.dto';

export class UserItemsPaginationQueryDto extends UserItemsQueryDto {
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: '페이지 번호',
    example: 1,
    default: 1,
  })
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: '페이지당 아이템 수',
    example: 8,
    default: 8,
  })
  @Type(() => Number)
  limit: number = 8;
}
