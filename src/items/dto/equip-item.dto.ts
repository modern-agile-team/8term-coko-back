import { IsNumber } from 'class-validator';

export class EquipItemDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  itemId: number;
}
