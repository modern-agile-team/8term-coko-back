import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiResetEquipment() {
  return applyDecorators(
    ApiOperation({
      summary: '모든 아이템 장착 해제',
      description:
        '현재 로그인한 사용자의 모든 장착된 아이템을 해제 상태로 변경',
    }),

    ApiResponse({
      status: 200,
      description: '모든 아이템 장착 해제 성공',
    }),
    ApiResponse({
      status: 401,
      description: '인증되지 않은 사용자',
    }),
  );
}
