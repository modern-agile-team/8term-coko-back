export class ResponseItemDto {
  readonly id: number; //UserItem id
  readonly userId: number;
  readonly itemId: number;
  readonly purchasedAt: Date;
  readonly isEquipped: boolean;

  readonly item: {
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly image: string;
    readonly mainCategoryId: number;
    readonly subCategoryId?: number; //Optional
  };

  constructor(userItem: any) {
    this.id = userItem.id;
    this.userId = userItem.userId;
    this.itemId = userItem.itemId;
    this.purchasedAt = userItem.purchasedAt;
    this.isEquipped = userItem.isEquipped;
    this.item = {
      id: userItem.item.id,
      name: userItem.item.name,
      price: userItem.item.price,
      image: userItem.item.image,
      mainCategoryId: userItem.item.mainCategoryId,
      subCategoryId: userItem.item.subCategoryId,
    };
  }
}
