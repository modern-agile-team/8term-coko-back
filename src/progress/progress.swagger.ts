import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiProgress = {
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '',
      }),
      ApiResponse({
        //status: 204,
        //description: '새 문제가 성공적으로 생성됨',
      }),
    );
  },
  createOrUpdate: () => {
    return applyDecorators(
      ApiOperation({
        summary: '',
      }),
    );
  },
};
