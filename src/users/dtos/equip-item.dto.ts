import { IsBoolean, IsInt, IsArray } from 'class-validator';
export class EquipItemDto {
  @IsInt()
  userId: number;

  @IsArray() //배열
  @IsInt({ each: true }) // 각 아이템 int인지 확인
  itemIds: number[];

  @IsBoolean()
  isEquipped: boolean;
}
