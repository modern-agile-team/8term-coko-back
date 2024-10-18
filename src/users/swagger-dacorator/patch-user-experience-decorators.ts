import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiUpdateExperience() {
  return applyDecorators(
    ApiOperation({
      summary: '경험치 증가 수정',
      description: ` ## 경험치 증가 수정`,
    }),
    ApiResponse({
      status: 200,
      description: '성공적으로 경험치가 수정된 경우',
      content: {
        JSON: {
          example: {
            id: 15,
            nickname: 'gwgw123',
            level: 1,
            experience: 30,
            experienceForNextLevel: 50,
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '400 error',
      content: {
        JSON: {
          examples: {
            'not enough points': {
              value: {
                message: 'user points are not enough',
                error: 'Bad Request',
                statusCode: 400,
              },
              description: '포인트가 부족한 경우',
            },
            'type mismatch': {
              value: {
                message: [
                  'experience must be a number conforming to the specified constraints',
                ],
                error: 'Bad Request',
                statusCode: 400,
              },
              description: '요청 데이터 타입이 일치하지 않을 경우 (문자열 등)',
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
            message: 'ID 999 not found',
            error: 'Not Found',
            statusCode: 404,
          },
        },
      },
    }),
  );
}
