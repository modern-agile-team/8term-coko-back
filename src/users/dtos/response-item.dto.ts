export class ResponseItemDto {
  readonly id: number; //UserItem id
  readonly name: string;
  readonly price: number;
  readonly image: string;
  readonly mainCategoryId: number;
  readonly subCategoryId: number | null;
  readonly isEquipped: boolean;
  readonly purchasedAt: Date;

  constructor(item: any, userItem?: any) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.image = item.image;
    this.mainCategoryId = item.mainCategoryId;
    this.subCategoryId = item.subCategoryId;
    this.isEquipped = userItem?.isEquipped ?? false;
    this.purchasedAt = userItem?.purchasedAt ?? new Date();
  }
}
