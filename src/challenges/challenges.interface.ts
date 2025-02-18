import { OffsetPaginationBaseResponseDto } from 'src/pagination/dtos/offset-pagination-res.dto';

export interface Challenge {
  id: number;
  content: string;
  point: number;
  experience: number;
  condition: number;
  badgeName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationChallenges
  extends Omit<OffsetPaginationBaseResponseDto<Challenge>, 'totalPage'> {}
