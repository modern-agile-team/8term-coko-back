import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiUpdateUser() {
  return applyDecorators(
    ApiCookieAuth('adminAccessToken'),
    ApiOperation({
      summary: ' 유저 수정 - admin',
      description: ` ## 유저 수정`,
    }),
    ApiResponse({
      status: 200,
      description: '성공적으로 유저 정보가 수정된 경우',
      content: {
        JSON: {
          example: {
            id: 15,
            nickname: 'gwgw123',
            profileImage: null,
            maxHealthPoint: 5,
            level: 4,
            experience: 500,
            experienceForNextLevel: 86,
            point: 200,
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
            'experience, point type mismatch': {
              value: {
                message: [
                  'experience must be a number conforming to the specified constraints',
                  'point must be a number conforming to the specified constraints',
                ],
                error: 'Bad Request',
                statusCode: 400,
              },
              description:
                'experience, point 요청 데이터 타입이 일치하지 않을 경우',
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
