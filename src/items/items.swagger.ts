import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

export const ApiItems = {
  getAllItems: () => {
    return applyDecorators(
      ApiOperation({
        summary: '전체 아이템 목록 조회',
        description: '페이지네이션을 적용하여 전체 아이템 목록을 조회합니다.',
      }),
      ApiQuery({
        name: 'limit',
        required: false,
        description: '한 번에 가져올 데이터의 최대 개수',
        example: 10,
      }),
      ApiQuery({
        name: 'offset',
        required: false,
        description: '데이터를 가져올 시작 지점',
        example: 0,
      }),
      ApiResponse({
        status: 200,
        description: '아이템 목록 조회 성공',
      }),
      ApiResponse({
        status: 400,
        description: '잘못된 요청',
      }),
    );
  },
  getItemsByCategory: () => {
    return applyDecorators(
      ApiOperation({
        summary: '카테고리별 아이템 조회',
        description: '메인 카테고리와 서브 카테고리로 아이템을 조회합니다.',
      }),
      ApiQuery({
        name: 'mainCategoryId',
        required: true,
        description: '메인 카테고리 ID',
        example: 1,
      }),
      ApiQuery({
        name: 'subCategoryId',
        required: false,
        description: '서브 카테고리 ID',
        example: 2,
      }),
      ApiResponse({
        status: 200,
        description: '카테고리별 아이템 조회 성공',
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
      ApiParam({
        name: 'id',
        required: true,
        description: '아이템 ID',
        example: 1,
      }),
      ApiResponse({
        status: 200,
        description: '아이템 조회 성공',
      }),
      ApiResponse({
        status: 404,
        description: '아이템을 찾을 수 없음',
      }),
    );
  },
  createItem: () => {
    return applyDecorators(
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
