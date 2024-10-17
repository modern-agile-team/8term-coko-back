import { IsNumber } from 'class-validator';

export class BuyItemDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  itemId: number;
}
