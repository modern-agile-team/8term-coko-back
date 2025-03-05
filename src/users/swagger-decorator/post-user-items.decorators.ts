import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
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
      description:
        '현재 로그인한 사용자가 포인트를 사용하여 아이템을 구매합니다.',
    }),

    ApiBody({
      type: BuyUserItemsDto,
      description: '구매할 아이템 정보',
      examples: {
        example1: {
          value: {
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
          message: '포인트가 부족합니다.',
          error: 'Bad Request',
        },
      },
    }),

    ApiNotFoundResponse({
      description: '요청한 아이템이 존재하지 않는 경우',
      schema: {
        example: {
          statusCode: 404,
          message: '다음 아이템을 찾을 수 없습니다.: 1,2,3',
          error: 'Not Found',
        },
      },
    }),
  );
}
