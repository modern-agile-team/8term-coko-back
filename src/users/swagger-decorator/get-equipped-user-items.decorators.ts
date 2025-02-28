import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseUserItemDto } from '../dtos/response-useritem.dto';

export function ApiGetEquippedUserItems() {
  return applyDecorators(
    ApiCookieAuth('access-token'),
    ApiOperation({
      summary: '사용자가 장착한 아이템 목록 조회',
      description:
        '현재 로그인한 사용자가 장착한 모든 아이템 정보를 조회합니다.',
    }),
    ApiQuery({
      name: 'mainCategoryId',
      required: false,
      type: Number,
      description: 'Main Category Id for filtering equipped items',
    }),
    ApiQuery({
      name: 'subCategoryId',
      required: false,
      type: Number,
      description: 'Sub Category ID for filtering equipped items',
    }),
    ApiResponse({
      status: 200,
      description: '사용자 장착한 아이템 목록 조회 성공',
      content: {
        'application/json': {
          example: [
            {
              id: 31,
              userId: 5,
              itemId: 39,
              purchasedAt: '2025-02-26T07:40:01.011Z',
              isEquipped: true,
              item: {
                id: 39,
                name: '파랑 물약',
                price: 0,
                image: '',
                mainCategoryId: 4,
                subCategoryId: 8,
              },
            },
            {
              id: 21,
              userId: 5,
              itemId: 2,
              purchasedAt: '2025-02-05T01:38:10.715Z',
              isEquipped: true,
              item: {
                id: 2,
                name: 'converse shoes',
                price: 10000,
                image: '2',
                mainCategoryId: 1,
                subCategoryId: 2,
              },
            },
            {
              id: 22,
              userId: 5,
              itemId: 3,
              purchasedAt: '2025-02-05T01:38:10.715Z',
              isEquipped: true,
              item: {
                id: 3,
                name: 'winter setup2',
                price: 12000,
                image: 'winterclothes.svg',
                mainCategoryId: 1,
                subCategoryId: 1,
              },
            },
          ],
        },
      },
    }),

    ApiResponse({
      status: 401,
      description: '인증되지 않은 사용자',
    }),
    ApiResponse({
      status: 404,
      description: '사용자의 장착한 아이템을 찾을 수 없음',
    }),
  );
}
