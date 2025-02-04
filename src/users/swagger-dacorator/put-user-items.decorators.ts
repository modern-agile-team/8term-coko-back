import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

export function ApiUnequipAllItems() {
  return applyDecorators(
    ApiOperation({
      summary: '모든 아이템 장착 해제',
      description: '사용자의 모든 장착된 아이템을 해제 상태로 변경',
    }),
    ApiParam({
      name: 'userId',
      type: 'number',
      description: '사용자 ID',
      required: true,
    }),

    ApiResponse({
      status: 200,
      description: '모든 아이템 장착 해제 성공',
    }),
    ApiNotFoundResponse({
      description: '사용자를 찾을 수 없는 경우',
      schema: {
        example: {
          statusCode: 404,
          message: '사용자를 찾을 수 없습니다.',
          error: 'Not Found',
        },
      },
    }),
  );
}
