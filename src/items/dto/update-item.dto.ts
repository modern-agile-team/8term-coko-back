import { PartialType } from '@nestjs/mapped-types'; //CreateItemDto의 모든 필드를 선택적으로 만들기 위함
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}
