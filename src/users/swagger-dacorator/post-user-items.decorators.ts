import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { BuyUserItemsDto } from '../dtos/buy-userItems.dto';

export function ApiPostUserItems() {
  return applyDecorators(
    ApiOperation({
      summary: '아이템 구매',
      description: '사용자가 포인트를 사용하여 아이템을 구매합니다.',
    }),

    ApiParam({
      name: 'userId',
      type: 'number',
      description: '사용자 ID',
      required: true,
      example: 1,
    }),

    ApiBody({
      type: BuyUserItemsDto,
      description: '구매할 아이템 정보',
      examples: {
        example1: {
          value: {
            userId: 1,
            itemIds: [1, 2, 3],
          },
          summary: '아이템 구매 예시',
        },
      },
    }),

    ApiResponse({
      status: 201,
      description: '아이템 구매 성공',
    }),

    ApiBadRequestResponse({
      description:
        '다음과 같은 경우 400에러가 발생합니다:\n' +
        '- 포인트가 부족한 경우\n' +
        '- 이미 소유한 아이템을 구매하려는 경우\n' +
        '- 잘못된 요청 데이터 형식',
      schema: {
        example: {
          statusCode: 400,
          message: 'Insufficient points to buy these items',
          error: 'Bad Request',
        },
      },
    }),

    ApiNotFoundResponse({
      description:
        '다음과 같은 경우 404에러가 발생합니다:\n' +
        '- 사용자를 찾을 수 없는 경우\n' +
        '- 요청한 아이템이 존재하지 않는 경우',
      schema: {
        example: {
          statusCode: 404,
          message: 'Items not found: 1,2,3',
          error: 'Not Found',
        },
      },
    }),
  );
}
