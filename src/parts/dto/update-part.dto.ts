import { PartialType } from '@nestjs/swagger';
import { CreatePartDto } from './create-part.dto';

export class UpdatePartDto extends PartialType(CreatePartDto) {}
