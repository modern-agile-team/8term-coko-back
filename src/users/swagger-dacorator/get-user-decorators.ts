import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetUser() {
  return applyDecorators(
    ApiOperation({
      summary: '단일 유저 정보 조회',
      description: `## 단일 유저 정보 조회`,
    }),
    ApiResponse({
      status: 200,
      description: '성공적으로 단일 유저가 조회된 경우',
      content: {
        JSON: {
          example: {
            id: 2,
            nickname: 'gwgw123',
            profileImage: null,
            maxHealthPoint: 5,
            level: 2,
            experience: 30,
            experienceForNextLevel: 60,
            point: 200,
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '요청 데이터 타입이 일치하지 않을 경우 (문자열 등)',
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
