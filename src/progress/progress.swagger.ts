import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateProgressDto } from './dto/create-progress.dto';
import { ResProgressDto } from './dto/res-progress.dto';

export const ApiProgress = {
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '유저의 전체 문제 풀이 현황 조회',
      }),
      ApiResponse({
        status: 200,
        description: `
        전체 문제 수,
        유저가 한번이라도 푼 문제 수,
        유저가 맞힌 문제 수,
        유저가 틀린 문제 수
        `,
        type: ResProgressDto,
        content: {
          JSON: {
            example: {
              totalQuizCount: 2,
              totalUserProgressCount: 1,
              correctUserProgressCount: 0,
              inCorrectUserProgressCount: 1,
            },
          },
        },
      }),
    );
  },
  createOrUpdate: () => {
    return applyDecorators(
      ApiOperation({
        summary: '유저의 문제에 대한 진행도생성 또는 업데이트',
      }),
      ApiBody({
        description: '섹션 생성에 필요한 정보',
        type: CreateProgressDto,
      }),
      ApiResponse({
        status: 204,
        description: 'progress가 성공적으로 생성되었거나 업데이트 됨',
      }),
    );
  },
};
