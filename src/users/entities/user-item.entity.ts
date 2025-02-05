export interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  mainCategoryId: number;
  subCategoryId?: number;
  mainCategory: {
    id: number;
    name: string;
  };
  subCategory?: {
    id: number;
    name: string;
  };
}

export interface UserItem {
  id: number;
  userId: number;
  itemId: number;
  isEquipped: boolean;
  purchasedAt: Date;
  item?: Item;
}
