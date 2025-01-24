import { IsArray, IsInt, ArrayMinSize, ArrayMaxSize } from 'class-validator';
export class BuyUserItemsDto {
  @IsInt()
  userId: number;

  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  itemIds: number[];
}
