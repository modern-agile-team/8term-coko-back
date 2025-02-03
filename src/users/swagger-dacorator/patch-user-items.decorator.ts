import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { EquipItemDto } from '../dtos/equip-item.dto';

export function ApiPatchUserItems() {
  return applyDecorators(
    ApiOperation({
      summary: '아이템 장착 상태 변경',
      description:
        '사용자의 아이템 장착 상태를 변경합니다. 카테고리별 장착 제한이 적용됩니다.',
    }),

    ApiParam({
      name: 'userId',
      type: 'number',
      description: '사용자 ID',
      required: true,
    }),

    ApiBody({
      type: EquipItemDto,
      description: '장착/장착해제할 아이템 정보',
      examples: {
        '단일 아이템 장착': {
          value: {
            itemIds: [1],
            isEquipped: true,
          },
          summary: '단일 아이템 장착',
        },
        '여러 아이템 장착': {
          value: {
            itemIds: [1, 2],
            isEquipped: true,
          },
          summary: '다른 서브카테고리의 아이템 동시 장착',
        },
        '아이템 장착 해제': {
          value: {
            itemIds: [1, 2],
            isEquipped: false,
          },
          summary: '아이템 장착 해제',
        },
      },
    }),

    ApiResponse({
      status: 200,
      description: '아이템 장착/장착해제 성공',
    }),

    ApiBadRequestResponse({
      description:
        '다음과 같ㅇ느 경우 400에러가 발생합니다.:\n' +
        '- 같은 메인 카테고리에서 서브카테고리가 없는 경우 중복 장착 시도\n' +
        '- 같은 서브 카테고리에서 중복 장착 시도\n' +
        '- 잘못된 요청 데이터 형식',
      schema: {
        example: {
          statusCode: 400,
          message: 'Can only equip one item from sub category: Setup',
          error: 'Bad Request',
        },
      },
    }),

    ApiNotFoundResponse({
      description: '사용자의 아이템을 찾을 수 없는 경우',
      schema: {
        example: {
          statusCode: 404,
          mssage: 'User item not found',
          error: 'Not Found',
        },
      },
    }),
  );
}
