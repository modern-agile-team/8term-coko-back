import { PartialType } from '@nestjs/swagger';
import { CreateUserChallengesDto } from './create-user-challenges.dto';

export class UpdateUserChallengesDto extends PartialType(
  CreateUserChallengesDto,
) {
  readonly completed?: boolean;
  readonly completedDate?: Date;
}
