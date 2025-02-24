import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { UserItem } from '../entities/user-item.entity';
export class UserItemsPaginationResponseDto extends OffsetPaginationBaseResponseDto<UserItem> {
  readonly contents: UserItem[];
  constructor(props: Omit<UserItemsPaginationResponseDto, 'totalPage'>) {
    super(props);
    this.contents = props.contents;
  }
}
