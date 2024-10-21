import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiDeleteUser() {
  return applyDecorators(
    ApiOperation({
      summary: ' 유저 삭제',
      description: ` ## 유저 삭제`,
    }),
    ApiResponse({
      status: 200,
      description: '성공적으로 유저가 삭제 된 경우',
      content: {
        JSON: {
          example: {
            statusCode: 204,
            message: 'No Content',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '요청 데이터 타입이 일치하지 않을 경우 (id)',
      content: {
        JSON: {
          example: {
            message: 'Validation failed (numeric string is expected)',
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'id를 찾을 수 없는 경우',
      content: {
        JSON: {
          example: {
            message: 'ID 999 not found',
            error: 'Not Found',
            statusCode: 404,
          },
        },
      },
    }),
  );
}
