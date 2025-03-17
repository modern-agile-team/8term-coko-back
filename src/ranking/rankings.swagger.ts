import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RankingPaginationResponseDto } from './dtos/ranking-pagination-res.dto';
import { ResMyRankingDto } from './dtos/res-my-ranking.dto';
import { ResSeasonEndTimeDto } from './dtos/res-season-end-time.dto';

export const ApiRankings = {
  findSelectedPageRankings: () => {
    return applyDecorators(
      ApiCookieAuth('accessToken'),
      ApiOperation({
        summary: '랭킹 페이지 정보 가져오기',
      }),
      ApiResponse({
        status: 200,
        description: `랭킹 정보를 성공적으로 가져옴`,
        type: RankingPaginationResponseDto,
      }),
    );
  },
  findMyRanking: () => {
    return applyDecorators(
      ApiCookieAuth('accessToken'),
      ApiOperation({
        summary: '나의 랭킹 정보 가져오기',
      }),
      ApiResponse({
        status: 200,
        description: `나의 랭킹 정보를 성공적으로 가져옴`,
        type: ResMyRankingDto,
      }),
    );
  },
  getNextSeasonEndTime: () => {
    return applyDecorators(
      ApiCookieAuth('accessToken'),
      ApiOperation({
        summary: '주간 시즌 종료 시점 가져오기',
      }),
      ApiResponse({
        status: 200,
        description: `주간 시즌 종료 시점을 성공적으로 가져옴`,
        type: ResSeasonEndTimeDto,
      }),
    );
  },
};
