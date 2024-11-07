import { IsInt, Min } from 'class-validator';

export class ItemChangeStatusDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(1)
  itemId: number;
}

export class EquipItemDto extends ItemChangeStatusDto {}
export class UnequipItemDto extends ItemChangeStatusDto {}
export class BuyItemDto extends ItemChangeStatusDto {}
