import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseUserEquippedDto } from '../dtos/response-user-equipped.dto';

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
      type: [ResponseUserEquippedDto],
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
