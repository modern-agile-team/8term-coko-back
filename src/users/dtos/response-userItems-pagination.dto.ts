import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { UserItem } from '../entities/user-item.entity';
import { Item } from 'src/items/entities/item.entity';

export class UserItemsPaginationResponseDto extends OffsetPaginationBaseResponseDto<
  UserItem & { item: Item }
> {
  readonly contents: (UserItem & { item: Item })[];
  constructor(props: Omit<UserItemsPaginationResponseDto, 'totalPage'>) {
    super(props);
    this.contents = props.contents;
  }
}
