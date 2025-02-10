import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
};
