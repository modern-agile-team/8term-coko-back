import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { Item } from '@prisma/client';
export class ItemsPaginationResponseDto extends OffsetPaginationBaseResponseDto<Item> {
  readonly contents: Item[];
  constructor(props: Omit<ItemsPaginationResponseDto, 'totalPage'>) {
    super(props);
    this.contents = props.contents;
  }
}
