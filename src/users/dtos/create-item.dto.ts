import { IsArray, IsInt } from 'class-validator';
export class CreateItemDto {
  @IsInt()
  userId: number;

  @IsArray()
  @IsInt({ each: true })
  itemIds: number[];
}
