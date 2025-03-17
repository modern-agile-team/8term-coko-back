import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { Challenge } from '../challenges.interface';
import { ValueOf } from 'src/common/util/type-utils';
import { ChallengeTypeValues } from '../const/challenges.constant';

export interface UserChallenge {
  id: number;
  userId: number;
  challengeId: number;
  completed: boolean;
  completedDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserChallengesAndInfo extends UserChallenge {
  challenge: Challenge;
}

export interface PaginationUserChallenges
  extends Omit<
    OffsetPaginationBaseResponseDto<UserChallengesAndInfo>,
    'totalPage'
  > {}

export type ChallengeType = ValueOf<typeof ChallengeTypeValues>;
