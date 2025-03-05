import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiUpdatePoint() {
  return applyDecorators(
    ApiOperation({
      summary: '포인트 증감 수정',
      description: ` ## 포인트 증감 수정
    0 포인트 밑으로 수정되지 않음`,
    }),
    ApiResponse({
      status: 200,
      description: '성공적으로 포인트가 수정된 경우',
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
      description: '400 errors',
      content: {
        JSON: {
          examples: {
            'id type mismatch': {
              value: {
                message: 'Validation failed (numeric string is expected)',
                error: 'Bad Request',
                statusCode: 400,
              },
              description: 'id 요청 데이터 타입이 일치하지 않을 경우',
            },
            'point type mismatch': {
              value: {
                message: [
                  'point must be a number conforming to the specified constraints',
                ],
                error: 'Bad Request',
                statusCode: 400,
              },
              description: 'point 요청 데이터 타입이 일치하지 않을 경우',
            },
            'not enough points': {
              value: {
                message: 'user points are not enough',
                error: 'Bad Request',
                statusCode: 400,
              },
              description: '포인트가 부족한 경우',
            },
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
