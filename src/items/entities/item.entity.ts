import { UserItem } from 'src/users/user-items/user-item.entity';

export class Item {
  id: number;
  name: string;
  price: number;
  image: string;
  mainCategoryId?: number;
  subCategoryId?: number;
  userItems?: UserItem[];
}
