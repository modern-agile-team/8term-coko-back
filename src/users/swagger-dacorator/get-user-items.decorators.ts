import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseUserItemDto } from '../dtos/response-useritem.dto';

export function ApiGetUserItems() {
  return applyDecorators(
    ApiCookieAuth('access-token'),
    ApiOperation({
      summary: '사용자 아이템 목록 조회',
      description:
        '현재 로그인한 사용자가 보유한 모든 아이템 정보를 조회합니다.',
    }),
    ApiResponse({
      status: 200,
      description: '사용자 아이템 목록 조회 성공',
      type: [ResponseUserItemDto], //배열 형태로 변환됨을 명시
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
