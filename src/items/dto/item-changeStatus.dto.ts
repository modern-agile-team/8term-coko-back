import { IsInt } from 'class-validator';

export class ItemChangeStatusDto {
  @IsInt()
  userId: number;

  @IsInt()
  itemId: number;
}

export class EquipItemDto extends ItemChangeStatusDto {}
export class UnequipItemDto extends ItemChangeStatusDto {}
export class BuyItemDto extends ItemChangeStatusDto {}
