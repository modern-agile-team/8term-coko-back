import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiItems = {
  getAllItems: () => {
    return applyDecorators(
      ApiOperation({
        summary: '모든 items 조회',
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
  buyItem: () => {
    return applyDecorators(
      ApiOperation({
        summary: '특정 user의 특정 item 구매하기',
      }),
      ApiResponse({
        status: 204,
        description: '## user가 item을 성공적으로 구매함',
      }),
      ApiResponse({
        status: 400,
        description: '## 잘못된 userId 또는 itemId',
      }),
    );
  },

  equipItem: () => {
    return applyDecorators(
      ApiOperation({
        summary: '특정 user가 특정 item 장착',
      }),
      ApiResponse({
        status: 204,
        description: 'item 장착 성공',
      }),
      ApiResponse({
        status: 400,
        description: '잘못된 요청 값 (userId 또는 itemId 오류)',
      }),
    );
  },

  unequipItem: () => {
    return applyDecorators(
      ApiOperation({
        summary: '특정 user가 특정 item 해제',
      }),
      ApiResponse({
        status: 204,
        description: 'item 해제 성공',
      }),
      ApiResponse({
        status: 400,
        description: '잘못된 요청 값(userId 또는 itemId 오류)',
      }),
    );
  },

  deleteUserItem: () => {
    return applyDecorators(
      ApiOperation({
        summary: '특정 user의 특정 item 삭제',
      }),
      ApiResponse({
        status: 204,
        description: 'user의 item 삭제 성공',
      }),
      ApiResponse({
        status: 400,
        description: 'user 또는 item이 존재하지 않음',
      }),
    );
  },
};
