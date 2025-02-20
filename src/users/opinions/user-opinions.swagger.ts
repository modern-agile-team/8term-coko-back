import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResOpinionsDto } from './dtos/res-opinions.dto';
import { ResMyOpinionsDto } from './dtos/res-my-opinions.dto';

export const ApiOpinions = {
  findAllOpinions: () => {
    return applyDecorators(
      ApiOperation({
        summary: '모든 문의 가져오기',
      }),
      ApiResponse({
        status: 200,
        description: `모든 문의를 성공적으로 가져옴`,
        type: ResOpinionsDto,
      }),
    );
  },
  findMyOpinions: () => {
    return applyDecorators(
      ApiOperation({
        summary: '나의 문의 가져오기',
      }),
      ApiResponse({
        status: 200,
        description: `나의 문의를 성공적으로 가져옴`,
        type: ResMyOpinionsDto,
      }),
    );
  },
  createOpinion: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문의 생성하기',
      }),
      ApiResponse({
        status: 204,
        description: `문의를 성공적으로 생성함`,
      }),
    );
  },
  deleteOpinion: () => {
    return applyDecorators(
      ApiOperation({
        summary: '문의 삭제하기',
      }),
      ApiResponse({
        status: 204,
        description: `문의를 성공적으로 삭제함`,
      }),
    );
  },
};
