import { IsNumber } from 'class-validator';

export class UnequipItemDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  itemId: number;
}
