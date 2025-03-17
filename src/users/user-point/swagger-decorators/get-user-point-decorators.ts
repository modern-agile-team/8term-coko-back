import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetPoint() {
  return applyDecorators(
    ApiCookieAuth('accessToken'),
    ApiOperation({
      summary: '포인트 조회',
      description: `## 포인트 조회`,
    }),
    ApiResponse({
      status: 200,
      description: '성공적으로 포인트가 조회된 경우',
      content: {
        JSON: {
          example: {
            id: 15,
            nickname: 'gwgw123',
            point: 70,
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'id 요청 데이터 타입이 일치하지 않을 경우',
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
            message: 'id 999 not found',
            error: 'Not Found',
            statusCode: 404,
          },
        },
      },
    }),
  );
}
