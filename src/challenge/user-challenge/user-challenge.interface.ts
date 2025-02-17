import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { Challenge } from '../challenge.interface';

export interface UserChallenge {
  id: number;
  userId: number;
  challengeId: number;
  completed: boolean;
  completedDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserChallengeAndInfo extends UserChallenge {
  challenge: Challenge;
}

export interface PaginationUserChallenge
  extends Omit<
    OffsetPaginationBaseResponseDto<UserChallengeAndInfo>,
    'totalPage'
  > {}
