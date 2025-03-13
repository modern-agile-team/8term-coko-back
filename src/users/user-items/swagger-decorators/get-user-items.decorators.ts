import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { UserItemsPaginationResponseDto } from '../dtos/response-user-items-pagination.dto';

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
      type: UserItemsPaginationResponseDto,
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
