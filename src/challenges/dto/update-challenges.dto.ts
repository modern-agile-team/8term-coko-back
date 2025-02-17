import { PartialType } from '@nestjs/swagger';
import { CreateChallengesDto } from './create-challenges.dto';

export class UpdateChallengesDto extends PartialType(CreateChallengesDto) {}
