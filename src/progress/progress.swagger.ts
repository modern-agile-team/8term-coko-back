import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiProgress = {
  findAll: () => {
    return applyDecorators(
      ApiOperation({
        summary: '',
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
