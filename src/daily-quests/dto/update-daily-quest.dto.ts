import { PartialType } from '@nestjs/swagger';
import { CreateDailyQuestDto } from './create-daily-quest.dto';

export class UpdateDailyQuestDto extends PartialType(CreateDailyQuestDto) {}
