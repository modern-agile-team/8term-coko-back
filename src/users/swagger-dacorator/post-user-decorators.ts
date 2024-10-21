import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({
      summary: ' 유저 추가',
      description: ` ## 유저 추가`,
    }),
    ApiResponse({
      status: 200,
      description: '성공적으로 유저가 추가 된 경우',
      content: {
        JSON: {
          example: {
            id: 99,
            nickname: 'gwgw99',
            profileImage: null,
            maxHealthPoint: 5,
            level: 1,
            experience: 0,
            experienceForNextLevel: 50,
            point: 0,
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '요청 데이터 타입이 일치하지 않을 경우 (nickname)',
      content: {
        JSON: {
          example: {
            value: {
              message: {
                message: ['nickname must be a string'],
                error: 'Bad Request',
                statusCode: 400,
              },
            },
          },
        },
      },
    }),
  );
}
