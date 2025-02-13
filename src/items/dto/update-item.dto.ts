import { PartialType } from '@nestjs/mapped-types'; //모든 속성을 선택적으로 만든다. = partial type
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends CreateItemDto {}
