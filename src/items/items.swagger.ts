import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export const ApiItems = {
  getAllItems: () => {
    return applyDecorators(
      ApiOperation({
        summary: '모든 items 조회',
        description: '존재하는 모든 items 조회합니다.',
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
        description: '특정 user가 특정 item을 구매합니다.',
      }),
      ApiBody({
        description: 'userId와 itemId를 포함한 요청 바디',
        schema: {
          example: {
            userId: 1,
            itemId: 2,
          },
        },
      }),
      ApiResponse({
        status: 204,
        description: 'user가 item을 성공적으로 구매함',
      }),
      ApiResponse({
        status: 400,
        description: '잘못된 userId 또는 itemId, 혹은 다른 유효성 오류',
      }),
    );
  },

  equipItem: () => {
    return applyDecorators(
      ApiOperation({
        summary: '특정 user가 특정 item 장착',
        description: '특정 user가 소유한 item을 장착',
      }),
      ApiBody({
        description: 'userId와 itemId를 포함한 요청 바디',
        schema: {
          example: {
            userId: 1,
            itemId: 2,
          },
        },
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
        description: '특정 user가 장착한 item을 해제한다',
      }),
      ApiBody({
        description: 'userId와 itemId를 포함한 요청 바디',
        schema: {
          example: {
            userId: 1,
            itemId: 2,
          },
        },
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
        description: '특정 user의 특정 item을 삭제한다',
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
        description: '해당 user가 존재하지 않음',
      }),
    );
  },
};
