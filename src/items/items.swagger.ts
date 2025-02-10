import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export const ApiItems = {
  getAllItems: () => {
    return applyDecorators(
      ApiOperation({
        summary: '모든 items 조회',
        description: '존재하는 모든 아이템을 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        description: '모든 items 성공적으로 조회됨',
        content: {
          JSON: {
            example: {
              id: 2,
              name: 'blue-hat',
              cost: 2000,
              image: '2',
              createdAt: '2024-11-05T10:30:15.000Z',
              updatedAt: '2024-11-05T10:40:15.000Z',
            },
          },
        },
      }),
    );
  },

  deleteUserItem: () => {
    return applyDecorators(
      ApiOperation({
        summary: '특정 user의 특정 item 삭제',
        description: '특정 user의 특정 item을 삭제한다',
      }),
      ApiResponse({
        status: 204,
        description: 'user의 item 삭제 성공',
      }),
      ApiResponse({
        status: 400,
        description: '유효하지 않은 요청 값 (userId 또는 itemId 오류)',
        content: {
          JSON: {
            example: {
              statusCode: 400,
              message: 'Invalid userId or itemId provided',
              error: 'Bad request',
            },
          },
        },
      }),
    );
  },

  getUserItems: () => {
    return applyDecorators(
      ApiOperation({
        summary: '특정 user의 items 조회',
        description: '특정 user가 소유한 모든 items를 조회한다',
      }),
      ApiResponse({
        status: 200,
        description: 'user의 모든 items가 성공적으로 조회됨',
        content: {
          JSON: {
            example: [
              {
                id: 2,
                itemId: 3,
                userId: 1,
                isEquipped: false,
                createdAt: '2024-11-05T10:30:15.000Z',
                updatedAt: '2024-11-05T10:40:15.000Z',
              },
              {
                id: 3,
                itemId: 5,
                userId: 1,
                isEquipped: true,
                createdAt: '2024-11-05T10:40:15.000Z',
                updatedAt: '2024-11-05T10:40:15.000Z',
              },
            ],
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: '해당 user를 찾을 수 없음',
        content: {
          JSON: {
            example: {
              statusCode: 404,
              message: 'User not found',
              error: 'Not Found',
            },
          },
        },
      }),
    );
  },
};
