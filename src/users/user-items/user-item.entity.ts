import { Item } from 'src/items/entities/item.entity';

export class UserItem {
  id: number;
  userId: number;
  itemId: number;
  isEquipped: boolean;
  purchasedAt: Date;
  item?: Item;
}
