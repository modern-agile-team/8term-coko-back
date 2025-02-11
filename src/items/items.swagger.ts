import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

export const ApiItems = {
  createItem: () => {
    return applyDecorators(
      ApiTags('items'),
      ApiOperation({ summary: '새로운 아이템 추가' }),
      ApiResponse({ status: 201, description: '아이템 생성 성공' }),
      ApiBody({ type: CreateItemDto, description: '생성할 아이템 정보' }),
    );
  },
  getAllItems: () => {
    return applyDecorators(
      ApiTags('items'),
      ApiOperation({ summary: '모든 아이템 목록 조회' }),
      ApiResponse({ status: 200, description: '모든 아이템 조회 성공' }),
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
