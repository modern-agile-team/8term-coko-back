import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { Challenge } from '../challenges.interface';

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
