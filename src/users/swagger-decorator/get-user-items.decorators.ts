import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseUserItemDto } from '../dtos/response-useritem.dto';

export function ApiGetUserItems() {
  return applyDecorators(
    ApiCookieAuth('access-token'),
    ApiOperation({
      summary: '사용자 아이템 목록 조회',
      description:
        '현재 로그인한 사용자가 보유한 모든 아이템 정보를 조회합니다.',
    }),
    ApiQuery({
      name: 'mainCategoryId',
      required: false,
      type: Number,
      description: 'Main Category ID for filtering',
    }),
    ApiQuery({
      name: 'subCategoryId',
      required: false,
      type: Number,
      description: 'Sub Category ID for filtering',
    }),
    ApiQuery({
      name: 'page',
      required: true,
      type: Number,
      description: 'Page Number for pagination',
    }),
    ApiQuery({
      name: 'limit',
      required: true,
      type: Number,
      description: 'Number of items per page',
    }),
    ApiResponse({
      status: 200,
      description: '사용자 아이템 목록 조회 성공',
      content: {
        'application/json': {
          example: [
            {
              totalCount: 3,
              totalPage: 1,
              currentPage: 1,
              contents: [
                {
                  id: 20,
                  userId: 5,
                  itemId: 1,
                  purchasedAt: '2025-02-05T01:38:10.715Z',
                  isEquipped: true,
                  item: {
                    id: 1,
                    name: 'item1',
                    price: 6000,
                    image: '1',
                    mainCategoryId: 1,
                    subCategoryId: 1,
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
                    name: 'item2',
                    price: 12000,
                    image: 'winterclothes.svg',
                    mainCategoryId: 1,
                    subCategoryId: 1,
                  },
                },
                {
                  id: 23,
                  userId: 5,
                  itemId: 4,
                  purchasedAt: '2025-02-05T01:38:10.715Z',
                  isEquipped: true,
                  item: {
                    id: 4,
                    name: 'item3',
                    price: 1000,
                    image: '4',
                    mainCategoryId: 1,
                    subCategoryId: 1,
                  },
                },
              ],
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
      description: '사용자의 아이템을 찾을 수 없음',
    }),
  );
}
