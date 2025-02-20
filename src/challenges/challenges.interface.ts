import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';
import { ChallengeType } from './const/challenges.constant';

export interface Challenge {
  id: number;
  content: string;
  point: number;
  experience: number;
  challengeType: ChallengeType;
  condition: number;
  badgeName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationChallenges
  extends Omit<OffsetPaginationBaseResponseDto<Challenge>, 'totalPage'> {}
