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
}
