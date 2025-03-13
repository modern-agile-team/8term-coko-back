import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { EquipUseritemDto } from '../dtos/equip-user-item.dto';

export function ApiPatchUserItems() {
  return applyDecorators(
    ApiOperation({
      summary: '아이템 장착 상태 변경',
      description:
        '사용자의 아이템 장착/해제 상태를 변경합니다.\n' +
        '- 서브카테고리가 있는 경우: 각 서브카테고리당 하나의 아이템만 장착 가능\n' +
        '- 서브카테고리가 없는 경우: 메인카테고리당 하나의 아이템만 장착 가능\n' +
        '- 장착 시 같은 카테고리의 기존 아이템은 자동으로 해제됨',
    }),

    ApiParam({
      name: 'userId',
      type: 'number',
      description: '사용자 ID',
      required: true,
    }),

    ApiBody({
      type: EquipUseritemDto,
      description: '장착/해제할 아이템 정보',
      examples: {
        '단일 아이템 장착': {
          value: {
            itemIds: [1],
            isEquipped: true,
          },
          summary: '단일 아이템 장착 (같은 카테고리의 기존 아이템은 자동 해제)',
        },
        '여러 아이템 동시 장착': {
          value: {
            itemIds: [1, 2],
            isEquipped: true,
          },
          summary:
            '다른 카테고리의 아이템 동시 장착 (각 카테고리의 기존 아이템은 자동 해제)',
        },
        '아이템 해제': {
          value: {
            itemIds: [1, 2],
            isEquipped: false,
          },
          summary: '여러 아이템 동시 해제',
        },
      },
    }),

    ApiResponse({
      status: 200,
      description: '아이템 장착/해제 성공',
    }),

    ApiBadRequestResponse({
      description:
        '다음과 같은 경우 400에러가 발생합니다:\n' +
        '- 같은 메인 카테고리(서브카테고리가 없는 경우)에서 여러 아이템 선택 시\n' +
        '- 같은 서브 카테고리에서 여러 아이템 선택 시\n' +
        '- 잘못된 요청 데이터 형식',
      schema: {
        example: {
          statusCode: 400,
          message:
            '서브 카테고리 "셋업"에서는 하나의 아이템만 선택 가능합니다.',
          error: 'Bad Request',
        },
      },
    }),

    ApiNotFoundResponse({
      description: '사용자의 아이템을 찾을 수 없는 경우',
      schema: {
        example: {
          statusCode: 404,
          mssage: '아이템을 찾을 수 없습니다.',
          error: 'Not Found',
        },
      },
    }),
  );
}
