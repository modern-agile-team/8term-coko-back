import { IsInt, IsNumber } from 'class-validator';

export class BuyItemDto {
  @IsInt()
  userId: number;

  @IsInt()
  itemId: number;
}
