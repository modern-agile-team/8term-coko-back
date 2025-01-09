import { IsArray, IsInt } from 'class-validator';
export class BuyItemDto {
  @IsInt()
  userId: number;

  @IsArray()
  @IsInt({ each: true })
  itemIds: number[];
}
