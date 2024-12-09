import { PartialType } from '@nestjs/swagger';
import { CreatePartProgressDto } from './create-part-progress.dto';

export class UpdatePartProgressDto extends PartialType(CreatePartProgressDto) {}
