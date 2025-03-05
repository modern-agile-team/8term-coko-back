import { ApiProperty } from '@nestjs/swagger';
import { UserItem } from '../entities/user-item.entity';

export class ResponseUserItemDto {
  id: number;
  userId: number;
  item: {
    id: number;
    name: string;
    mainCategoryId: number;
    subCategoryId: number;
  };

  constructor(userItem: UserItem) {
    this.id = userItem.id;
    this.userId = userItem.userId;
    this.item = {
      id: userItem.item.id,
      name: userItem.item.name,
      mainCategoryId: userItem.item.mainCategoryId,
      subCategoryId: userItem.item.subCategoryId,
    };
  }
}
