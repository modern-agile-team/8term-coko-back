import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResPartProgressDto } from './dto/res-part-progress.dto';
import { CreatePartProgressDto } from './dto/create-part-progress.dto';

export const ApiPartProgress = {
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '유저의 전체 문제 풀이 현황 조회',
      }),
      ApiResponse({
        status: 200,
        description: `
        유저와 파트 사이의 진행도를 모두 보여줌
        `,
        type: ResPartProgressDto,
        isArray: true,
      }),
    );
  },
  createOrUpdate: () => {
    return applyDecorators(
      ApiOperation({
        summary: '유저의 파트에 대한 진행도생성 또는 업데이트',
      }),
      ApiBody({
        description: `
        part의 status 값 넣기
        1. LOCKED
        2. STARTED
        3. IN_PROGRESS
        4. COMPLETED
        `,
        type: CreatePartProgressDto,
      }),
      ApiResponse({
        status: 204,
        description:
          '유저의 part-progress가 성공적으로 생성되었거나 업데이트 됨',
      }),
    );
  },
};
