import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemDto } from './dto/response-item.dto';
import { PaginatedItemsResponseDto } from './dto/response-item.dto';

export const ApiItems = {
  getItemsByCategory: () => {
    return applyDecorators(
      ApiOperation({
        summary: '카테고리별 아이템 조회 - pagination',
        description: `
        1. 메인 카테고리와 서브 카테고리로 아이템을 조회합니다.
        2. 메인 카테고리와 서브 카테고리는 선택적으로 포함될 수 있습니다.
        3. pagination을 적용하여 아이템을 조회합니다.
        `,
      }),
      ApiResponse({
        status: 200,
        description: '아이템 조회 성공',
        type: PaginatedItemsResponseDto,
        schema: {
          example: {
            totalCount: 11,
            totalPages: 2,
            currentPage: 1,
            contents: [
              {
                id: 1,
                name: 'coko-setup',
                price: 10000,
                mainCategoryId: 1,
                subCategoryId: 1,
              },
              {
                id: 2,
                name: 'coko-setup2',
                price: 11000,
                mainCategoryId: 1,
                subCategoryId: 1,
              },
            ],
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: '잘못된 요청',
      }),
    );
  },
  getItemById: () => {
    return applyDecorators(
      ApiOperation({
        summary: '아이템 상세 조회',
        description: '아이템 ID를 사용하여 특정 아이템을 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        description: '아이템 조회 성공',
        type: ItemDto,
      }),
      ApiResponse({
        status: 404,
        description: '아이템을 찾을 수 없음',
      }),
    );
  },
  createItem: () => {
    return applyDecorators(
      ApiCookieAuth('access-Token'),
      ApiOperation({
        summary: '아이템 생성',
        description: '새로운 아이템을 생성합니다.',
      }),
      ApiBody({
        description: '아이템 생성에 필요한 정보',
        type: CreateItemDto,
      }),
      ApiResponse({
        status: 201,
        description: '아이템 생성 성공',
      }),
      ApiResponse({
        status: 400,
        description: '잘못된 요청',
      }),
    );
  },
  updateItem: () => {
    return applyDecorators(
      ApiCookieAuth('access-Token'),
      ApiOperation({
        summary: '아이템 수정',
        description: '기존 아이템을 수정합니다.',
      }),
      ApiBody({
        description: '아이템 수정에 필요한 정보',
        type: UpdateItemDto,
      }),
      ApiResponse({
        status: 200,
        description: '아이템 수정 성공',
      }),
      ApiResponse({
        status: 400,
        description: '잘못된 요청',
      }),
      ApiResponse({
        status: 404,
        description: '아이템을 찾을 수 없음',
      }),
    );
  },
};
