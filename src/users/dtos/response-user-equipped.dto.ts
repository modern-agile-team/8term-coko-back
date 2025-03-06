import { Item } from 'src/items/entities/item.entity';
import { UserItem } from '../entities/user-item.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserEquippedDto implements Item {
  @ApiProperty({
    example: 1,
    description: '아이템 아이디',
  })
  readonly id: number;

  @ApiProperty({
    example: '바지2',
    description: '아이템 이름',
  })
  readonly name: string;

  @ApiProperty({
    example: 1000,
    description: '아이템 가격',
  })
  readonly price: number;

  @ApiProperty({
    example: 'itme.png',
    description: '아이템 이미지네임',
  })
  readonly image: string;

  @ApiProperty({
    example: 1,
    description: '서브 카테고리 아이디',
  })
  readonly subCategoryId: number;

  @ApiProperty({
    example: false,
    description: '장착 여부',
  })
  readonly isEquipped: boolean;

  constructor(userItem: UserItem) {
    this.id = userItem.item.id;
    this.name = userItem.item.name;
    this.price = userItem.item.price;
    this.image = userItem.item.image;
    this.subCategoryId = userItem.item.subCategoryId;
    this.isEquipped = userItem.isEquipped;
  }

  static fromArray(userItems: UserItem[]): ResponseUserEquippedDto[] {
    return userItems.map((userItem) => new ResponseUserEquippedDto(userItem));
  }
}
