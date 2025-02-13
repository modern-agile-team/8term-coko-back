import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';

export class ItemsPaginationResponseDto extends OffsetPaginationBaseResponseDto<any> {
  readonly contents: any[];
  constructor(props: Omit<ItemsPaginationResponseDto, 'totalPage'>) {
    super(props);
    this.contents = props.contents;
  }
}
