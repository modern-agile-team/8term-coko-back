import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

export const ApiItems = {
  createItem: () => {
    return applyDecorators(
      ApiTags('items'),
      ApiOperation({ summary: '새로운 아이템 추가' }),
      ApiBody({
        type: CreateItemDto,
        description: '생성할 아이템 정보',
        examples: {
          item: {
            value: {
              name: 'blue-hat',
              image: 'blue-hat.svg',
              price: 2000,
              mainCategoryId: 2,
              subCategoryId: 3,
            },
          },
        },
      }),
      ApiResponse({
        status: 201,
        description: '아이템 생성 성공',
        schema: {
          example: {
            success: true,
            message: '아이템이 성공적으로 생성되었습니다.',
            data: {
              id: 1,
              name: 'blue-hat',
              image: 'blue-hat.svg',
              price: 2000,
              mainCategoryId: 2,
              subCategoryId: 3,
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z',
            },
          },
        },
      }),
      ApiResponse({ status: 400, description: '잘못된 요청' }),
    );
  },
  getAllItems: () => {
    return applyDecorators(
      ApiTags('items'),
      ApiOperation({ summary: '모든 아이템 목록 조회' }),
      ApiResponse({ status: 200, description: '모든 아이템 조회 성공' }),
      ApiQuery({
        name: 'limit',
        required: false,
        description: '가져올 아이템의 최대 개수',
      }),
      ApiQuery({
        name: 'offset',
        required: false,
        description: '가져올 시작 지점',
      }),
    );
  },
  getItemById: () => {
    return applyDecorators(
      ApiTags('items'),
      ApiOperation({ summary: '단일 아이템 조회' }),
      ApiResponse({ status: 200, description: '아이템 조회 성공' }),
      ApiResponse({ status: 404, description: '아이템을 찾을 수 없음' }),
    );
  },
  getItemsByCategory: () => {
    return applyDecorators(
      ApiTags('items'),
      ApiOperation({ summary: '카테고리별 아이템 조회' }),
      ApiResponse({ status: 200, description: '카테고리별 아이템 조회 성공' }),
    );
  },
  updateItem: () => {
    return applyDecorators(
      ApiTags('items'),
      ApiOperation({ summary: '아이템 수정' }),
      ApiResponse({ status: 200, description: '아이템 수정 성공' }),
      ApiResponse({ status: 404, description: '아이템을 찾을 수 없음' }),
      ApiBody({ type: UpdateItemDto, description: '수정할 아이템 정보' }),
    );
  },
};
