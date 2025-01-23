import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResDailyQuestDto } from './dto/res-daily-quest.dto';

export const ApiDailyQuest = {
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '모두 조회',
      }),
      ApiResponse({
        status: 200,
        description: '일일퀘스트 전체를 모두 조회',
        type: ResDailyQuestDto,
        isArray: true,
      }),
    );
  },
  findOne: () => {
    return applyDecorators(
      ApiOperation({
        summary: 'id로 하나 조회',
      }),
      ApiResponse({
        status: 200,
        description: '일일퀘스트 하나를 id값으로 조회',
        type: ResDailyQuestDto,
      }),
      ApiResponse({
        status: 404,
        description: '일일퀘스트 id를 찾을 수 없음',
        content: {
          JSON: {
            example: {
              message: '일일퀘스트 12를 찾을 수 없습니다.',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      }),
    );
  },
  create: () => {
    return applyDecorators(
      ApiOperation({
        summary: '생성',
      }),
      ApiResponse({
        status: 204,
        description: '새 일일퀘스트가 성공적으로 생성',
      }),
    );
  },
  update: () => {
    return applyDecorators(
      ApiOperation({
        summary: '수정',
      }),
      ApiResponse({
        status: 204,
        description: '일일퀘스트가 성공적으로 수정',
      }),
      ApiResponse({
        status: 404,
        description: '일일퀘스트 id를 찾을 수 없음',
        content: {
          JSON: {
            example: {
              message: '일일퀘스트 12를 찾을 수 없습니다.',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      }),
    );
  },
  remove: () => {
    return applyDecorators(
      ApiOperation({
        summary: '삭제',
      }),
      ApiResponse({
        status: 204,
        description: '일일퀘스트가 성공적으로 삭제',
      }),
      ApiResponse({
        status: 404,
        description: '일일퀘스트 id를 찾을 수 없음',
        content: {
          JSON: {
            example: {
              message: '일일퀘스트 12를 찾을 수 없습니다.',
              error: 'Not Found',
              statusCode: 404,
            },
          },
        },
      }),
    );
  },
};
