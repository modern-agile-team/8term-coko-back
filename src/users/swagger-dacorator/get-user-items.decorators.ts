import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ResponseItemDto } from '../dtos/response-item.dto';

export function ApiGetUserItems() {
  return applyDecorators(
    ApiOperation({
      summary: '사용자 아이템 목록 조회',
      description: '특정 사용자가 보유한 모든 아이템 정보를 조회합니다.',
    }),
    ApiParam({
      name: 'userId',
      required: true,
      description: '조회할 사용자의 ID',
      type: Number,
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: '사용자 아이템 목록 조회 성공',
      type: [ResponseItemDto], //배열 형태로 변환됨을 명시
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 사용자 ID 형식',
    }),
    ApiResponse({
      status: 404,
      description: '사용자의 아이템을 찾을 수 없음',
    }),
    ApiResponse({
      status: 500,
      description: '서버 내부 오류',
    }),
  );
}
