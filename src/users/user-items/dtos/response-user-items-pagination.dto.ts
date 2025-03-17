import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { UserItem } from '../user-item.entity';
import { ResponseUserEquippedDto } from './response-user-equipped.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserItemsPaginationResponseDto extends OffsetPaginationBaseResponseDto<ResponseUserEquippedDto> {
  @ApiProperty({
    description: '아이템객체 + 유저아이템 장작여부',
    type: [ResponseUserEquippedDto],
  })
  readonly contents: ResponseUserEquippedDto[];
  constructor(
    props: Omit<OffsetPaginationBaseResponseDto<UserItem>, 'totalPage'>,
  ) {
    const convertedContents = ResponseUserEquippedDto.fromArray(props.contents);
    super({ ...props, contents: convertedContents });
    this.contents = convertedContents;
  }
}
